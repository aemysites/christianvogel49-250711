/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two main columns
  const columns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row.for-column-items > .page-item--column'));
  if (columns.length !== 2) return;

  // --- COLUMN 1 ---
  // Find image (figure with img)
  let col1ImgFigure = columns[0].querySelector('.page-item--image figure');
  // Find quick links list (should be entire .quicklink-list div)
  let col1Quicklinks = columns[0].querySelector('.page-item--quicklink-list .quicklink-list');
  // Compose column 1 cell (image + quicklinks)
  const col1Cell = [];
  if (col1ImgFigure) col1Cell.push(col1ImgFigure);
  if (col1Quicklinks) col1Cell.push(col1Quicklinks);

  // --- COLUMN 2 ---
  // Text block (.text-block)
  let col2TextBlock = columns[1].querySelector('.page-item--text .text-block');
  const col2Cell = [];
  if (col2TextBlock) col2Cell.push(col2TextBlock);

  // Compose table rows (header + 1 content row with 2 columns)
  const cells = [
    ['Columns (columns98)'],
    [col1Cell, col2Cell],
  ];
  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
