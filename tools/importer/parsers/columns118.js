/* global WebImporter */
export default function parse(element, { document }) {
  // Block header - per specs
  const headerRow = ['Columns (columns118)'];

  // Find the columns container (row with all columns)
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) {
    // If structure is missing, fallback to block header only
    const block = WebImporter.DOMUtils.createTable([headerRow], document);
    element.replaceWith(block);
    return;
  }

  // Get all direct column elements in order
  const columns = Array.from(columnsRow.querySelectorAll(':scope > .page-item--column'));

  // For each column, extract the main content
  const cellContents = columns.map((col) => {
    // Find the first button link (if present)
    const btn = col.querySelector('.flex-text--button a');
    return btn ? btn : '';
  });

  // If all cells are empty, just output header
  const hasContent = cellContents.some(cell => cell);
  const rows = hasContent ? [headerRow, cellContents] : [headerRow];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}