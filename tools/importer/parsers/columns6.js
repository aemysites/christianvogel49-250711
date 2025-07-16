/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main section block with the columns
  const section = element.querySelector('.page-item--section');
  if (!section) return;
  const fullWidthSection = section.querySelector('.full-width-section');
  if (!fullWidthSection) return;

  // Find the row with the columns
  const containers = fullWidthSection.querySelectorAll('.container-fluid');
  let columnsRow = null;
  for (const container of containers) {
    const row = container.querySelector('.row.for-column-items');
    if (row) {
      columnsRow = row;
      break;
    }
  }
  if (!columnsRow) return;

  // Select all top-level column elements
  const columnEls = columnsRow.querySelectorAll(':scope > .page-item--column');

  // For each column, extract the main content. Reference existing elements directly.
  const columns = Array.from(columnEls).map((col) => {
    // Typical structure: .page-row .page-item--flex (for text), or .page-item--image (for image)
    const row = col.querySelector('.page-row.is-nth-1');
    if (row) {
      // If this column is text (flex)
      const flex = row.querySelector('section.flex-text');
      if (flex) return flex;
      // If this column is just an image
      const imgFig = row.querySelector('figure.image');
      if (imgFig) return imgFig;
      // Fallback: all children
      return Array.from(row.children);
    }
    // Fallback: just return all children of the column
    return Array.from(col.children);
  });

  // Prepare the table header
  const headerRow = ['Columns (columns6)'];

  // Compose the content row with as many columns as found
  const contentRow = columns.map((cell) => {
    // If array of 1, flatten
    if (Array.isArray(cell) && cell.length === 1) return cell[0];
    return cell;
  });

  // Build the table
  const tableCells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableCells, document);
  element.replaceWith(block);
}
