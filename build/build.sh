#!/bin/bash

export EMCC_CFLAGS="-O2"
ZLIB_PKGVER=1.2.11
LIBTIFF_PKGVER=4.0.10
LIBJPEG_PKGVER=9c

SRC_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
TMP_DIR="/tmp/libtiff"
mkdir -p ${TMP_DIR}

cd ${TMP_DIR}

# build zlib
if [ ! -f "/${ZLIB_PKGVER}.tar.gz" ]
then
    wget http://zlib.net/fossils/zlib-${ZLIB_PKGVER}.tar.gz
fi
tar xf zlib-${ZLIB_PKGVER}.tar.gz
cd zlib-${ZLIB_PKGVER}
emconfigure ./configure --static
emmake make
cd ..

# build libjpeg
if [ ! -f "/jpegsrc.v${LIBJPEG_PKGVER}.tar.gz" ]
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
if [ ! -f "/tiff-${LIBTIFF_PKGVER}.tar.gz" ]
then
wget http://download.osgeo.org/libtiff/tiff-${LIBTIFF_PKGVER}.tar.gz
fi
tar xzvf tiff-${LIBTIFF_PKGVER}.tar.gz
cd tiff-${LIBTIFF_PKGVER}
emconfigure ./configure \
            --with-zlib-include-dir=${TMP_DIR}/zlib-${ZLIB_PKGVER}/ \
            --with-zlib-lib-dir=${TMP_DIR}/zlib-${ZLIB_PKGVER}/ \
            --with-jpeg-include-dir=${TMP_DIR}/jpeg-${LIBJPEG_PKGVER}/ \
            --with-jpeg-lib-dir=${TMP_DIR}/jpeg-${LIBJPEG_PKGVER}/.libs/ \
            --enable-shared=no
emmake make
cd ..

. ${SRC_DIR}/package.sh

