/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct column elements
  function getColumns(root) {
    const columns = [];
    const row = root.querySelector('.row.for-column-items');
    if (row) {
      row.childNodes.forEach((col) => {
        if (
          col.nodeType === 1 &&
          col.classList.contains('page-item--column')
        ) {
          columns.push(col);
        }
      });
    }
    return columns;
  }

  // Get all column elements
  const columns = getColumns(element);

  // Prepare header row (must exactly match example)
  const headerRow = ['Columns (columns97)'];

  // Build the content row, each column/cell
  const contentRow = columns.map((column) => {
    const cellContent = [];

    // Text block
    const textBlock = column.querySelector('.flex-text--text');
    if (textBlock) {
      cellContent.push(textBlock);
    }

    // Image block
    const image = column.querySelector('.image--image img');
    if (image) {
      cellContent.push(image);
    }

    // If no text or image found, fallback to first non-spacer child
    if (cellContent.length === 0) {
      const children = Array.from(column.children).filter(
        (c) => !c.classList.contains('page-row-spacer')
      );
      if (children.length) {
        cellContent.push(...children);
      }
    }

    // If just one element, return it directly
    if (cellContent.length === 1) {
      return cellContent[0];
    }
    // If multiple elements, return as array
    return cellContent;
  });

  // Compose the table cells
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
