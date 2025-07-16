/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns wrapper
  const columnsRow = element.querySelector('.for-column-items');
  if (!columnsRow) return;

  // Get each direct column
  const columns = Array.from(columnsRow.children).filter(col => col.classList.contains('page-item--column'));

  // Extract content for each column (the article is semantically correct)
  const colCells = columns.map((col) => {
    const innerRow = col.querySelector('.page-row.is-nth-1');
    if (!innerRow) return '';
    const article = innerRow.querySelector('article');
    if (article) return article;
    return innerRow;
  });

  // Compose the cells array: header row as a SINGLE cell, then a row with one cell per column
  const cells = [
    ['Columns (columns39)'], // single header cell as per example
    colCells                 // next row: each column content in its own cell
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
