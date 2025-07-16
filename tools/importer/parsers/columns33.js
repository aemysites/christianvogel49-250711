/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main column elements
  const columns = [];
  // Find all columns in correct order (should be two: left and right)
  const columnEls = element.querySelectorAll('.page-item--column');
  columnEls.forEach(col => {
    // Get the main content wrapper in this column
    // Usually one .page-row inside, with a child with content
    let content = null;
    const innerRow = col.querySelector('.page-row');
    if (innerRow) {
      // See if there's a strong block inside (quicklink-list, appointments-list)
      const block = innerRow.querySelector('.quicklink-list, .appointments-list');
      if (block) {
        content = block;
      } else {
        content = innerRow;
      }
    } else {
      content = col;
    }
    columns.push(content);
  });

  // If columns are missing, fill with empty
  while (columns.length < 2) {
    columns.push(document.createElement('div'));
  }

  // The header row must be a single cell, not two!
  const headerRow = ['Columns (columns33)'];
  const row = columns;
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row,
  ], document);
  // The createTable helper will make the header row as a single th spanning both columns

  element.replaceWith(table);
}
