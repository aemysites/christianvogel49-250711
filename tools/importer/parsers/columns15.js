/* global WebImporter */
export default function parse(element, { document }) {
  // Get the column container row
  const columnRow = element.querySelector('.row.for-column-items');
  if (!columnRow) return;

  // Get all immediate column items
  const columns = Array.from(columnRow.querySelectorAll(':scope > .page-item--column'));
  // For each column, get its main content (the first .page-row inside or all non-spacer children)
  const columnCells = columns.map((col) => {
    // Find the first .page-row inside (should contain the content)
    const mainRow = col.querySelector(':scope > .page-row:not(.page-row-spacer)');
    if (mainRow) {
      // If there is a .page-item inside (eg. image or text), reference it
      const mainBlock = mainRow.querySelector(':scope > .page-item, :scope > section, :scope > figure');
      if (mainBlock) {
        return mainBlock;
      }
      return mainRow;
    }
    // As fallback, return the column itself (should include content)
    return col;
  });

  // Our table header, matching the block name
  const headerRow = ['Columns (columns15)'];
  // Our content row: one cell per column
  const rows = [headerRow, columnCells];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
