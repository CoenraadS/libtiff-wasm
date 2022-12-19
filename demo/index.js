import {
    FS,
    Module,
    TiffTag,
    TIFFOpen,
    TIFFClose,
    TIFFReadRGBAImageOriented,
    TIFFGetField,
    TIFFMalloc,
    TIFFFree,
    Orientation,
    PlanarConfiguration,
    TIFFStripSize,
    TIFFReadEncodedStrip,
    TIFFNumberOfStrips,
    SampleFormat
} from '../out/libtiff-wasm.js';
import getStatistics from './getStatistics.js';


/** @type {HTMLInputElement} */
// @ts-ignore
const customParsing = document.getElementById('customParse');

customParsing.addEventListener('change', (event) => {
    if (previousEvent) {
        handleEvent(previousEvent);
    }
});

let previousEvent = null;
const handleEvent = async (event) => {
    previousEvent = event;
    /** @type {(() => void)[]} */
    const disposables = [];
    try {
        // @ts-ignore
        const buffer = await event.target.files[0].arrayBuffer();
        console.log("%c Loading " + event.target.files[0].name, 'background: #F8F8F8')
        const fname = "image"
        FS.createDataFile("/", fname, new Uint8Array(buffer), true, false);
        disposables.push(() => FS.unlink("/" + fname));

        console.time("Total Processing");
        const tif = TIFFOpen(fname, "r");
        if (!tif) {
            console.log("TIFFOpen failed");
            return;
        }

        disposables.push(() => TIFFClose(tif));

        const bitsPerSample = TIFFGetField(tif, TiffTag.BITSPERSAMPLE);
        const bytesPerSample = bitsPerSample / 8;
        const samplesPerPixel = TIFFGetField(tif, TiffTag.SAMPLESPERPIXEL);
        const width = TIFFGetField(tif, TiffTag.IMAGEWIDTH);
        const height = TIFFGetField(tif, TiffTag.IMAGELENGTH);
        const planarConfig = TIFFGetField(tif, TiffTag.PLANARCONFIG);
        const sampleFormat = TIFFGetField(tif, TiffTag.SAMPLEFORMAT) || SampleFormat.UINT;

        let data = null;
        if (customParsing.checked) {
            if (samplesPerPixel !== 1) {
                throw `Unexpected Samples Per Pixel. Expected: 1. Actual ${samplesPerPixel}`;
            }

            if (planarConfig !== PlanarConfiguration.CONTIF) {
                throw `Unexpected Planar Configuration. Expected: 1. Actual ${planarConfig}`;
            }

            const imageBuffer = getImageBuffer(width, height, bytesPerSample, tif, disposables);

            // UINT8 support
            if (bitsPerSample == 8 && sampleFormat == SampleFormat.UINT) {
                const view = imageBuffer;
                data = linearMap(view, data, width, height);
            }
            // UINT16 support
            else if (bitsPerSample === 16 && sampleFormat == SampleFormat.UINT) {
                const view = new Uint16Array(imageBuffer.buffer);
                data = linearMap(view, data, width, height);
            }
            // UINT32 support
            else if (bitsPerSample === 32 && sampleFormat == SampleFormat.UINT) {
                const view = new Uint32Array(imageBuffer.buffer);
                data = linearMap(view, data, width, height);
            }
            // Float32 support
            else if (bitsPerSample === 32 && sampleFormat == SampleFormat.IEEEFP) {
                const view = new Float32Array(imageBuffer.buffer);
                const minMax = clampAndStandardDeviation(view);
                data = scaleToUint8AndConvertToRGBA(width, height, view, minMax.min, minMax.max);
            }
            else {
                throw `No custom parser registered for format with BitsPerSample: ${bitsPerSample} and SampleFormat: ${sampleFormat}`
            }
        }
        else {
            // Default LibTiff reader
            data = readRGBA(tif, width, height, disposables);
        }

        console.timeEnd("Total Processing");
        console.time("Tiff Display");

        const imageData = new ImageData(data, width, height);

        /** @type {HTMLCanvasElement} */
        // @ts-ignore
        const canvas = document.getElementById('canvas');

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.putImageData(imageData, 0, 0);
        console.timeEnd("Tiff Display");
    }
    finally {
        while (disposables.length > 0) {
            const disposable = disposables.pop();
            disposable();
        }
    }
}

document.querySelector('input').addEventListener('change', handleEvent, false)

function linearMap(view, data, width, height) {
    const minMax = findMinMax(view);
    data = scaleToUint8AndConvertToRGBA(width, height, view, minMax.min, minMax.max);
    return data;
}

/**
 * @param {number} width
 * @param {number} height
 * @param {number} bytesPerSample
 * @param {number} tif
 * @param {(() => void)[]} disposables
 */
function getImageBuffer(width, height, bytesPerSample, tif, disposables) {
    console.time("GetBuffer");
    const imageBuffer = new Uint8Array(width * height * bytesPerSample);
    const stripBuffer = TIFFMalloc(TIFFStripSize(tif));
    if (!stripBuffer) {
        throw 'TIFFMalloc failed';
    }

    disposables.push(() => TIFFFree(stripBuffer));
    const numStrips = TIFFNumberOfStrips(tif);
    const rowsPerStrip = TIFFGetField(tif, TiffTag.ROWSPERSTRIP);

    for (var s = 0; s < numStrips; ++s) {
        const read = TIFFReadEncodedStrip(tif, s, stripBuffer, -1);
        if (read == -1) {
            throw "Error reading encoded strip";
        }

        const stripData = new Uint8Array(Module.HEAPU8.buffer, stripBuffer, read);
        imageBuffer.set(stripData, s * rowsPerStrip * width * bytesPerSample);
    }
    console.timeEnd("GetBuffer");
    return imageBuffer;
}

function scaleToUint8AndConvertToRGBA(width, height, imageView, min, max) {
    console.time("ToRGBA");

    const imageRgba = new Uint8ClampedArray(width * height * 4);
    const view32Bit = new Uint32Array(imageRgba.buffer);
    const range = max - min;

    const alpha = 0xFF000000;
    for (let i = 0; i < imageView.length; i++) {
        const gray8BitValue = Math.round(255 * ((imageView[i] - min) / range));
        view32Bit[i] = alpha + (gray8BitValue << 16) + (gray8BitValue << 8) + gray8BitValue;
    }

    console.timeEnd("ToRGBA");
    return imageRgba;
}

function findMinMax(imageView) {
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;

    console.time("Min/Max");

    for (let i = 0; i < imageView.length; i++) {
        if (imageView[i] > max) {
            max = imageView[i];
        }

        if (imageView[i] < min) {
            min = imageView[i];
        }
    }

    console.timeEnd("Min/Max");
    return { min, max };
}

function clampAndStandardDeviation(imageView) {
    console.time("Clamp lowerbound to 0");

    for (let i = 0; i < imageView.length; i++) {
        if (imageView[i] < 0) {
            imageView[i] = 0;
        }
    }

    console.timeEnd("Clamp lowerbound to 0");

    console.time("Statistics");
    const stats = getStatistics(imageView);
    console.timeEnd("Statistics");

    const std = stats.std;
    const mean = stats.mean;

    const sigma = 3;
    const upperBound = mean + sigma * std;
    const lowerBound = Math.max(0, mean - sigma * std);

    console.log({ std });
    console.log({ mean });
    console.log({ lowerBound });
    console.log({ upperBound });

    const min = lowerBound;
    const max = upperBound;

    console.time("Clamp");

    if (lowerBound > 0) {
        for (let i = 0; i < imageView.length; i++) {
            if (imageView[i] < lowerBound) {
                imageView[i] = lowerBound;
            }
        }
    }

    for (let i = 0; i < imageView.length; i++) {
        if (imageView[i] > upperBound) {
            imageView[i] = upperBound;
        }
    }

    console.timeEnd("Clamp");
    return { min, max };
}

/**
 * Port of the [TIFFRGBAImage Support] example from http://www.libtiff.org/libtiff.html
 * @param {number} tif
 * @param {number} width
 * @param {number} height
 * @param {(() => void)[]} disposables
 * @return {Uint8ClampedArray} RGBA pixel array
 */
function readRGBA(tif, width, height, disposables) {
    const orientation = TIFFGetField(tif, TiffTag.ORIENTATION) || Orientation.TOPLEFT;
    const nrOfPixels = width * height;
    const uint32Size = 4;
    const raster = TIFFMalloc(nrOfPixels * uint32Size); // output will be RGBA

    if (!raster) {
        throw 'TIFFMalloc failed';
    }

    disposables.push(() => TIFFFree(raster));

    const stopOnError = true;

    if (!TIFFReadRGBAImageOriented(tif, width, height, raster, orientation, stopOnError)) {
        throw "TIFFReadRGBAImage failed";
    }

    const data = new Uint8ClampedArray(Module.HEAPU8.buffer, raster, nrOfPixels * uint32Size);
    return data;
}