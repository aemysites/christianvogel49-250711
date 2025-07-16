/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: one cell only, per spec.
  const headerRow = ['Columns (columns10)'];

  // Gather all .page-item--column children from the block
  const columns = Array.from(
    element.querySelectorAll(':scope > .row.for-column-items > .page-item--column')
  );

  // For each column, include the main .icon-box element, or the column itself if not found
  const dataRow = [
    columns.map(col => {
      const iconBox = col.querySelector('.icon-box');
      return iconBox || col;
    })
  ]; // The second row is a single array with an array of elements for each cell

  // Build table with one header cell, then one row with n columns
  // createTable expects cells = [[header], [col1, col2, col3, ...]]
  const tableCells = [headerRow, ...dataRow];
  const table = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(table);
}
