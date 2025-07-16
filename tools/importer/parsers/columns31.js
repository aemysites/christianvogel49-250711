/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns row
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;

  // Get direct column children
  const columns = Array.from(columnsRow.children).filter(col => col.classList.contains('page-item--column'));

  // Guard clause for expected 2 columns
  if (columns.length < 2) return;

  // Reference the actual column content containers, not clones
  const firstCol = columns[0];
  const secondCol = columns[1];

  // The example expects a two-column layout in the content row
  // The header is always
  const header = ['Columns (columns31)'];
  const contentRow = [firstCol, secondCol];
  const cells = [header, contentRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
