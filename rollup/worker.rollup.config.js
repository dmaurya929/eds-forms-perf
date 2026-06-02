import cleanup from 'rollup-plugin-cleanup';

// Keep afb-runtime and constant.js external — HTTP-cached via head.html preloads.
// Keep functions.js/functions.min.js external — HTTP cache warmed by the main thread
// before the worker is created (registerCustomFunctions loads functions.min.js first).
// This mirrors the approach in custom-functions.rollup.config.js.
const isFunctionsFile = (id) => {
  const base = id.split('/').pop();
  return base === 'functions.js' || base === 'functions.min.js';
};

const external = (id) => id.includes('afb-runtime')
  || id.endsWith('constant.js')
  || isFunctionsFile(id);

// Ensure all runtime references use .min.js in the bundle output, regardless of
// which mode the source files are in. Covers:
// - afb-runtime.js → afb-runtime.min.js (external, may be dev-mode in source)
// - functions.js → functions.min.js (util.js imports functions.js; the main
//   thread warms the HTTP cache with functions.min.js before the worker starts,
//   so the worker must request the same URL to get a cache hit)
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
