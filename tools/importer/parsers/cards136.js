/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const headerRow = ['Cards (cards136)'];

  // Helper to extract card data from a row
  function extractCardsFromRow(row) {
    const cards = [];
    // Find columns (cards) in this row
    const columns = Array.from(row.querySelectorAll(':scope > .row.for-column-items > .page-item--column'));
    columns.forEach(col => {
      const flex = col.querySelector('article.flex-float');
      if (!flex) return;
      // Image is required, find the first img inside .flex-float--image
      const image = flex.querySelector('.flex-float--image img');
      // Text cell content
      const textParts = [];
      // Title (h3)
      const title = flex.querySelector('.flex-float--title');
      if (title) textParts.push(title);
      // Description (p inside .flex-float--text)
      const descBlock = flex.querySelector('.flex-float--text');
      if (descBlock) {
        // Only add <p> children (not buttons)
        Array.from(descBlock.childNodes).forEach(node => {
          if (node.nodeType === 1 && node.tagName.toLowerCase() === 'p') {
            textParts.push(node);
          }
        });
      }
      // CTA button (a)
      const cta = flex.querySelector('.flex-float--button a');
      if (cta) textParts.push(cta);
      cards.push([image, textParts]);
    });
    return cards;
  }

  // Find each card row (with .row.for-column-items)
  const cardRows = Array.from(element.querySelectorAll('.page-row .row.for-column-items'));
  const cards = [];
  cardRows.forEach(row => {
    extractCardsFromRow(row.parentElement).forEach(cardArr => cards.push(cardArr));
  });

  // If no cards found, do nothing
  if (cards.length === 0) return;

  // Build block table data
  const tableData = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(table);
}
