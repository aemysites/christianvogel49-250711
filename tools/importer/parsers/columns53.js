/* global WebImporter */
export default function parse(element, { document }) {
  // Header row from the block spec
  const headerRow = ['Columns (columns53)'];

  // Find the row containing all columns
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  // Filter only root-level columns
  const columns = Array.from(columnsRow.children).filter(child => child.classList.contains('page-item--column'));

  // For each column, extract its image and text block, if present
  const contentRow = columns.map(col => {
    // Find all direct .page-row children
    const rows = Array.from(col.querySelectorAll(':scope > .page-row'));
    const colContent = [];
    for (const row of rows) {
      // Look for image
      const imgItem = row.querySelector('.page-item--image');
      if (imgItem) {
        const figure = imgItem.querySelector('figure.image');
        if (figure) colContent.push(figure);
      }
      // Look for text
      const textItem = row.querySelector('.page-item--text');
      if (textItem) {
        const textBlock = textItem.querySelector('div.text-block');
        if (textBlock) colContent.push(textBlock);
      }
    }
    // If there are multiple pieces of content, put them in an array, else single item
    return colContent.length > 1 ? colContent : colContent[0];
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
