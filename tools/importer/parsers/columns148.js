/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure we have the main container for columns
  const mainSection = element.querySelector('.container-fluid');
  if (!mainSection) return;

  // Find the columns (direct children with class 'page-item--column')
  const columnRow = mainSection.querySelector('.row.for-column-items');
  if (!columnRow) return;
  const columns = Array.from(columnRow.children).filter(col => col.classList.contains('page-item--column'));

  // Build the header row
  const headerRow = ['Columns (columns148)'];

  // Build the columns content row
  const contentRow = columns.map(col => {
    // For text column (contains section.flex-text)
    const flexText = col.querySelector('section.flex-text');
    if (flexText) {
      return flexText;
    }
    // For image column (contains .page-item--image)
    const imageBlock = col.querySelector('.page-item--image');
    if (imageBlock) {
      return imageBlock;
    }
    // If not found, fallback to entire column
    return col;
  });

  // Compose the table
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
