// ─── Step init functions ──────────────────────────────────────────────────────

/**
 * Step 1 init: sets f0001 default value and logs.
 * @name initPerfS1F1 Init Perf S1 F1
 * @param {scope} globals
 */
function initPerfS1F1(globals) {
  console.log('[perf] s1 init F1 — setting f0001');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: 100 });
}

/**
 * Step 1 init: hides f0003 (simulates conditional field suppression).
 * @name initPerfS1F2 Init Perf S1 F2
 * @param {scope} globals
 */
function initPerfS1F2(globals) {
  console.log('[perf] s1 init F2 — hiding f0003');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0003, { visible: false });
}

/**
 * Step 1 init: shows f0004 and sets its value.
 * @name initPerfS1F3 Init Perf S1 F3
 * @param {scope} globals
 */
function initPerfS1F3(globals) {
  console.log('[perf] s1 init F3 — showing f0004 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: true, value: true });
}

/**
 * Step 2 init: sets f0085 default value and logs.
 * @name initPerfS2F1 Init Perf S2 F1
 * @param {scope} globals
 */
function initPerfS2F1(globals) {
  console.log('[perf] s2 init F1 — setting f0085');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0085, { value: 'S2 Init' });
}

/**
 * Step 2 init: hides f0086 (simulates conditional suppression).
 * @name initPerfS2F2 Init Perf S2 F2
 * @param {scope} globals
 */
function initPerfS2F2(globals) {
  console.log('[perf] s2 init F2 — hiding f0086');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0086, { visible: false });
}

/**
 * Step 3 init: sets f0155 default value and logs.
 * @name initPerfS3F1 Init Perf S3 F1
 * @param {scope} globals
 */
function initPerfS3F1(globals) {
  console.log('[perf] s3 init F1 — setting f0155');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0155, { value: 'Step3' });
}

/**
 * Step 3 init: hides f0156.
 * @name initPerfS3F2 Init Perf S3 F2
 * @param {scope} globals
 */
function initPerfS3F2(globals) {
  console.log('[perf] s3 init F2 — hiding f0156');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0156, { visible: false });
}

/**
 * Step 3 init: shows f0157 and sets its value.
 * @name initPerfS3F3 Init Perf S3 F3
 * @param {scope} globals
 */
function initPerfS3F3(globals) {
  console.log('[perf] s3 init F3 — showing f0157 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0157, { visible: true, value: 157 });
}

/**
 * Step 4 init: sets f0239 default value and logs.
 * @name initPerfS4F1 Init Perf S4 F1
 * @param {scope} globals
 */
function initPerfS4F1(globals) {
  console.log('[perf] s4 init F1 — setting f0239');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0239, { value: 239 });
}

/**
 * Step 4 init: hides f0240.
 * @name initPerfS4F2 Init Perf S4 F2
 * @param {scope} globals
 */
function initPerfS4F2(globals) {
  console.log('[perf] s4 init F2 — hiding f0240');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0240, { visible: false });
}

/**
 * Step 5 init: sets f0469 default value and logs.
 * @name initPerfS5F1 Init Perf S5 F1
 * @param {scope} globals
 */
function initPerfS5F1(globals) {
  console.log('[perf] s5 init F1 — setting f0469');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0469, { value: 'S5 Init' });
}

/**
 * Step 5 init: hides f0470.
 * @name initPerfS5F2 Init Perf S5 F2
 * @param {scope} globals
 */
function initPerfS5F2(globals) {
  console.log('[perf] s5 init F2 — hiding f0470');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0470, { visible: false });
}

/**
 * Step 5 init: shows f0471 and sets its value.
 * @name initPerfS5F3 Init Perf S5 F3
 * @param {scope} globals
 */
function initPerfS5F3(globals) {
  console.log('[perf] s5 init F3 — showing f0471 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0471, { visible: true, value: 471 });
}

/**
 * Step 6 init: sets f0689 default value and logs.
 * @name initPerfS6F1 Init Perf S6 F1
 * @param {scope} globals
 */
function initPerfS6F1(globals) {
  console.log('[perf] s6 init F1 — setting f0689');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0689, { value: 'S6 loaded' });
}

/**
 * Step 6 init: hides f0690.
 * @name initPerfS6F2 Init Perf S6 F2
 * @param {scope} globals
 */
function initPerfS6F2(globals) {
  console.log('[perf] s6 init F2 — hiding f0690');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0690, { visible: false });
}

/**
 * Step 7 init: sets f0843 default value and logs.
 * @name initPerfS7F1 Init Perf S7 F1
 * @param {scope} globals
 */
function initPerfS7F1(globals) {
  console.log('[perf] s7 init F1 — setting f0843');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0843, { value: 'S7 init' });
}

/**
 * Step 7 init: hides f0844.
 * @name initPerfS7F2 Init Perf S7 F2
 * @param {scope} globals
 */
function initPerfS7F2(globals) {
  console.log('[perf] s7 init F2 — hiding f0844');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0844, { visible: false });
}

/**
 * Step 7 init: shows f0845 and sets its value.
 * @name initPerfS7F3 Init Perf S7 F3
 * @param {scope} globals
 */
function initPerfS7F3(globals) {
  console.log('[perf] s7 init F3 — showing f0845 and setting value');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0845, { visible: true, value: 845 });
}

/**
 * Step 8 init: sets f1025 default value and logs.
 * @name initPerfS8F1 Init Perf S8 F1
 * @param {scope} globals
 */
function initPerfS8F1(globals) {
  console.log('[perf] s8 init F1 — setting f1025');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1025, { value: 'S8 ready' });
}

/**
 * Step 8 init: hides f1026.
 * @name initPerfS8F2 Init Perf S8 F2
 * @param {scope} globals
 */
function initPerfS8F2(globals) {
  console.log('[perf] s8 init F2 — hiding f1026');
  globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1026, { visible: false });
}

// ─── Legacy init stubs (preserved) ───────────────────────────────────────────

/**
 * Simulates async API prefill — sets f0001 (number) after 300ms.
 * @name initPerfF0001 Init Perf F0001
 * @param {scope} globals
 */
function initPerfF0001(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0001, { value: 42000 });
  }, 300);
}

/**
 * Simulates async API prefill — sets f0005 (date) after 600ms.
 * @name initPerfF0005 Init Perf F0005
 * @param {scope} globals
 */
function initPerfF0005(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { value: '2026-01-15' });
  }, 600);
}

/**
 * Simulates async API prefill — sets f0006 (text) after 900ms.
 * @name initPerfF0006 Init Perf F0006
 * @param {scope} globals
 */
function initPerfF0006(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0006, { value: 'Auto-filled Name' });
  }, 900);
}

/**
 * Simulates async API prefill — sets f0007 (text) after 1200ms.
 * @name initPerfF0007 Init Perf F0007
 * @param {scope} globals
 */
function initPerfF0007(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0007, { value: 'Auto-filled City' });
  }, 1200);
}

/**
 * Shows f0003 (radio-group) after 300ms — triggers CLS at t+300ms.
 * @name showPerfF0003 Show Perf F0003
 * @param {scope} globals
 */
function showPerfF0003(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0003, { visible: true });
  }, 300);
}

/**
 * Shows f0004 (checkbox) after 500ms — triggers CLS at t+500ms.
 * @name showPerfF0004 Show Perf F0004
 * @param {scope} globals
 */
function showPerfF0004(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0004, { visible: true });
  }, 500);
}

// ─── API simulations — set field value after delay ────────────────────────────

/**
 * Simulates API response: sets f0002 value after 300ms.
 * @name apiSetF0002_300ms API Set f0002 300ms
 * @param {scope} globals
 */
function apiSetF0002_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0002, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0005 value after 200ms.
 * @name apiSetF0005_200ms API Set f0005 200ms
 * @param {scope} globals
 */
function apiSetF0005_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { value: '2026-03-01' });
  }, 200);
}

/**
 * Simulates API response: sets f0008 value after 500ms.
 * @name apiSetF0008_500ms API Set f0008 500ms
 * @param {scope} globals
 */
function apiSetF0008_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0008, { value: 'API Result' });
  }, 500);
}

/**
 * Simulates API response: sets f0090 value after 400ms.
 * @name apiSetF0090_400ms API Set f0090 400ms
 * @param {scope} globals
 */
function apiSetF0090_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0090, { value: 400 });
  }, 400);
}

/**
 * Simulates API response: sets f0095 value after 250ms.
 * @name apiSetF0095_250ms API Set f0095 250ms
 * @param {scope} globals
 */
function apiSetF0095_250ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.p2_l2.f0095, { value: 'Prefilled' });
  }, 250);
}

/**
 * Simulates API response: sets f0160 value after 300ms.
 * @name apiSetF0160_300ms API Set f0160 300ms
 * @param {scope} globals
 */
function apiSetF0160_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0160, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0165 value after 450ms.
 * @name apiSetF0165_450ms API Set f0165 450ms
 * @param {scope} globals
 */
function apiSetF0165_450ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0165, { value: '2026-06-15' });
  }, 450);
}

/**
 * Simulates API response: sets f0250 value after 300ms.
 * @name apiSetF0250_300ms API Set f0250 300ms
 * @param {scope} globals
 */
function apiSetF0250_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0250, { value: 300 });
  }, 300);
}

/**
 * Simulates API response: sets f0280 value after 500ms.
 * @name apiSetF0280_500ms API Set f0280 500ms
 * @param {scope} globals
 */
function apiSetF0280_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0280, { value: 'Result' });
  }, 500);
}

/**
 * Simulates API response: sets f0500 value after 200ms.
 * @name apiSetF0500_200ms API Set f0500 200ms
 * @param {scope} globals
 */
function apiSetF0500_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0500, { value: 200 });
  }, 200);
}

/**
 * Simulates API response: sets f0520 value after 400ms.
 * @name apiSetF0520_400ms API Set f0520 400ms
 * @param {scope} globals
 */
function apiSetF0520_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0520, { value: 'Data' });
  }, 400);
}

/**
 * Simulates API response: sets f0700 value after 300ms.
 * @name apiSetF0700_300ms API Set f0700 300ms
 * @param {scope} globals
 */
function apiSetF0700_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0700, { value: 700 });
  }, 300);
}

/**
 * Simulates API response: sets f0710 value after 500ms.
 * @name apiSetF0710_500ms API Set f0710 500ms
 * @param {scope} globals
 */
function apiSetF0710_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0710, { value: 'Loaded' });
  }, 500);
}

/**
 * Simulates API response: sets f0850 value after 400ms.
 * @name apiSetF0850_400ms API Set f0850 400ms
 * @param {scope} globals
 */
function apiSetF0850_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0850, { value: 850 });
  }, 400);
}

/**
 * Simulates API response: sets f0860 value after 300ms.
 * @name apiSetF0860_300ms API Set f0860 300ms
 * @param {scope} globals
 */
function apiSetF0860_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0860, { value: 'Response' });
  }, 300);
}

/**
 * Simulates API response: sets f1050 value after 200ms.
 * @name apiSetF1050_200ms API Set f1050 200ms
 * @param {scope} globals
 */
function apiSetF1050_200ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1050, { value: 1050 });
  }, 200);
}

/**
 * Simulates API response: sets f1060 value after 400ms.
 * @name apiSetF1060_400ms API Set f1060 400ms
 * @param {scope} globals
 */
function apiSetF1060_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1060, { value: 'Final' });
  }, 400);
}

// ─── Hide fields after delay ──────────────────────────────────────────────────

/**
 * Hides f0005 after 300ms post-initialisation.
 * @name hideF0005_300ms Hide f0005 300ms
 * @param {scope} globals
 */
function hideF0005_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0005, { visible: false });
  }, 300);
}

/**
 * Hides f0006 after 400ms post-initialisation.
 * @name hideF0006_400ms Hide f0006 400ms
 * @param {scope} globals
 */
function hideF0006_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s1.f0006, { visible: false });
  }, 400);
}

/**
 * Hides f0092 after 350ms post-initialisation.
 * @name hideF0092_350ms Hide f0092 350ms
 * @param {scope} globals
 */
function hideF0092_350ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s2.f0092, { visible: false });
  }, 350);
}

/**
 * Hides f0158 after 280ms post-initialisation.
 * @name hideF0158_280ms Hide f0158 280ms
 * @param {scope} globals
 */
function hideF0158_280ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0158, { visible: false });
  }, 280);
}

/**
 * Hides f0159 after 380ms post-initialisation.
 * @name hideF0159_380ms Hide f0159 380ms
 * @param {scope} globals
 */
function hideF0159_380ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s3.f0159, { visible: false });
  }, 380);
}

/**
 * Hides f0260 after 400ms post-initialisation.
 * @name hideF0260_400ms Hide f0260 400ms
 * @param {scope} globals
 */
function hideF0260_400ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s4.s4p1.f0260, { visible: false });
  }, 400);
}

/**
 * Hides f0480 after 300ms post-initialisation.
 * @name hideF0480_300ms Hide f0480 300ms
 * @param {scope} globals
 */
function hideF0480_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s5.s5p1.f0480, { visible: false });
  }, 300);
}

/**
 * Hides f0695 after 250ms post-initialisation.
 * @name hideF0695_250ms Hide f0695 250ms
 * @param {scope} globals
 */
function hideF0695_250ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0695, { visible: false });
  }, 250);
}

/**
 * Hides f0696 after 450ms post-initialisation.
 * @name hideF0696_450ms Hide f0696 450ms
 * @param {scope} globals
 */
function hideF0696_450ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s6.f0696, { visible: false });
  }, 450);
}

/**
 * Hides f0855 after 350ms post-initialisation.
 * @name hideF0855_350ms Hide f0855 350ms
 * @param {scope} globals
 */
function hideF0855_350ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s7.f0855, { visible: false });
  }, 350);
}

/**
 * Hides f1030 after 300ms post-initialisation.
 * @name hideF1030_300ms Hide f1030 300ms
 * @param {scope} globals
 */
function hideF1030_300ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1030, { visible: false });
  }, 300);
}

/**
 * Hides f1040 after 500ms post-initialisation.
 * @name hideF1040_500ms Hide f1040 500ms
 * @param {scope} globals
 */
function hideF1040_500ms(globals) {
  setTimeout(function () {
    globals.functions.setProperty(globals.form.wizardStepsPanel.s8.s8p1.f1040, { visible: false });
  }, 500);
}

export {
  // step init stubs
  initPerfS1F1, initPerfS1F2, initPerfS1F3,
  initPerfS2F1, initPerfS2F2,
  initPerfS3F1, initPerfS3F2, initPerfS3F3,
  initPerfS4F1, initPerfS4F2,
  initPerfS5F1, initPerfS5F2, initPerfS5F3,
  initPerfS6F1, initPerfS6F2,
  initPerfS7F1, initPerfS7F2, initPerfS7F3,
  initPerfS8F1, initPerfS8F2,
  // legacy
  initPerfF0001, initPerfF0005, initPerfF0006, initPerfF0007,
  showPerfF0003, showPerfF0004,
  // api simulations
  apiSetF0002_300ms, apiSetF0005_200ms, apiSetF0008_500ms,
  apiSetF0090_400ms, apiSetF0095_250ms,
  apiSetF0160_300ms, apiSetF0165_450ms,
  apiSetF0250_300ms, apiSetF0280_500ms,
  apiSetF0500_200ms, apiSetF0520_400ms,
  apiSetF0700_300ms, apiSetF0710_500ms,
  apiSetF0850_400ms, apiSetF0860_300ms,
  apiSetF1050_200ms, apiSetF1060_400ms,
  // hide after delay
  hideF0005_300ms, hideF0006_400ms,
  hideF0092_350ms,
  hideF0158_280ms, hideF0159_380ms,
  hideF0260_400ms,
  hideF0480_300ms,
  hideF0695_250ms, hideF0696_450ms,
  hideF0855_350ms,
  hideF1030_300ms, hideF1040_500ms,
};
