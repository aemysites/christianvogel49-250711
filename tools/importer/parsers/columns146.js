/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure header row is a single column as required
  const headerRow = ['Columns (columns146)'];

  // Find columns container
  const container = element.querySelector(':scope > .container-fluid');
  if (!container) return;

  // Find columns row (holds columns)
  const columnsRow = container.querySelector(':scope > .row.for-column-items');
  if (!columnsRow) return;

  // Gather column elements in layout order
  const columnItems = Array.from(columnsRow.children).filter(child => child.classList.contains('page-item--column'));

  // For each column, collect its main content
  const columnCells = columnItems.map(colEl => {
    // Ignore all spacers, gather content
    const contentEls = [];
    Array.from(colEl.children).forEach(child => {
      if (child.classList.contains('page-row-spacer')) return;
      if (child.classList.contains('page-row')) {
        Array.from(child.children).forEach(grandchild => {
          if (!grandchild.classList.contains('page-row-spacer')) {
            contentEls.push(grandchild);
          }
        });
      } else {
        contentEls.push(child);
      }
    });
    return contentEls.length > 1 ? contentEls : contentEls[0] || '';
  });

  // Build table: single-cell header row, then content row with one cell per column
  const tableRows = [headerRow, columnCells];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
