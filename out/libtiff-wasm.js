import libtiffwasm from './libtiff-wasm.raw.js';

export const Module = await libtiffwasm();

export const FS = Module.FS;

/**
 * TIFFTAG_ORIENTATION
 * @readonly
 * @enum {number}
 */
export const Orientation = {
    ORIENTATION_TOPLEFT: 1,
    ORIENTATION_TOPRIGHT: 2,
    ORIENTATION_BOTRIGHT: 3,
    ORIENTATION_BOTLEFT: 4
}

/**
 * TIFF Tags
 * @readonly
 * @enum {number}
 */
export const TiffTag = {
    SUBFILETYPE: 254,
    OSUBFILETYPE: 255,
    IMAGEWIDTH: 256,
    IMAGELENGTH: 257,
    BITSPERSAMPLE: 258,
    COMPRESSION: 259,
    PHOTOMETRIC: 262,
    THRESHHOLDING: 263,
    CELLWIDTH: 264,
    CELLLENGTH: 265,
    FILLORDER: 266,
    DOCUMENTNAME: 269,
    IMAGEDESCRIPTION: 270,
    MAKE: 271,
    MODEL: 272,
    STRIPOFFSETS: 273,
    ORIENTATION: 274,
    SAMPLESPERPIXEL: 277,
    ROWSPERSTRIP: 278,
    STRIPBYTECOUNTS: 279,
    MINSAMPLEVALUE: 280,
    MAXSAMPLEVALUE: 281,
    XRESOLUTION: 282,
    YRESOLUTION: 283,
    PLANARCONFIG: 284,
    PAGENAME: 285,
    XPOSITION: 286,
    YPOSITION: 287,
    FREEOFFSETS: 288,
    FREEBYTECOUNTS: 289,
    GRAYRESPONSEUNIT: 290,
    GRAYRESPONSECURVE: 291,
    RESOLUTIONUNIT: 296,
    PAGENUMBER: 297,
    COLORRESPONSEUNIT: 300,
    TRANSFERFUNCTION: 301,
    SOFTWARE: 305,
    DATETIME: 306,
    ARTIST: 315,
    HOSTCOMPUTER: 316,
    PREDICTOR: 317,
    WHITEPOINT: 318,
    PRIMARYCHROMATICITIES: 319,
    COLORMAP: 320,
    HALFTONEHINTS: 321,
    TILEWIDTH: 322,
    TILELENGTH: 323,
    TILEOFFSETS: 324,
    TILEBYTECOUNTS: 325,
    BADFAXLINES: 326,
    CLEANFAXDATA: 327,
    CONSECUTIVEBADFAXLINES: 328,
    SUBIFD: 330,
    INKSET: 332,
    INKNAMES: 333,
    NUMBEROFINKS: 334,
    DOTRANGE: 336,
    TARGETPRINTER: 337,
    EXTRASAMPLES: 338,
    SAMPLEFORMAT: 339,
    SMINSAMPLEVALUE: 340,
    SMAXSAMPLEVALUE: 341,
    CLIPPATH: 343,
    XCLIPPATHUNITS: 344,
    YCLIPPATHUNITS: 345,
    INDEXED: 346,
    JPEGTABLES: 347,
    OPIPROXY: 351,
    GLOBALPARAMETERSIFD: 400,
    PROFILETYPE: 401,
    FAXPROFILE: 402,
    CODINGMETHODS: 403,
    VERSIONYEAR: 404,
    MODENUMBER: 405,
    DECODE: 433,
    IMAGEBASECOLOR: 434,
    JPEGPROC: 512,
    JPEGIFOFFSET: 513,
    JPEGIFBYTECOUNT: 514,
    JPEGRESTARTINTERVAL: 515,
    JPEGLOSSLESSPREDICTORS: 517,
    JPEGPOINTTRANSFORM: 518,
    JPEGQTABLES: 519,
    JPEGDCTABLES: 520,
    JPEGACTABLES: 521,
    YCBCRCOEFFICIENTS: 529,
    YCBCRSUBSAMPLING: 530,
    YCBCRPOSITIONING: 531,
    REFERENCEBLACKWHITE: 532,
    STRIPROWCOUNTS: 559,
    XMLPACKET: 700,
    OPIIMAGEID: 32781,
    REFPTS: 32953,
    REGIONTACKPOINT: 32954,
    REGIONWARPCORNERS: 32955,
    REGIONAFFINE: 32956,
    MATTEING: 32995,
    DATATYPE: 32996,
    IMAGEDEPTH: 32997,
    TILEDEPTH: 32998,
    PIXAR_IMAGEFULLWIDTH: 33300,
    PIXAR_IMAGEFULLLENGTH: 33301,
    PIXAR_TEXTUREFORMAT: 33302,
    PIXAR_WRAPMODES: 33303,
    PIXAR_FOVCOT: 33304,
    PIXAR_MATRIX_WORLDTOSCREEN: 33305,
    PIXAR_MATRIX_WORLDTOCAMERA: 33306,
    WRITERSERIALNUMBER: 33405,
    CFAREPEATPATTERNDIM: 33421,
    CFAPATTERN: 33422,
    COPYRIGHT: 33432,
    RICHTIFFIPTC: 33723,
    FRAMECOUNT: 34232,
    PHOTOSHOP: 34377,
    EXIFIFD: 34665,
    ICCPROFILE: 34675,
    IMAGELAYER: 34732,
    JBIGOPTIONS: 34750,
    GPSIFD: 34853,
    FAXRECVPARAMS: 34908,
    FAXSUBADDRESS: 34909,
    FAXRECVTIME: 34910,
    FAXDCS: 34911,
    STONITS: 37439,
    FEDEX_EDR: 34929,
    INTEROPERABILITYIFD: 40965,
    LERC_PARAMETERS: 50674,
    DNGVERSION: 50706,
    DNGBACKWARDVERSION: 50707,
    UNIQUECAMERAMODEL: 50708,
    LOCALIZEDCAMERAMODEL: 50709,
    CFAPLANECOLOR: 50710,
    CFALAYOUT: 50711,
    LINEARIZATIONTABLE: 50712,
    BLACKLEVELREPEATDIM: 50713,
    BLACKLEVEL: 50714,
    BLACKLEVELDELTAH: 50715,
    BLACKLEVELDELTAV: 50716,
    WHITELEVEL: 50717,
    DEFAULTSCALE: 50718,
    DEFAULTCROPORIGIN: 50719,
    DEFAULTCROPSIZE: 50720,
    ANALOGBALANCE: 50727,
    ASSHOTNEUTRAL: 50728,
    ASSHOTWHITEXY: 50729,
    BASELINEEXPOSURE: 50730,
    BASELINENOISE: 50731,
    BASELINESHARPNESS: 50732,
    BAYERGREENSPLIT: 50733,
    LINEARRESPONSELIMIT: 50734,
    CAMERASERIALNUMBER: 50735,
    LENSINFO: 50736,
    CHROMABLURRADIUS: 50737,
    ANTIALIASSTRENGTH: 50738,
    SHADOWSCALE: 50739,
    DNGPRIVATEDATA: 50740,
    MAKERNOTESAFETY: 50741,
    BESTQUALITYSCALE: 50780,
    RAWDATAUNIQUEID: 50781,
    ORIGINALRAWFILENAME: 50827,
    ORIGINALRAWFILEDATA: 50828,
    ACTIVEAREA: 50829,
    MASKEDAREAS: 50830,
    ASSHOTICCPROFILE: 50831,
    ASSHOTPREPROFILEMATRIX: 50832,
    CURRENTICCPROFILE: 50833,
    CURRENTPREPROFILEMATRIX: 50834,
    DCSHUESHIFTVALUES: 65535,
    FAXMODE: 65536,
    JPEGQUALITY: 65537,
    JPEGCOLORMODE: 65538,
    JPEGTABLESMODE: 65539,
    FAXFILLFUNC: 65540,
    PIXARLOGDATAFMT: 65549,
    DCSIMAGERTYPE: 65550,
    DCSINTERPMODE: 65551,
    DCSBALANCEARRAY: 65552,
    DCSCORRECTMATRIX: 65553,
    DCSGAMMA: 65554,
    DCSTOESHOULDERPTS: 65555,
    DCSCALIBRATIONFD: 65556,
    ZIPQUALITY: 65557,
    PIXARLOGQUALITY: 65558,
    DCSCLIPRECTANGLE: 65559,
    SGILOGDATAFMT: 65560,
    SGILOGENCODE: 65561,
    LZMAPRESET: 65562,
    PERSAMPLE: 65563,
    ZSTD_LEVEL: 65564,
    LERC_VERSION: 65565,
    LERC_ADD_COMPRESSION: 65566,
    LERC_MAXZERROR: 65567,
    WEBP_LEVEL: 65568,
    WEBP_LOSSLESS: 65569
};

export const TiffSampleFormat = {
    UNSPECIFIED: 0,
    UINT: 1,
    INT: 2,
    IEEEFP: 3,
    VOID: 4,
    COMPLEXINT: 5,
    COMPLEXIEEEFP: 6
};

/**
 * TIFFOpen opens a TIFF file whose name is filename and returns a handle to be used in subsequent calls to routines in libtiff. If the open operation fails, then zero is returned. The mode parameter specifies if the file is to be opened for reading (`r`), writing (`w`), or appending (`a`).
 * http://www.libtiff.org/man/TIFFOpen.3t.html
 * @type {(fileName: string, mode: string) => number | null}
 * @param fileName FileName
 * @param mode Mode
 * @return Upon successful completion TIFFOpen, return a TIFF pointer. Otherwise, NULL is returned.
*/
export const TIFFOpen = Module.cwrap("TIFFOpen", "number", ["string", "string"]);

/**
 * TIFFClose - close a previously opened TIFF file.
 * http://www.libtiff.org/man/TIFFClose.3t.html
 * @type {(tif: number) => number}
 * @param tif A TIFF pointer.
*/
export const TIFFClose = Module.cwrap("TIFFClose", "number", ["number"]);

/**
 * TIFFNumberOfStrips returns the number of strips in the image.
 * http://www.libtiff.org/man/TIFFstrip.3t.html
 * @type {(tif: number) => number}
 * @param tif A TIFF pointer.
 * @return The number of strips in the image.
*/
export const TIFFNumberOfStrips = Module.cwrap("TIFFNumberOfStrips", "number", ["number"]);

/**
 * TIFFStripSize returns the equivalent size for a strip of data as it would be returned in a call to TIFFReadEncodedStrip or as it would be expected in a call to TIFFWriteEncodedStrip.
 * http://www.libtiff.org/man/TIFFstrip.3t.html
 * @type {(tif: number) => number}
 * @param tif A TIFF pointer.
 * @return The size of a strip of data.
*/
export const TIFFStripSize = Module.cwrap("TIFFStripSize", "number", ["number"]);

/**
 * TIFFReadEncodedStrip - read and decode a strip of data from an open TIFF file.
 * http://www.libtiff.org/man/TIFFReadEncodedStrip.3t.html
 * @type {(tif: number, strip: number, data: number, size: number) => number}
 * @param tif A TIFF pointer.
 * @return The actual number of bytes of data that were placed in buf is returned; Returns -1 if an error was encountered.
*/
export const TIFFReadEncodedStrip = Module.cwrap("TIFFReadEncodedStrip", "number",
    ["number", "number", "number", "number"]);

/**
 * TIFFmalloc is used to dynamically allocate and reallocate memory used by libtiff; such as memory passed into the I/O routines. Memory allocated through these interfaces is released back to the system using the TIFFfree routine.
 * https://linux.die.net/man/3/tiffmalloc
 * @type {(size: number) => number | null}
 * @return Null on failure
*/
export const TIFFMalloc = Module.cwrap("_TIFFmalloc", "number", ["number"]);

/**
 * TIFFmalloc is used to dynamically allocate and reallocate memory used by libtiff; such as memory passed into the I/O routines. Memory allocated through these interfaces is released back to the system using the TIFFfree routine.
 * https://linux.die.net/man/3/tifffree
 * @type {(size: number) => number | null}
*/
export const TIFFFree = Module.cwrap("_TIFFfree", "number", ["number"]);

/**
 * TIFFGetField returns the value of a tag or pseudo-tag associated with the the current directory of the open TIFF file tif.
 * http://www.libtiff.org/man/TIFFGetField.3t.html
 * @type {(tif: number, tifTag: TiffTag) => number}
*/
export const TIFFGetField = Module.cwrap("GetField", "number", ["number", "number"]);

/**
 * TIFFLastDirectory returns a non-zero value if the current directory is the last directory in the file; otherwise zero is returned.
 * http://www.libtiff.org/man/TIFFquery.3t.html
 * @type {(tif: number) => number}
 * @param tif A TIFF pointer.
*/
export const TIFFLastDirectory = Module.cwrap("LastDirectory", "number", ["number"]);

/**
 * Read the next directory in the specified file and make it the current directory. Applications only need to call TIFFReadDirectory to read multiple subfiles in a single TIFF file-- the first directory in a file is automatically read when TIFFOpen is called.
 * http://www.libtiff.org/man/TIFFquery.3t.html
 * @type {(tif: number) => number}
 * @param tif A TIFF pointer.
 * @return If the next directory was successfully read, 1 is returned. Otherwise, 0 is returned if an error was encountered, or if there are no more directories to be read.
*/
export const TIFFReadDirectory = Module.cwrap("ReadDirectory", "number", ["number"]);

/**
 * Read the next directory in the specified file and make it the current directory. Applications only need to call TIFFReadDirectory to read multiple subfiles in a single TIFF file-- the first directory in a file is automatically read when TIFFOpen is called.
 * http://www.libtiff.org/man/TIFFSetDirectory.3t.html
 * @type {(tif: number, dirnum: number) => number}
 * @param tif A TIFF pointer.
 * @param dirnum Specifies the subfile/directory as an integer number, with the first directory numbered zero.
 * @return On successful return 1 is returned. Otherwise, 0 is returned if dirnum specifies a non-existent directory, or if an error was encountered while reading the directory's contents.
*/
export const TIFFSetDirectory = Module.cwrap("SetDirectory", "number", ["number", "number"]);

/**
 * A wrapper around TIFFGetField to retrieve content as string.
 * http://www.libtiff.org/man/TIFFGetField.3t.html
 * @type {(tif: number, tifTag: TiffTag) => string}
*/
export const TIFFGetStringField = Module.cwrap("GetStringField", "string", ["number", "number"]);

/**
 * TIFFReadRGBAImage reads a strip- or tile-based image into memory, storing the result in the user supplied raster.
 * http://www.libtiff.org/man/TIFFReadRGBAImage.3t.html
 * @type {(tif: number, width: number, height: number, raster: number, stopOnError: true) => number}
 * @param tif A TIFF pointer.
 * @param stopOnError specifies how to act if an error is encountered while reading the image. If stopOnError is non-zero, then an error will terminate the operation; otherwise TIFFReadRGBAImage will continue processing data until all the possible data in the image have been requested.
 * @return 1 is returned if the image was successfully read and converted. Otherwise, 0 is returned if an error was encountered and stopOnError is zero.
*/
export const TIFFReadRGBAImage = Module.cwrap("TIFFReadRGBAImage", "number", ["number", "number", "number", "number", "number"]);

/**
 * TIFFReadRGBAImageOriented reads a strip- or tile-based image into memory, storing the result in the user supplied raster.
 * http://www.libtiff.org/man/TIFFReadRGBAImage.3t.html
 * @type {(tif: number, width: number, height: number, raster: number, orientation: Orientation, stopOnError: true) => number}
 * @param tif A TIFF pointer.
 * @param stopOnError specifies how to act if an error is encountered while reading the image. If stopOnError is non-zero, then an error will terminate the operation; otherwise TIFFReadRGBAImage will continue processing data until all the possible data in the image have been requested.
 * @return 1 is returned if the image was successfully read and converted. Otherwise, 0 is returned if an error was encountered and stopOnError is zero.
*/
export const TIFFReadRGBAImageOriented = Module.cwrap("TIFFReadRGBAImageOriented", "number", ["number", "number", "number", "number", "number", "number"]);