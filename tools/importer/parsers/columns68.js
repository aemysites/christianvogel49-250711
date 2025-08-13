/* global WebImporter */
export default function parse(element, { document }) {
  // --- Helper Functions ---
  const headerRow = ['Columns (columns68)'];

  // Find .full-width-section, which contains the real block
  let fullWidthSection = element.querySelector('.full-width-section');
  if (!fullWidthSection) fullWidthSection = element;

  // Find the .row.for-column-items for columns
  const columnRow = fullWidthSection.querySelector('.row.for-column-items');
  if (!columnRow) return;

  // Get column divs (expect 2: left=image, right=content)
  const columns = Array.from(columnRow.querySelectorAll(':scope > .page-item--column'));
  // Defensive fallback if columns not found
  if (columns.length < 2) return;

  // --- Column 1: Image ---
  let imageCell = '';
  const col1 = columns[0];
  // Find image figure
  const imageFigure = col1.querySelector('figure');
  if (imageFigure) {
    imageCell = imageFigure;
  } else {
    const img = col1.querySelector('img');
    if (img) imageCell = img;
  }

  // --- Column 2: Appointments/Content ---
  let contentCell = '';
  const col2 = columns[1];
  // Find appointments block
  const appointmentsBlock = col2.querySelector('.page-item--appointments');
  if (appointmentsBlock) {
    contentCell = appointmentsBlock;
  } else {
    // Fallback: use entire col2
    contentCell = col2;
  }

  // --- Table Construction ---
  const cells = [
    headerRow,
    [imageCell, contentCell]
  ];

  // --- Replace Original ---
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
