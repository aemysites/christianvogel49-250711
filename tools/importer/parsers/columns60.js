/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const row = element.querySelector('.flex-tai--row');
  if (!row) return;
  // Get all direct children of row (should be two: image and text)
  const columns = Array.from(row.children);
  if (columns.length < 2) return;

  // First column: image/figure
  let col1 = null;
  // Prefer the full figure if present
  const figure = columns[0].querySelector('figure');
  if (figure) {
    col1 = figure;
  } else {
    // fallback to any img
    const img = columns[0].querySelector('img');
    if (img) col1 = img;
  }

  // Second column: text block (include all content in .flex-tai--text)
  let col2 = null;
  const textBlock = columns[1].querySelector('.flex-tai--text');
  if (textBlock) {
    col2 = textBlock;
  } else {
    col2 = columns[1];
  }

  // Build the columns block table
  const table = WebImporter.DOMUtils.createTable([
    ['Columns (columns60)'],
    [col1, col2]
  ], document);
  
  element.replaceWith(table);
}
