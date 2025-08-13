/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column, text must match example
  const headerRow = ['Cards (cards69)'];

  // Each column is a card (first 3, possibly 4)
  const columns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row > .page-item--column'));
  const cardRows = [];

  columns.forEach(col => {
    // FIRST: main card (with image and text)
    const flexFloat = col.querySelector('.flex-float');
    if (flexFloat) {
      // Get image (the <img> inside the figure)
      const img = flexFloat.querySelector('img');
      // Get all text and button content in .flex-float--text.text-block
      const textBlock = flexFloat.querySelector('.flex-float--text.text-block');
      const cellContent = [];
      if (textBlock) {
        // Title (first <p> with content)
        const p = Array.from(textBlock.querySelectorAll('p')).find(p => p.textContent.trim());
        if (p) {
          // Use <strong> to preserve heading-style as in the example
          const strong = document.createElement('strong');
          strong.textContent = p.textContent.trim();
          cellContent.push(strong);
        }
        // CTA (link inside .flex-float--button)
        const btnDiv = textBlock.querySelector('.flex-float--button');
        if (btnDiv) {
          const a = btnDiv.querySelector('a');
          if (a) {
            cellContent.push(document.createElement('br'));
            cellContent.push(a);
          }
        }
      }
      // Only add card if there is image and any text/CTA
      if (img && cellContent.length > 0) {
        cardRows.push([img, cellContent]);
      }
    }
    // SECOND: flex-text (standalone button, no image)
    const flexText = col.querySelector('.flex-text');
    if (flexText) {
      const btn = flexText.querySelector('.flex-text--button a');
      if (btn) {
        // Card with only CTA in second cell (first cell empty string)
        cardRows.push(['', [btn]]);
      }
    }
  });

  // Build the table: first row is header, next rows are cards
  const tableData = [headerRow, ...cardRows];
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
