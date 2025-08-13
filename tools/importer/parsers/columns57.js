/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as a single cell (single column)
  const headerRow = ['Columns (columns57)'];

  // Find the .row.for-column-items container
  const columnsRow = element.querySelector(':scope > .row.for-column-items');
  let contentRow = [];
  if (columnsRow) {
    // Get all direct children that are columns
    const columnItems = Array.from(columnsRow.querySelectorAll(':scope > .page-item--column'));
    // For each column, grab the icon-box if possible, else the column content
    contentRow = columnItems.map((col) => {
      const iconBox = col.querySelector('.icon-box');
      return iconBox || col;
    });
  }

  // Compose table rows: headerRow is single cell, contentRow is as many columns as found
  const tableRows = [headerRow, contentRow];

  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
