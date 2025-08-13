/* global WebImporter */
export default function parse(element, { document }) {
  // Find the column container
  const container = element.querySelector('.row.for-column-items, .row.-four-columns');
  const columns = container ? Array.from(container.children).filter(c => c.classList.contains('page-item--column')) : [];
  if (!columns.length) return;

  // Helper function to extract all semantic content from a column
  function getColumnContent(col) {
    const rows = Array.from(col.children).filter(child => !child.classList.contains('page-row-spacer'));
    const blocks = [];
    rows.forEach(row => {
      Array.from(row.children).forEach(block => {
        if (block.classList.contains('page-item--image')) {
          const fig = block.querySelector('figure') || block.querySelector('img');
          if (fig) blocks.push(fig);
        } else if (block.classList.contains('page-item--text')) {
          Array.from(block.childNodes).forEach(node => {
            if (node.nodeType === 1) {
              blocks.push(node);
            } else if (node.nodeType === 3 && node.textContent.trim()) {
              const span = document.createElement('span');
              span.textContent = node.textContent.trim();
              blocks.push(span);
            }
          });
        } else if (block.classList.contains('page-item--headline')) {
          Array.from(block.childNodes).forEach(node => {
            if (node.nodeType === 1) {
              blocks.push(node);
            } else if (node.nodeType === 3 && node.textContent.trim()) {
              const span = document.createElement('span');
              span.textContent = node.textContent.trim();
              blocks.push(span);
            }
          });
        } else if (!block.classList.contains('page-row-spacer')) {
          blocks.push(block);
        }
      });
    });
    if (!blocks.length) blocks.push(col);
    return blocks.length === 1 ? blocks[0] : blocks;
  }

  // Header row: one cell only, not one per column
  const headerRow = ['Columns (columns24)'];
  // Data row: one cell per column in the second row
  const dataRow = columns.map(getColumnContent);
  const cells = [headerRow, dataRow];
  // The createTable helper uses the length of the second row for number of columns,
  // so the header row must be a single cell, not repeated for each column.

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
