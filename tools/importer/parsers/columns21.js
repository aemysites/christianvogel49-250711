/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns row
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  const columnEls = columnsRow.querySelectorAll(':scope > .page-item--column');
  if (columnEls.length < 2) return;

  // LEFT COLUMN
  const leftCol = columnEls[0];
  const leftColContent = [];
  // Find image (figure)
  const leftImgBlock = leftCol.querySelector('.page-item--image figure');
  if (leftImgBlock) leftColContent.push(leftImgBlock);
  // Find flex-text section (title + button)
  const leftFlexBlock = leftCol.querySelector('.page-item--flex .flex-text');
  if (leftFlexBlock) leftColContent.push(leftFlexBlock);

  // RIGHT COLUMN
  const rightCol = columnEls[1];
  const rightColContent = [];
  // Find shares box
  const sharesBox = rightCol.querySelector('.shares-box');
  if (sharesBox) rightColContent.push(sharesBox);

  // Create block table
  // The header row should be a single cell (array with one element)
  const cells = [
    ['Columns (columns21)'], // single cell for header row
    [leftColContent, rightColContent] // one cell per column for content row
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
