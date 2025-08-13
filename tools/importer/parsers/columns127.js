/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell as required
  const headerRow = ['Columns (columns127)'];

  // Find the columns: two direct children under .row.for-column-items
  const forColumnItems = element.querySelector('.row.for-column-items');
  if (!forColumnItems) return;
  const columnItems = Array.from(forColumnItems.children).filter(child => child.classList.contains('page-item--column'));

  // Each column: find its main content
  const contentRow = columnItems.map(col => {
    // Remove spacers for cleaner content
    Array.from(col.querySelectorAll('.page-row-spacer')).forEach(e => e.remove());
    // Look for image block
    const image = col.querySelector('.page-item--image figure');
    if (image) return image;
    // Look for appointments block
    const appointments = col.querySelector('.appointments-list');
    if (appointments) return appointments;
    // Otherwise: all content inside .page-row (excluding spacers)
    const mainRows = Array.from(col.querySelectorAll('.page-row'));
    let cellNodes = [];
    mainRows.forEach(row => {
      Array.from(row.childNodes).forEach(node => {
        if (node.nodeType === 1 && node.classList && node.classList.contains('page-row-spacer')) return;
        cellNodes.push(node);
      });
    });
    if (cellNodes.length > 0) return cellNodes;
    return col;
  });

  // Compose table: header row first (single cell), then content row (one cell per column)
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
