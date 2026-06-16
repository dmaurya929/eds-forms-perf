export function handleAccordionNavigation(panel, tab, forceOpen = false) {
  const accordionTabs = panel?.querySelectorAll(':scope > fieldset');
  accordionTabs.forEach((otherTab) => {
    if (otherTab !== tab) {
      otherTab.classList.add('accordion-collapse');
    }
  });
  if (forceOpen) {
    tab.classList.remove('accordion-collapse');
  } else {
    tab.classList.toggle('accordion-collapse');
  }
}

export default function decorate(panel) {
  panel.classList.add('accordion');
  const accordionTabs = panel?.querySelectorAll(':scope > fieldset');
  accordionTabs?.forEach((tab, index) => {
    tab.dataset.index = index;
    const legend = tab.querySelector(':scope > legend');
    legend?.classList.add('accordion-legend');
    if (index !== 0) tab.classList.toggle('accordion-collapse'); // collapse all but the first tab on load
    legend?.addEventListener('click', () => {
      handleAccordionNavigation(panel, tab);
      // Render lazy panel content when the user expands it.
      /* eslint-disable no-underscore-dangle */
      const form = panel.closest('form');
      if (form?._renderLazyPanel) {
        form._renderLazyPanel(tab.id);
      } else if (form?._lazyPanels?.has(tab.id)) {
        // Rule engine not ready yet — queue for loadRuleEngine.
        form._pendingLazyRenders = form._pendingLazyRenders || new Set();
        form._pendingLazyRenders.add(tab.id);
      }
      /* eslint-enable no-underscore-dangle */
    });
  });
  return panel;
}
