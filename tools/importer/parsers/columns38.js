/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row with columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;
  const columns = row.querySelectorAll(':scope > .page-item--column');
  if (columns.length < 2) return;

  // First column: image
  let leftCell = '';
  const leftCol = columns[0];
  const fig = leftCol.querySelector('figure');
  if (fig) {
    leftCell = fig;
  } else {
    const img = leftCol.querySelector('img');
    if (img) {
      leftCell = img;
    }
  }

  // Second column: appointments list
  let rightCell = '';
  const rightCol = columns[1];
  const appointmentsBlock = rightCol.querySelector('.appointments-list');
  if (appointmentsBlock) {
    rightCell = appointmentsBlock;
  }

  // Header row must have two columns: header title and empty
  const headerRow = ['Columns (columns38)', ''];
  const contentRow = [leftCell, rightCell];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
