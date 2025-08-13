/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the container for the columns
  const container = element.querySelector('.container-fluid');
  if (!container) return;

  // Find the two columns (should be 2 for columns112 layout)
  const columns = container.querySelectorAll('.page-item--column');
  if (!columns.length) return;

  // Table Header row as per block guidelines
  const headerRow = ['Columns (columns112)'];

  // For each column, collect all content for that column (as a fragment or array)
  const contentRow = Array.from(columns).map(col => {
    // Within each column, gather all content rows (.page-row) except spacers
    const colContent = [];
    const rows = col.querySelectorAll(':scope > .page-row');
    rows.forEach(row => {
      if (row.classList.contains('page-row-spacer')) return;
      // For each row, find all immediate .page-item children, or fallback to any content
      const items = row.querySelectorAll(':scope > .page-item');
      if (items.length > 0) {
        items.forEach(item => colContent.push(item));
      } else {
        // Sometimes there may be direct content in the row
        Array.from(row.childNodes).forEach(node => {
          if (
            node.nodeType === 1 &&
            !node.classList.contains('page-row-spacer') &&
            !node.classList.contains('page-item')
          ) {
            colContent.push(node);
          }
        });
      }
    });
    // If nothing found, fallback to all childNodes except spacers
    if (!colContent.length) {
      Array.from(col.childNodes).forEach(node => {
        if (
          node.nodeType === 1 &&
          !node.classList.contains('page-row-spacer')
        ) {
          colContent.push(node);
        }
      });
    }
    // If only one content, just return it, else return array
    return colContent.length === 1 ? colContent[0] : colContent;
  });

  // Build the block table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
