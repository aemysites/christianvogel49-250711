/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must be a single cell: ['Columns (columns43)']
  const headerRow = ['Columns (columns43)'];

  // Find the actual columns container (.text-block)
  let columnsContainer = element.querySelector('.text-block');
  if (!columnsContainer) columnsContainer = element;

  // Each direct child is a column
  const colElements = Array.from(columnsContainer.children).filter(el => el.tagName);
  // Edge case: If there are no direct children, fallback to innerHTML as a single column
  let columnsRow;
  if (colElements.length > 0) {
    columnsRow = colElements;
  } else {
    columnsRow = [columnsContainer];
  }

  // Compose cells array: first row is header (single cell), second row is columns
  const cells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
