/**
 * Simulates async API prefill — sets f0001 (number) after 300ms.
 * setTimeout returns immediately so the browser paints first; CLS fires at t+300ms.
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
 * setTimeout returns immediately so the browser paints first; CLS fires at t+600ms.
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
 * setTimeout returns immediately so the browser paints first; CLS fires at t+900ms.
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
 * setTimeout returns immediately so the browser paints first; CLS fires at t+1200ms.
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

export { initPerfF0001, initPerfF0005, initPerfF0006, initPerfF0007, showPerfF0003, showPerfF0004 };
