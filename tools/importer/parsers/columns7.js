/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .row.for-column-items containing the columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;

  // Get the immediate column items
  const columns = Array.from(row.children).filter(child => child.classList.contains('page-item--column'));

  // Prepare the content for each column
  const colCells = [];
  columns.forEach(col => {
    // For each column, find the primary content (the first child .page-row)
    const innerRow = col.querySelector('.page-row.is-nth-1');
    if (innerRow) {
      // We want to capture all direct children of this row (usually one page-item)
      // But sometimes there are spacers, so filter for contentful elements
      const candidates = Array.from(innerRow.children).filter(child => child.classList.contains('page-item'));
      if (candidates.length > 0) {
        colCells.push(candidates[0]);
      } else {
        // Otherwise, fallback to the full innerRow
        colCells.push(innerRow);
      }
    } else {
      // If no innerRow, fallback to column itself
      colCells.push(col);
    }
  });

  // Ensure at least two columns for this block in the table
  // If a column is missing, fill with an empty string
  while (colCells.length < 2) {
    colCells.push('');
  }

  // Header row should have as many columns as data row
  const headerRow = Array(colCells.length).fill('');
  headerRow[0] = 'Columns (columns7)';

  const cells = [headerRow, colCells];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
