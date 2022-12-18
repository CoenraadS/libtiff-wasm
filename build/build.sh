#!/bin/bash

set -e
source ./versions.sh

export EMCC_CFLAGS="-O2"

SRC_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TMP_DIR="/tmp/libtiff"
OUTPUT_DIR="/out"

rm -f ${OUTPUT_DIR}/libtiff-wasm.raw.js
rm -f ${OUTPUT_DIR}/libtiff-wasm.raw.wasm

mkdir -p ${TMP_DIR}

cd ${TMP_DIR}

# build zlib
if [ ! -f "./zlib-${ZLIB_PKGVER}.tar.gz" ]
then
    wget http://zlib.net/fossils/zlib-${ZLIB_PKGVER}.tar.gz
fi
tar xf zlib-${ZLIB_PKGVER}.tar.gz
cd zlib-${ZLIB_PKGVER}
emconfigure ./configure --static
emmake make
cd ..

# build libjpeg
if [ ! -f "./jpegsrc.v${LIBJPEG_PKGVER}.tar.gz" ]
then
wget http://www.ijg.org/files/jpegsrc.v${LIBJPEG_PKGVER}.tar.gz
fi
tar xf jpegsrc.v${LIBJPEG_PKGVER}.tar.gz
cd jpeg-${LIBJPEG_PKGVER}
emconfigure ./configure --enable-shared=no
emmake make clean # do not ask me why i have to clean here...
emmake make
cd ..

# # build libtiff
if [ ! -f "./tiff-${LIBTIFF_PKGVER}.tar.gz" ]
then
wget http://download.osgeo.org/libtiff/tiff-${LIBTIFF_PKGVER}.tar.gz
fi
tar xzvf tiff-${LIBTIFF_PKGVER}.tar.gz
cd tiff-${LIBTIFF_PKGVER}
emconfigure ./configure \
            --disable-tools \
            --disable-tests \
            --disable-contrib \
            --disable-docs \
            --with-zlib-include-dir=${TMP_DIR}/zlib-${ZLIB_PKGVER}/ \
            --with-zlib-lib-dir=${TMP_DIR}/zlib-${ZLIB_PKGVER}/ \
            --with-jpeg-include-dir=${TMP_DIR}/jpeg-${LIBJPEG_PKGVER}/ \
            --with-jpeg-lib-dir=${TMP_DIR}/jpeg-${LIBJPEG_PKGVER}/.libs/ \
            --enable-shared=no
emmake make
cd ..

. ${SRC_DIR}/package.sh

