/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the section containing the columns
  const section = element.querySelector('.tile-section');
  if (!section) return;

  // 2. Find the columns row and column elements
  const columnsRow = section.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  const columnElements = Array.from(columnsRow.querySelectorAll(':scope > .page-item--column'));
  if (columnElements.length < 2) return;

  // 3. LEFT COLUMN: Content (heading, text, button)
  // Get the section.flex-text which contains everything needed for the left cell
  const leftCol = columnElements[0];
  const flexSection = leftCol.querySelector('section.flex-text');
  // Defensive: use the .page-item--flex if section.flex-text missing
  const leftCellContent = flexSection || leftCol;

  // 4. RIGHT COLUMN: Image
  const rightCol = columnElements[1];
  // The figure.image contains the image (and potentially link)
  // We want to reference the entire figure so that alt text and structure is preserved
  let rightCellContent = rightCol.querySelector('figure.image');
  if (!rightCellContent) {
    // fallback: look for an <img> directly (should not happen in provided HTML)
    rightCellContent = rightCol.querySelector('img');
  }
  // If not found, fallback to the column itself
  if (!rightCellContent) {
    rightCellContent = rightCol;
  }

  // 5. Table: header and content rows
  const cells = [
    ['Columns (columns139)'],
    [leftCellContent, rightCellContent]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
