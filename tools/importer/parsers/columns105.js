/* global WebImporter */
export default function parse(element, { document }) {
  // The block name header row must be a single cell, exactly as in the markdown example
  const headerRow = ['Columns (columns105)'];

  // Find columns: .row.for-column-items > .page-item--column
  const row = element.querySelector('.row.for-column-items');
  let columns = [];
  if (row) {
    columns = Array.from(row.children)
      .filter(col => col.classList.contains('page-item--column'))
      .map(col => {
        // Get the main content of each column
        const innerRow = col.querySelector('.page-row.is-nth-1');
        if (innerRow) {
          const textItem = innerRow.querySelector('.page-item--text');
          if (textItem) {
            const block = textItem.querySelector('.text-block');
            if (block) return block;
            return textItem;
          }
          return innerRow;
        }
        return col;
      });
  }
  // If no columns, fallback to element
  if (columns.length === 0) {
    columns = [element];
  }

  // Build two rows: header (single cell), then content row (N columns)
  const cells = [
    headerRow,              // one header cell for the block name
    columns                 // one row with as many columns as needed
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}