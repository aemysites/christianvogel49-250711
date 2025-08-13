/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: single cell, exactly as shown in the example
  const headerRow = ['Columns (columns122)'];

  // Find the immediate column elements
  // Each .page-item--column is a visual column, order matters
  const columns = Array.from(element.querySelectorAll(':scope .page-item--column'));

  // Defensive: If there are no columns, do not continue
  if (columns.length === 0) return;

  // Prepare the row for the columns
  // Each cell contains the full content for that column (headline and list)
  const columnsRow = columns.map(col => {
    const colContent = [];
    // Get and include headline if present
    const headline = col.querySelector('.page-item--headline h3');
    if (headline) colContent.push(headline);
    // Get and include the text block (contains the <ul>)
    const textBlock = col.querySelector('.text-block');
    if (textBlock) colContent.push(textBlock);
    // If no content, add an empty string to keep the cell
    return colContent.length ? colContent : [''];
  });

  // Compose the table: first row is header, second row has a cell for each column
  const tableData = [headerRow, columnsRow];

  // Create table using helper function
  const blockTable = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the generated block table
  element.replaceWith(blockTable);
}
