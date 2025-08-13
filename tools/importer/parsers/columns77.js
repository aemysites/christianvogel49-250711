/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main column items
  const columns = [];
  const row = element.querySelector(':scope > .row.for-column-items');
  if (row) {
    row.querySelectorAll(':scope > .page-item--column').forEach((col) => columns.push(col));
  }
  if (columns.length !== 2) {
    element.querySelectorAll(':scope > .page-item--column').forEach((col) => columns.push(col));
  }
  // Prepare content for each column
  const cellContents = [];
  if (columns[0]) {
    const flexSection = columns[0].querySelector('section.flex-text');
    cellContents.push(flexSection ? flexSection : columns[0]);
  } else {
    cellContents.push('');
  }
  if (columns[1]) {
    const gallerySection = columns[1].querySelector('section.gallery');
    cellContents.push(gallerySection ? gallerySection : columns[1]);
  } else {
    cellContents.push('');
  }
  // Header row: one cell, but must span two columns. Achieve this by using one cell in header row, then two in content row.
  // WebImporter.DOMUtils.createTable will automatically set colspan if header row array has 1 cell but second row has 2 cells.
  const headerRow = ['Columns (columns77)'];
  const cells = [headerRow, cellContents];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
