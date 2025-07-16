/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;

  // Find all column containers (immediate children only)
  const columns = Array.from(row.querySelectorAll(':scope > .page-item--column'));

  // For each column, find its main content block
  const columnContents = columns.map((col) => {
    const textBlock = col.querySelector('.text-block');
    if (textBlock) {
      return textBlock;
    }
    // fallback: entire column
    return col;
  });

  // Compose table: header row with ONE cell, then the columns row
  const cells = [
    ['Columns (columns1)'], // header row, single cell
    columnContents          // columns row, one cell per column
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
