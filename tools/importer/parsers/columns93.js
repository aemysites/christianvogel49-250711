/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to extract the actual block columns in order
  function getColumnBlocks() {
    // Find .for-column-items inside (the row)
    const row = element.querySelector('.for-column-items');
    if (!row) return [];
    // Direct child columns (divs with .page-item--column)
    return Array.from(row.children).filter((child) => child.classList.contains('page-item--column'));
  }

  // For each column, extract content in desired order: image then text
  function getColumnCell(columnEl) {
    // For each .page-row in column, look for images and text-blocks
    const rows = Array.from(columnEl.querySelectorAll(':scope > .page-row'));
    // Find first row containing an image
    const imageRow = rows.find(r => r.querySelector('.page-item--image'));
    // Find first row containing text
    const textRow = rows.find(r => r.querySelector('.page-item--text'));
    let contents = [];
    if (imageRow) {
      // Use the figure (includes all image/cropping wrappers)
      const fig = imageRow.querySelector('figure');
      if (fig) contents.push(fig);
    }
    if (textRow) {
      // Use the text-block directly (preserves formatting)
      const textBlock = textRow.querySelector('.text-block');
      if (textBlock) contents.push(textBlock);
    }
    // Only return the array if >1, else element or empty string
    if (contents.length > 1) return contents;
    if (contents.length === 1) return contents[0];
    return '';
  }

  const columns = getColumnBlocks();
  // The table header must be a single cell, as per the example:
  const headerRow = ['Columns (columns93)']; // Only one cell
  // The second row: one cell per column, in correct order
  const contentRow = columns.map(getColumnCell);
  // Build the cells structure so the header row is a single-cell row:
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Ensure the header row spans all columns
  if (table.rows.length > 0 && table.rows[0].cells.length === 1 && columns.length > 1) {
    table.rows[0].cells[0].setAttribute('colspan', columns.length);
  }
  element.replaceWith(table);
}
