/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find all direct column items (there should be four for this layout)
  const columnsWrapper = element.querySelector('.for-column-items');
  if (!columnsWrapper) return; // Defensive, nothing to process

  const columnNodes = Array.from(
    columnsWrapper.querySelectorAll(':scope > .page-item--column')
  );

  // Step 2: For each column, extract its main text block (the text content)
  // If not present, fallback to the full column
  const columns = columnNodes.map((col) => {
    // Find the deepest .text-block in this column
    const textBlock = col.querySelector('.text-block');
    return textBlock || col;
  });

  // Ensure that the number of columns in the row matches the number found
  // Header row is always a single cell with block name
  const headerRow = ['Columns (columns102)'];
  const cells = [
    headerRow,
    columns
  ];

  // Step 3: Create and replace with the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
