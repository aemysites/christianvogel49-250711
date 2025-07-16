/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .row.for-column-items (direct child somewhere under .page-item--section)
  const columnRow = element.querySelector('.row.for-column-items');
  if (!columnRow) return;
  const columns = Array.from(columnRow.querySelectorAll(':scope > .page-item--column'));

  // Defensive: If not 2 columns, attempt fallback.
  if (columns.length < 2) return;

  // LEFT COLUMN: grab everything inside the .flex-text section (including heading, button, text)
  let leftColContent = [];
  const leftCol = columns[0];
  const flexText = leftCol.querySelector('.flex-text');
  if (flexText) {
    // We want to preserve the structure and semantic meaning
    // Reference the .flex-text element itself (not clone), as a cell can contain a block
    leftColContent = [flexText];
  } else {
    // fallback: all content in leftCol
    leftColContent = Array.from(leftCol.childNodes).filter(n => n.nodeType === 1);
  }

  // RIGHT COLUMN: grab the main image (reference the <img> element)
  let rightColContent = [];
  const rightCol = columns[1];
  // In this HTML, the image is inside a .cropped-image img (deeply nested)
  const img = rightCol.querySelector('img');
  if (img) {
    rightColContent = [img];
  } else {
    // fallback: all content in rightCol
    rightColContent = Array.from(rightCol.childNodes).filter(n => n.nodeType === 1);
  }

  // Build the table
  const headerRow = ['Columns (columns42)'];
  const row = [leftColContent, rightColContent];
  const cells = [headerRow, row];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
