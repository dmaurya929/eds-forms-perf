/* eslint-env mocha */
import assert from 'assert';
import jsdom from 'jsdom';
import { generateFormRendition } from '../../blocks/form/form.source.js';
import { isStepLayoutComponent, registerStepLayout } from '../../blocks/form/mappings.js';
import { resetIds } from '../../blocks/form/util.js';

function makeWindow() {
  global.window = new jsdom.JSDOM('', { url: 'http://localhost:2000/test/path' }).window;
  window.hlx = { codeBasePath: '../..' };
}

// Minimal wizard panel fixture — mirrors the shape the rule engine sends in renderForm.
function makeWizardDef(overrides = {}) {
  return {
    id: 'wizard-root',
    fieldType: 'form',
    action: '/some/form',
    adaptiveform: '0.12.1',
    metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
    ':type': 'forms-components-examples/components/form/container',
    items: [
      {
        id: 'wizard-panel',
        fieldType: 'panel',
        name: 'wizard1',
        visible: true,
        ':type': 'forms-components-examples/components/form/wizard',
        activeChild: overrides.activeChild ?? null,
        label: { value: 'Wizard' },
        items: [
          {
            id: 'step1',
            fieldType: 'panel',
            name: 'step1',
            visible: true,
            label: { value: 'Step 1' },
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [
              {
                id: 'text1',
                fieldType: 'text-input',
                name: 'text1',
                visible: true,
                label: { value: 'Name' },
              },
            ],
          },
          {
            id: 'step2',
            fieldType: 'panel',
            name: 'step2',
            visible: true,
            label: { value: 'Step 2' },
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [
              {
                id: 'text2',
                fieldType: 'text-input',
                name: 'text2',
                visible: true,
                label: { value: 'Email' },
              },
            ],
          },
          {
            id: 'step3',
            fieldType: 'panel',
            name: 'step3',
            visible: true,
            label: { value: 'Step 3' },
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [],
          },
        ],
      },
    ],
  };
}

function makeAccordionDef() {
  return {
    id: 'accordion-root',
    fieldType: 'form',
    action: '/some/form',
    adaptiveform: '0.12.1',
    metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
    ':type': 'forms-components-examples/components/form/container',
    items: [
      {
        id: 'accordion-panel',
        fieldType: 'panel',
        name: 'accordion1',
        visible: true,
        ':type': 'accordion',
        label: { value: 'Accordion' },
        items: [
          {
            id: 'acc1',
            fieldType: 'panel',
            name: 'acc1',
            visible: true,
            label: { value: 'Panel 1' },
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [
              {
                id: 'email1',
                fieldType: 'email',
                name: 'email1',
                visible: true,
                label: { value: 'Email' },
              },
            ],
          },
          {
            id: 'acc2',
            fieldType: 'panel',
            name: 'acc2',
            visible: true,
            label: { value: 'Panel 2' },
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [
              {
                id: 'num1',
                fieldType: 'number-input',
                name: 'num1',
                visible: true,
                type: 'number',
                label: { value: 'Number' },
              },
            ],
          },
        ],
      },
    ],
  };
}

async function render(formDef, lazyPanels, lazyComponents) {
  const container = document.createElement('form');
  await generateFormRendition(formDef, container, 'test-form-id', undefined, { lazyPanels, lazyComponents });
  return container;
}

describe('Lazy step-layout rendering', () => {
  beforeEach(() => {
    resetIds();
    makeWindow();
    document.body.innerHTML = '';
  });

  describe('Wizard: non-first panels deferred', () => {
    it('defers step 2 and step 3 to _lazyPanels', async () => {
      const lazyPanels = new Map();
      await render(makeWizardDef(), lazyPanels);
      assert.ok(lazyPanels.has('step2'), 'step2 should be deferred');
      assert.ok(lazyPanels.has('step3'), 'step3 should be deferred');
    });

    it('renders step 1 immediately (has children in DOM)', async () => {
      const lazyPanels = new Map();
      const form = await render(makeWizardDef(), lazyPanels);
      const step1 = form.querySelector('#step1');
      assert.ok(step1, 'step1 wrapper exists');
      assert.ok(step1.querySelector('#text1'), 'step1 children are rendered');
    });

    it('leaves deferred panel wrappers in the DOM (empty)', async () => {
      const lazyPanels = new Map();
      const form = await render(makeWizardDef(), lazyPanels);
      const step2 = form.querySelector('#step2');
      assert.ok(step2, 'step2 wrapper exists in DOM');
      assert.ok(!step2.querySelector('#text2'), 'step2 has no children yet');
    });

    it('does not defer step 1 even though activeChild is null', async () => {
      const lazyPanels = new Map();
      assert.ok(!lazyPanels.has('step1'), 'step1 should not be in lazyPanels before render');
      await render(makeWizardDef(), lazyPanels);
      assert.ok(!lazyPanels.has('step1'), 'step1 should not be deferred');
    });
  });

  describe('Wizard: explicit activeChild respected', () => {
    it('defers step1 and renders step2 when activeChild is step2', async () => {
      const lazyPanels = new Map();
      const formDef = makeWizardDef({ activeChild: 'step2' });
      // Set activeChild on the wizard panel directly (as the rule engine would)
      formDef.items[0].activeChild = 'step2';
      await render(formDef, lazyPanels);
      assert.ok(lazyPanels.has('step1'), 'step1 should be deferred when step2 is active');
      assert.ok(!lazyPanels.has('step2'), 'step2 should render when it is the active child');
    });
  });

  describe('Accordion: non-first panels deferred', () => {
    it('defers acc2 to _lazyPanels', async () => {
      const lazyPanels = new Map();
      await render(makeAccordionDef(), lazyPanels);
      assert.ok(lazyPanels.has('acc2'), 'acc2 should be deferred');
    });

    it('renders acc1 immediately', async () => {
      const lazyPanels = new Map();
      const form = await render(makeAccordionDef(), lazyPanels);
      const acc1 = form.querySelector('#acc1');
      assert.ok(acc1, 'acc1 exists');
      assert.ok(acc1.querySelector('#email1'), 'acc1 has children');
    });

    it('deferred acc2 wrapper exists in DOM without children', async () => {
      const lazyPanels = new Map();
      const form = await render(makeAccordionDef(), lazyPanels);
      const acc2 = form.querySelector('#acc2');
      assert.ok(acc2, 'acc2 wrapper in DOM');
      assert.ok(!acc2.querySelector('#num1'), 'acc2 has no children');
    });
  });

  describe('Non-step-layout panels render eagerly', () => {
    it('visible: true plain nested panel is not deferred', async () => {
      const lazyPanels = new Map();
      const formDef = {
        id: 'plain-root',
        fieldType: 'form',
        action: '/form',
        adaptiveform: '0.12.1',
        metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
        ':type': 'forms-components-examples/components/form/container',
        items: [
          {
            id: 'outer',
            fieldType: 'panel',
            name: 'outer',
            visible: true,
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [
              {
                id: 'inner',
                fieldType: 'panel',
                name: 'inner',
                visible: true,
                ':type': 'forms-components-examples/components/form/panelcontainer',
                items: [],
              },
            ],
          },
        ],
      };
      await render(formDef, lazyPanels);
      assert.ok(!lazyPanels.has('inner'), 'nested plain panel should not be deferred');
    });

    it('visible: false non-step-layout panel is deferred to _lazyPanels', async () => {
      const lazyPanels = new Map();
      const formDef = {
        id: 'root',
        fieldType: 'form',
        action: '/form',
        adaptiveform: '0.12.1',
        metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
        ':type': 'container',
        items: [
          {
            id: 'hidden-panel',
            fieldType: 'panel',
            name: 'hidden',
            visible: false,
            ':type': 'forms-components-examples/components/form/panelcontainer',
            items: [],
          },
        ],
      };
      const form = await render(formDef, lazyPanels);
      assert.ok(lazyPanels.has('hidden-panel'), 'visible:false panel should be deferred to _lazyPanels');
      assert.ok(form.querySelector('#hidden-panel'), 'wrapper element still exists in DOM');
    });

    it('visible: false leaf field is deferred to lazyComponents', async () => {
      const lazyPanels = new Map();
      const lazyComponents = new Map();
      const formDef = {
        id: 'root2',
        fieldType: 'form',
        action: '/form',
        adaptiveform: '0.12.1',
        metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
        ':type': 'container',
        items: [
          {
            id: 'hidden-text',
            fieldType: 'text-input',
            name: 'hiddenText',
            visible: false,
            label: { value: 'Hidden' },
          },
        ],
      };
      await render(formDef, lazyPanels, lazyComponents);
      assert.ok(lazyComponents.has('hidden-text'), 'visible:false leaf field should be deferred to lazyComponents');
    });
  });

  describe('Custom step-layout via registerStepLayout', () => {
    afterEach(() => {
      // Clean up by not exposing a way to un-register — we just test the registration works
    });

    it('defers non-first children after registerStepLayout', async () => {
      registerStepLayout('custom-tabs');
      assert.ok(isStepLayoutComponent('my-org/components/form/custom-tabs'), 'registered type should be detected');

      const lazyPanels = new Map();
      const formDef = {
        id: 'tabs-root',
        fieldType: 'form',
        action: '/form',
        adaptiveform: '0.12.1',
        metadata: { grammar: 'json-formula-1.0.0', version: '1.0.0' },
        ':type': 'container',
        items: [
          {
            id: 'tabs-container',
            fieldType: 'panel',
            name: 'tabs1',
            visible: true,
            ':type': 'my-org/components/form/custom-tabs',
            items: [
              {
                id: 'tab1',
                fieldType: 'panel',
                name: 'tab1',
                visible: true,
                ':type': 'panelcontainer',
                items: [],
              },
              {
                id: 'tab2',
                fieldType: 'panel',
                name: 'tab2',
                visible: true,
                ':type': 'panelcontainer',
                items: [],
              },
            ],
          },
        ],
      };
      await render(formDef, lazyPanels);
      assert.ok(lazyPanels.has('tab2'), 'non-first tab should be deferred for custom step-layout');
      assert.ok(!lazyPanels.has('tab1'), 'first tab should render immediately');
    });
  });

  describe('isStepLayoutComponent registry', () => {
    it('returns true for short wizard type', () => {
      assert.ok(isStepLayoutComponent('wizard'));
    });

    it('returns true for full AEM wizard resource type', () => {
      assert.ok(isStepLayoutComponent('core/fd/components/form/wizard/v1/wizard'));
    });

    it('returns true for accordion', () => {
      assert.ok(isStepLayoutComponent('accordion'));
    });

    it('returns false for plain panelcontainer', () => {
      assert.ok(!isStepLayoutComponent('forms-components-examples/components/form/panelcontainer'));
    });

    it('returns false for undefined', () => {
      assert.ok(!isStepLayoutComponent(undefined));
    });
  });
});
