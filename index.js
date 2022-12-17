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
    TIFFNumberOfStrips
} from './out/libtiff-wasm.js';

document.querySelector('input').addEventListener('change', async (event) => {
    /** @type {(() => void)[]} */
    const disposables = [];
    try {
        // @ts-ignore
        const buffer = await event.target.files[0].arrayBuffer();
        const fname = "image"
        FS.createDataFile("/", fname, new Uint8Array(buffer), true, false);
        disposables.push(() => FS.unlink("/" + fname));

        // The following code is a port of the [TIFFRGBAImage Support] example from http://www.libtiff.org/libtiff.html

        console.time("Tiff Read");
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

        let data = null;
        if (bitsPerSample === 16 && samplesPerPixel === 1 && planarConfig == PlanarConfiguration.CONTIF) {
            data = linearMap16bitTo8bit(width, height, bytesPerSample, tif, disposables);
        }
        else {
            data = readRGBA(tif, width, height, disposables);
        }

        console.timeEnd("Tiff Read");
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
}, false)

/**
 * @param {number} width
 * @param {number} height
 * @param {number} bytesPerSample
 * @param {number} tif
 * @param {(() => void)[]} disposables
 */
function linearMap16bitTo8bit(width, height, bytesPerSample, tif, disposables) {
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

    const imageView16Bit = new Uint16Array(imageBuffer.buffer);
    let max = Number.NEGATIVE_INFINITY;
    let min = Number.POSITIVE_INFINITY;

    for (let i = 0; i < imageView16Bit.length; i++) {
        if (imageView16Bit[i] > max) {
            max = imageView16Bit[i];
        }

        if (imageView16Bit[i] < min) {
            min = imageView16Bit[i];
        }
    }

    const imageRgba = new Uint8ClampedArray(width * height * 4);
    const view32Bit = new Uint32Array(imageRgba.buffer);
    const range = max - min;
    const alpha = 0xFF000000;
    for (let i = 0; i < imageView16Bit.length; i++) {
        const gray8BitValue = 255 * ((imageView16Bit[i] - min) / range);
        view32Bit[i] = alpha + (gray8BitValue << 16) + (gray8BitValue << 8) + gray8BitValue;
    }
    return imageRgba;
}

/**
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