/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns from the source html
  const columnContainers = element.querySelectorAll('.for-column-items > .page-item--column');
  const columns = [];
  columnContainers.forEach((col) => {
    // Try to find the main content for the column
    let mainContent = col.querySelector('.page-row > .page-item--flex section, .page-row > .page-item--flex article');
    if (!mainContent) {
      // fallback: use the direct .page-row > .page-item--flex
      mainContent = col.querySelector('.page-row > .page-item--flex');
    }
    // fallback: empty div if nothing
    if (!mainContent) {
      mainContent = document.createElement('div');
    }
    columns.push(mainContent);
  });

  // The header row must contain a single cell spanning all columns (ONE cell)
  // The block content row should have one cell per column
  const headerRow = ['Columns (columns117)'];
  const tableRows = [headerRow, columns];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);

  element.replaceWith(table);
}
