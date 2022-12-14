# LibTIFF-wasm.js

`LibTIFF-wasm.js` is an unofficial port of [LibTIFF](http://www.simplesystems.org/libtiff/) to WebAssembly using [Emscripten](https://emscripten.org/).

## Build

This project builds using docker (linux mode)

After build, the `out` dir will contain the following files:

```
out
 ┣ libtiff-wasm.js
 ┣ libtiff-wasm.raw.js
 ┗ libtiff-wasm.raw.wasm
 ```

 This can be used like:
 
 ```
<script src="/out/libtiff-wasm.raw.js"></script>
<script type="module">
    import * from './out/libtiff-wasm.js';
    // Your code here
</script>
```

### Windows
Run `build.cmd`

### Linux
- TODO: (Port build.cmd to bash)

## Demo

Launch `index.html` in a browser for a basic file picker demo to display a TIFF image

## License

The LibTIFF is LibTIFF Software License, zlib and additional code are zlib License.

## Attribution

Fork history:
- https://github.com/Pearman91/tiff.js
- https://github.com/Twinklebear/tiff.js
- https://github.com/seikichi/tiff.js