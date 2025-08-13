/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main container for columns
  const container = element.querySelector('.container-fluid > .row.for-column-items');
  if (!container) return;

  // Find all top-level column elements
  const columns = Array.from(container.children).filter(col => col.classList.contains('page-item--column'));
  // Build each column's cell content
  const columnCells = columns.map(col => {
    // Find .page-row children inside the column
    const rows = Array.from(col.querySelectorAll(':scope > .page-row'));
    const cellElements = [];
    rows.forEach(row => {
      // Try image first
      const imgFigure = row.querySelector('figure.image');
      if (imgFigure) {
        // Find the existing img
        const img = imgFigure.querySelector('img');
        if (img) cellElements.push(img);
      }
      // Then text block
      const textBlock = row.querySelector('.text-block');
      if (textBlock) cellElements.push(textBlock);
    });
    // If only one element, return it directly
    if (cellElements.length === 1) return cellElements[0];
    // If more than one, combine into a div to preserve all content
    if (cellElements.length > 1) {
      const wrapper = document.createElement('div');
      cellElements.forEach(el => wrapper.append(el));
      return wrapper;
    }
    // If empty, return empty string
    return '';
  });

  // Define header row exactly
  const cells = [
    ['Columns (columns5)'],
    columnCells
  ];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
