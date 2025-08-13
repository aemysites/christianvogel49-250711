/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row that contains the columns
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  // Get all column items (these are the actual columns)
  const columnEls = Array.from(columnsRow.querySelectorAll(':scope > .page-item--column'));
  if (columnEls.length === 0) return;

  // For each column, extract the relevant top-level content block to preserve semantic structure.
  function extractColumnContent(col) {
    // Find the main content area for this column, usually inside the first .page-row
    const contentRow = col.querySelector(':scope > .page-row');
    if (contentRow) {
      // The actual block (teaser/article) is typically the first child of page-row
      const block = contentRow.querySelector(':scope > *');
      if (block) return block;
      return contentRow;
    }
    // Fallback: reference the column itself
    return col;
  }

  // Build header row. Must match example: 'Columns (columns81)'
  const cells = [['Columns (columns81)']];
  // Build the first content row with each column's main content, preserving structure
  cells.push(columnEls.map(extractColumnContent));

  // Create the table and replace the original element
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
