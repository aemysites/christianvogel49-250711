/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns row: look inside full-width-section for a row with column items
  const fullWidthSection = element.querySelector('.full-width-section');
  if (!fullWidthSection) return;
  // Try to locate the columns container: .row.for-column-items
  const columnsContainer = fullWidthSection.querySelector('.row.for-column-items');
  if (!columnsContainer) return;
  // Grab all direct column items (should match the example: 2 columns)
  const columnElements = Array.from(columnsContainer.querySelectorAll(':scope > .page-item.page-item--column'));
  if (!columnElements.length) return;
  // Prepare column cells
  const dataRow = columnElements.map((col) => {
    // Each column: look for the first .page-row inside, that's the content holder
    const innerRow = col.querySelector(':scope > .page-row');
    if (innerRow) {
      // If the row contains a flex-text (the text/heading/cta), return that section
      const flexText = innerRow.querySelector('section.flex-text');
      if (flexText) return flexText;
      // If the row contains a figure.image or image, return that
      const imageFig = innerRow.querySelector('figure.image, .image');
      if (imageFig) return imageFig;
      // Fallback: return the whole innerRow
      return innerRow;
    } else {
      // Fallback: return the column itself
      return col;
    }
  });
  // Table header row: block name as in the example
  const headerRow = ['Columns (columns4)'];
  const cells = [headerRow, dataRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
