/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main row that contains both columns
  const row = element.querySelector('.flex-tai--row');
  if (!row) return;

  // Find the column containers
  let imageCol = row.querySelector('.flex-tai--image-container');
  let textCol = row.querySelector('.flex-tai--text');

  // Fallback for missing columns
  if (!imageCol && !textCol) {
    const children = Array.from(row.children);
    imageCol = children[0] || null;
    textCol = children[1] || null;
  }
  if (!imageCol || !textCol) return;

  // Use the full image section (prefer figure, fallback to img or block)
  let imageContent = imageCol.querySelector('figure') || imageCol.querySelector('img') || imageCol;
  let textContent = textCol;

  // Content row has two cells, header row must be single cell
  const rows = [
    ['Columns (columns34)'],
    [imageContent, textContent],
  ];

  // Create the table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Fix header row colspan so only one <th> spanning both columns
  const headerTr = table.querySelector('tr');
  if (headerTr && headerTr.children.length === 1) {
    headerTr.firstElementChild.setAttribute('colspan', '2');
  }

  element.replaceWith(table);
}
