/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get all direct child column blocks in a row
  function getColumns(rowEl) {
    // Each .row.for-column-items > .page-item--column is a column
    return Array.from(rowEl.querySelectorAll(':scope > .page-item--column'));
  }

  // Helper to extract the main "article.flex-float" block from a column
  function getColumnContent(colEl) {
    // Find the first article.flex-float or its container
    const flex = colEl.querySelector('article.flex-float');
    if (flex) return flex;
    // fallback: just return the column itself
    return colEl;
  }

  // Find the .container-fluid > .page-item--section > .tile-section
  const tileSection = element.querySelector('.container-fluid .page-item--section .tile-section');
  if (!tileSection) return;

  // Find all .page-row that have .row.for-column-items inside
  const mainRows = Array.from(tileSection.querySelectorAll(':scope > .page-row'));
  // Only rows with columns
  const realRows = mainRows.filter(row => row.querySelector('.row.for-column-items'));
  const cells = [];
  // Header row exactly as required
  cells.push(['Columns (columns75)']);

  // For each real row, build columns array
  realRows.forEach(row => {
    const columns = getColumns(row.querySelector('.row.for-column-items'));
    // Always push a row with N columns, referencing the highest-level available element for each column
    const rowCells = columns.map(col => {
      // If column contains article.flex-float, use it; else, use column
      const flex = col.querySelector('article.flex-float');
      if (flex) return flex;
      // If column contains .page-item--text, use that
      const text = col.querySelector('.page-item--text');
      if (text) return text;
      return col;
    });
    cells.push(rowCells);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
