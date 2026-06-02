import { registerFunctions, createFormInstance } from './model/afb-runtime.min.js';
import { getLogLevelFromURL } from '../constant.js';
import { externalize } from './functions.min.js';

async function registerCustomFunctions(customFunctionsPath, codeBasePath) {
  try {
    function registerFunctionsInRuntime(module) {
      const keys = Object.keys(module);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const funcDef = module[key];
        if (typeof funcDef === 'function') {
          const functions = [];
          functions[key] = funcDef;
          registerFunctions(functions);
        }
      }
    }
    const base = (codeBasePath != null && codeBasePath !== undefined)
      ? codeBasePath.replace(/\/$/, '')
      : '';
    const ootbFunctionsPath = base + '/blocks/form/rules/functions.min.js';
    const imports = [import( ootbFunctionsPath)];
    if (codeBasePath != null && codeBasePath !== undefined
      && customFunctionsPath != null && customFunctionsPath !== undefined) {
      imports.push(import(`${codeBasePath}${customFunctionsPath}`));
    }
    const results = await Promise.allSettled(imports);
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        registerFunctionsInRuntime(result.value);
      } else {
        console.warn(`failed to load functions module: ${result.reason?.message}`);
      }
    });
    if (typeof window !== 'undefined') {
      const eagerModule = results.find(
        (r) => r.status === 'fulfilled' && typeof r.value?.loadLazyBundle === 'function',
      );
      if (eagerModule) {
        window.hlx = window.hlx || {};
        window.hlx.loadLazyBundle = eagerModule.value.loadLazyBundle;
      }
    }
  } catch (e) {
    console.log(`error occured while registering custom functions in web worker ${e.message}`);
  }
}

Array.from({ length: 6 }, (_, i) => `<h${i + 1}>`).join('');
Object.entries({
  'password|tel|email|text': [['maxLength', 'maxlength'], ['minLength', 'minlength'], 'pattern'],
  'number|range|date': [['maximum', 'Max'], ['minimum', 'Min'], 'step'],
  file: ['accept', 'Multiple'],
  panel: [['maxOccur', 'data-max'], ['minOccur', 'data-min']],
}).flatMap(([types, constraintDef]) => types.split('|')
  .map((type) => [type, constraintDef.map((cd) => (Array.isArray(cd) ? cd : [cd, cd]))]));
async function fetchData(id, search = '') {
  try {
    const url = externalize(`/adobe/forms/af/data/${id}${search}`);
    const response = await fetch(url);
    const json = await response.json();
    const { data: prefillData } = json;
    const { data: { afData: { afBoundData: { data = {} } = {} } = {} } = {} } = json;
    return Object.keys(data).length > 0 ? data : (prefillData || json);
  } catch (ex) {
    return null;
  }
}

let customFunctionRegistered = false;
class RuleEngine {
  rulesOrder = {};
  fieldChanges = [];
  postRestoreFieldChanges = [];
  postRestoreCompleteSent = false;
  restoreSent = false;
  constructor(formDef, url) {
    const logLevel = getLogLevelFromURL(url);
    this.form = createFormInstance(formDef, undefined, logLevel);
    this.form.subscribe((e) => {
      const { payload } = e;
      this.handleFieldChanged(payload);
    }, 'fieldChanged');
    this.form.subscribe((e) => {
      const { payload } = e;
      if (this.postRestoreCompleteSent) {
        postMessage({
          name: 'applyLiveFormChange',
          payload,
        });
      }
    }, 'change');
  }
  handleFieldChanged(payload) {
    if (this.postRestoreCompleteSent) {
      postMessage({
        name: 'applyFieldChanges',
        payload: { fieldChanges: payload },
      });
    } else if (this.restoreSent) {
      this.postRestoreFieldChanges.push(payload);
    } else {
      this.fieldChanges.push(payload);
    }
  }
  getState() {
    return this.form.getState(true);
  }
  getFieldChanges() {
    return this.fieldChanges;
  }
  getCustomFunctionsPath() {
    return this.form?.properties?.customFunctionsPath || '../functions.min.js';
  }
}
let ruleEngine;
let initPayload;
onmessage = async (e) => {
  async function handleMessageEvent(event) {
    switch (event.data.name) {
      case 'createFormInstance': {
        const { search, ...formDef } = event.data.payload;
        initPayload = event.data.payload;
        ruleEngine = new RuleEngine(formDef, event.data.url);
        const state = ruleEngine.getState();
        postMessage({
          name: 'renderForm',
          payload: state,
        });
        ruleEngine.dispatch = (msg) => {
          postMessage(msg);
        };
        break;
      }
    }
  }
  if (e.data.name === 'decorated') {
    const { search, ...formDef } = initPayload;
    const needsPrefill = formDef?.properties?.['fd:formDataEnabled'] === true;
    const data = needsPrefill ? await fetchData(formDef.id, search) : null;
    if (data) {
      ruleEngine.form.importData(data);
    }
    await ruleEngine.form.waitForPromises();
    postMessage({
      name: 'restoreState',
      payload: {
        state: ruleEngine.getState(),
      },
    });
    ruleEngine.restoreSent = true;
    await new Promise((r) => {
      setTimeout(r, 0);
    });
    const allFieldChanges = [
      ...ruleEngine.getFieldChanges(),
      ...ruleEngine.postRestoreFieldChanges,
    ];
    if (allFieldChanges.length > 0) {
      postMessage({
        name: 'applyFieldChanges',
        payload: { fieldChanges: allFieldChanges },
      });
    }
    ruleEngine.postRestoreCompleteSent = true;
    ruleEngine.restoreSent = false;
    ruleEngine.postRestoreFieldChanges = [];
    postMessage({
      name: 'sync-complete',
    });
  }
  if (!customFunctionRegistered) {
    const codeBasePath = e?.data?.codeBasePath;
    const customFunctionPath = e?.data?.payload?.properties?.customFunctionsPath || '/blocks/form/functions.min.js';
    registerCustomFunctions(customFunctionPath, codeBasePath).then(() => {
      customFunctionRegistered = true;
      handleMessageEvent(e);
    });
  }
};

export { RuleEngine as default };
