/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name, single column
  const headerRow = ['Tabs (tabs47)'];
  const cells = [headerRow];

  // Find the main tile-section containing the tabs
  const tileSection = element.querySelector('.tile-section.-blue-tile');
  if (!tileSection) return;

  // Find all tab headlines (h2) and build array of [label, content]
  const headlines = tileSection.querySelectorAll('.page-item--headline h2');
  headlines.forEach((h2) => {
    // Find the tab's main content: starts at the next row after the headline's parent row
    let nextRow = h2.parentElement.parentElement.nextElementSibling;
    while (nextRow && nextRow.classList.contains('page-row-spacer')) {
      nextRow = nextRow.nextElementSibling;
    }
    // Collect all relevant content rows until the next headline (or end of tileSection)
    let contentElements = [];
    let currentRow = nextRow;
    // Find index of the current headline
    const headlineRows = Array.from(tileSection.querySelectorAll('.page-row'));
    const thisHeadlineIndex = headlineRows.findIndex(row => row.contains(h2.parentElement));
    // Find next headline to limit extraction
    let nextHeadlineRow = null;
    for (let i = thisHeadlineIndex + 1; i < headlineRows.length; i++) {
      if (headlineRows[i].querySelector('.page-item--headline h2')) {
        nextHeadlineRow = headlineRows[i];
        break;
      }
    }
    // Iterate through rows between current headline and next headline
    let row = nextRow;
    while (row && row !== nextHeadlineRow) {
      // Only add content rows (not spacers)
      if (!row.classList.contains('page-row-spacer')) {
        // For column layout, collect the whole .row.for-column-items
        if (row.querySelector('.row.for-column-items')) {
          const colItems = row.querySelector('.row.for-column-items');
          contentElements.push(colItems);
        }
        // For text-only content (if no columns)
        else if (row.querySelector('.page-item--text .text-block')) {
          const textBlock = row.querySelector('.page-item--text .text-block');
          contentElements.push(textBlock);
        }
      }
      row = row.nextElementSibling;
    }
    // Defensive: if nothing found, use an empty div
    if (contentElements.length === 0) {
      let emptyDiv = document.createElement('div');
      contentElements.push(emptyDiv);
    }
    cells.push([h2.textContent.trim(), contentElements.length === 1 ? contentElements[0] : contentElements]);
  });

  // Create the block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
