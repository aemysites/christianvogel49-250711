/* global WebImporter */
export default function parse(element, { document }) {
  // Block Header
  const headerRow = ['Columns (columns101)'];

  // Find the columns: container-fluid > row.for-column-items > page-item--column
  let columnContainers = [];
  const containerFluid = element.querySelector('.container-fluid');
  if (containerFluid) {
    const row = containerFluid.querySelector('.row.for-column-items');
    if (row) {
      columnContainers = Array.from(row.children).filter(child => child.classList.contains('page-item--column'));
    }
  }

  // If no columns found, fallback to direct children with column class
  if (!columnContainers.length) {
    columnContainers = Array.from(element.querySelectorAll(':scope > .page-item--column'));
  }

  // For each column, collect content
  const cellContents = columnContainers.map(col => {
    // Find all child .page-row (these hold the blocks)
    const rows = Array.from(col.querySelectorAll(':scope > .page-row'));
    let contentEls = [];
    rows.forEach(row => {
      // Find image blocks
      const img = row.querySelector('.image');
      if (img) contentEls.push(img);
      // Find text blocks
      const txt = row.querySelector('.text-block');
      if (txt) contentEls.push(txt);
    });
    // If nothing found, try direct children except spacers
    if (contentEls.length === 0) {
      contentEls = Array.from(col.children).filter(child =>
        child.nodeType === 1 && !child.classList.contains('page-row-spacer')
      );
    }
    // Only one element found
    if (contentEls.length === 1) return contentEls[0];
    // Multiple found
    return contentEls;
  });

  // Build the table data
  const tableData = [headerRow, cellContents];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element
  element.replaceWith(block);
}
