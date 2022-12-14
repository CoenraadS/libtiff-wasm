#include "tiffio.h"

int GetField(TIFF *tiff, uint32 field) {
  int value = 0;
  TIFFGetField(tiff, field, &value);
  return value;
}

char* GetStringField(TIFF *tiff, uint32 field) {
  char* value = 0;
  TIFFGetField(tiff, field, &value);
  return value;
}

int LastDirectory(TIFF *tiff) {
  return TIFFLastDirectory(tiff);
}

int ReadDirectory(TIFF *tiff) {
  return TIFFReadDirectory(tiff);
}

int SetDirectory(TIFF *tiff, int dir) {
  return TIFFSetDirectory(tiff, dir);
}
