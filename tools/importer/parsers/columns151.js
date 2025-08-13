/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns
  const colParent = element.querySelector('.for-column-items');
  if (!colParent) return;
  const columns = Array.from(colParent.children).filter(child => child.classList.contains('page-item--column'));

  // Each column's content is the .page-item--icon-box within
  const columnCells = columns.map(col => {
    const iconBox = col.querySelector('.page-item--icon-box');
    return iconBox || document.createElement('div');
  });

  // The table data: first row - single header cell, second row - one cell per column
  const cells = [
    ['Columns (columns151)'],
    columnCells
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
