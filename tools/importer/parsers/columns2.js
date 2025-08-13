/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container
  const forColumnItems = element.querySelector('.for-column-items');
  if (!forColumnItems) return;
  // Get all direct column items
  const colDivs = Array.from(forColumnItems.querySelectorAll(':scope > .page-item--column'));
  if (!colDivs.length) return;
  // For each column, extract best content
  const columns = colDivs.map(col => {
    // Try image
    const imgBlock = col.querySelector('.page-item--image figure');
    if (imgBlock) return imgBlock;
    // Try text
    const textBlock = col.querySelector('.page-item--text .text-block');
    if (textBlock) return textBlock;
    // Fallback to column itself
    return col;
  });
  // Build table cells
  // Header is a single cell array
  const cells = [['Columns (columns2)']];
  // Body row is an array of all columns, matching the count
  cells.push(columns);
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
