/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row: a single cell with the correct block name
  const headerRow = ['Columns (columns41)'];

  // Find the two columns
  // .for-column-items > .page-item--column are the column roots
  let columns = element.querySelectorAll('.for-column-items > .page-item--column');
  if (columns.length < 2) {
    // fallback: any .page-item--column directly under 'element'
    columns = element.querySelectorAll('.page-item--column');
  }
  if (columns.length < 2) return;

  // First column: look for text block
  let col1Content = '';
  const col1Text = columns[0].querySelector('.text-block, .page-item--text');
  if (col1Text) {
    col1Content = col1Text;
  } else {
    // fallback: all visible content in the column
    col1Content = document.createElement('div');
    Array.from(columns[0].children).forEach(child => col1Content.appendChild(child));
  }

  // Second column: look for image or figure
  let col2Content = '';
  const col2Figure = columns[1].querySelector('figure, img');
  if (col2Figure) {
    col2Content = col2Figure;
  } else {
    col2Content = document.createElement('div');
    Array.from(columns[1].children).forEach(child => col2Content.appendChild(child));
  }

  // Construct the table rows (header, then content row with both columns)
  const rows = [headerRow, [col1Content, col2Content]];

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
