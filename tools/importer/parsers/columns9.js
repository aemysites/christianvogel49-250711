/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns row
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;

  // Find all direct children that are columns
  const columnDivs = Array.from(columnsRow.children).filter(div => div.classList.contains('page-item--column'));
  if (columnDivs.length === 0) return;

  // For each column, get the article.flex-float (content block)
  const contentCells = columnDivs.map(col => {
    const article = col.querySelector('article.flex-float');
    return article || '';
  });

  // Create header row: single cell, matching exactly the example
  const headerRow = ['Columns (columns9)'];

  // The table is header (1 cell), then content row (N cells)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentCells
  ], document);

  element.replaceWith(table);
}
