/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main content row containing the two columns
  const container = element.querySelector('.container-fluid');
  if (!container) return;
  const pageItem = container.querySelector('.page-item--flex');
  if (!pageItem) return;
  const flexRow = pageItem.querySelector('.flex-tai--row');
  if (!flexRow) return;
  // There should be two immediate children for the columns
  const columns = Array.from(flexRow.children);
  if (columns.length < 2) return;

  // Always put text on the left and image on the right, regardless of DOM order
  let textCol = null, imageCol = null;
  columns.forEach((col) => {
    if (
      col.classList.contains('flex-tai--text') ||
      col.querySelector('.flex-tai--text') ||
      col.querySelector('ul') ||
      col.querySelector('ol')
    ) {
      textCol = col;
    }
    if (
      col.classList.contains('flex-tai--image-container') ||
      col.querySelector('img') ||
      col.querySelector('figure')
    ) {
      imageCol = col;
    }
  });
  // Fallback: if cannot detect by class, use type detection
  if (!textCol && !imageCol) {
    textCol = columns[0];
    imageCol = columns[1];
  } else if (!textCol) {
    textCol = columns.find(col => col !== imageCol);
  } else if (!imageCol) {
    imageCol = columns.find(col => col !== textCol);
  }

  // For the image column, use the <figure> if present, otherwise the whole imageCol
  let imageContent = imageCol.querySelector('figure') || imageCol;

  // For the text column, use as-is
  const cells = [
    ['Columns (columns2)'],
    [textCol, imageContent],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
