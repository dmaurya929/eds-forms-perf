import cleanup from 'rollup-plugin-cleanup';

// Keep these external — all HTTP-cached via head.html preloads before the worker starts.
const external = (id) => id.includes('afb-runtime')
  || id.endsWith('constant.js')
  || id.endsWith('util.js');

// Ensure all runtime references use .min.js in the bundle output regardless of
// which mode swap-shims last wrote to the source files. Covers:
// - afb-runtime.js → afb-runtime.min.js
// - functions.js → functions.min.js (fallback path in onmessage handler)
const remapToMin = {
  name: 'remap-to-min',
  renderChunk(code) {
    return code
      .replace(/afb-runtime\.js/g, 'afb-runtime.min.js')
      .replace(/functions\.js/g, 'functions.min.js');
  },
};

export default {
  input: 'blocks/form/rules/RuleEngineWorker.js',
  external,
  plugins: [cleanup({ comments: 'none' }), remapToMin],
  output: {
    file: 'blocks/form/rules/RuleEngineWorker-bundle.js',
    format: 'es',
    // No terser — minification of the worker is deliberately excluded.
  },
};
