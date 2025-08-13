/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main columns container (row with for-column-items)
  const colRow = element.querySelector('.row.for-column-items');
  let columns = [];
  if (colRow) {
    columns = Array.from(colRow.children).filter(el => el.classList.contains('page-item--column'));
  }

  // Prepare the header row
  const headerRow = ['Columns (columns149)'];
  // Prepare the columns row
  const cellRow = [];

  columns.forEach((col) => {
    // Find the main content for this column
    // Drill to the first .page-row inside, then to .page-item--flex (for text) or .page-item--image (for image)
    let mainContent = null;
    const innerRow = col.querySelector(':scope > .page-row');
    if (innerRow) {
      // If this column contains flex area (text/button)
      const flex = innerRow.querySelector('.page-item--flex section.flex-text');
      if (flex) {
        mainContent = flex;
      } else {
        // If this column contains an image area
        const imgItem = innerRow.querySelector('.page-item--image figure.image');
        if (imgItem) {
          mainContent = imgItem;
        }
      }
    }
    // If still nothing found, fallback to the column
    if (!mainContent) mainContent = col;
    cellRow.push(mainContent);
  });

  // Make sure number of columns matches at least 2
  if (cellRow.length < 2) {
    // Add an empty cell to keep columns structure
    cellRow.push(document.createElement('div'));
  }

  // Create table rows array
  const cells = [headerRow, cellRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(table);
}
