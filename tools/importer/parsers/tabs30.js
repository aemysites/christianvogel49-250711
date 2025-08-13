/* global WebImporter */
export default function parse(element, { document }) {
  // Set up the table header row as required
  const headerRow = ['Tabs (tabs30)'];

  // Find all tab buttons
  const tabsContainer = element.querySelector('.tabs');
  const tabButtons = tabsContainer ? tabsContainer.querySelectorAll(':scope > .tabs--button') : [];

  // Find the tab content containers, if present (not in provided HTML, but code is resilient)
  // In this HTML, there is only a title. We'll extract all unique content blocks not part of the tabs.
  const titleElem = element.querySelector('.title-with-tabs--title');

  // Check if there is any likely tab content area
  // (In this source HTML, there is no per-tab content. If there were, modify this part to extract those blocks.)
  // For now, per provided HTML, only the title is provided, and it's general for the tabs.

  // Build rows: [tab label, tab content]
  // According to the example, we must have a 2-column table for the block rows.
  const rows = [];
  tabButtons.forEach((tabBtn, idx) => {
    let tabLabel = tabBtn.querySelector('a') || tabBtn.textContent.trim();
    let tabContent = '';
    // Only for the first tab, put the title text to preserve all text content from the HTML
    if (titleElem && idx === 0) {
      tabContent = titleElem;
    }
    rows.push([tabLabel, tabContent]);
  });

  // Compose table
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
