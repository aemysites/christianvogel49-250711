/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the main block for columns: .text-block with column-count style
  let columnsBlock = element.querySelector('[style*="column-count"]');
  if (!columnsBlock) {
    // Fallback to using the element itself if not found
    columnsBlock = element;
  }
  // Get all immediate <p> children (they make up the column content)
  const paragraphs = Array.from(columnsBlock.querySelectorAll(':scope > p'));
  // If no paragraphs are found, fallback to all children
  const colItems = paragraphs.length ? paragraphs : Array.from(columnsBlock.children);
  // The source HTML visually creates 2 columns, so split evenly or as close as possible
  const splitIdx = Math.ceil(colItems.length / 2);
  const col1 = colItems.slice(0, splitIdx);
  const col2 = colItems.slice(splitIdx);
  // Remove elements from their parent to avoid duplication
  col1.forEach(el => el.parentElement && el.parentElement.removeChild(el));
  col2.forEach(el => el.parentElement && el.parentElement.removeChild(el));
  // Prepare the table header row as in the example (ONE cell only)
  const headerRow = ['Columns (columns133)'];
  // Content row: each column is an array of paragraph elements
  const contentRow = [col1, col2];
  // Create the block table: header is a single cell, second row has two columns
  const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
