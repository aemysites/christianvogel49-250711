/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns (direct children of .row inside .container-narrow)
  const columns = Array.from(element.querySelectorAll(':scope > .container-narrow > .row > .page-item--column'));

  // For each column, extract the icon box block (all relevant content)
  const contentRow = columns.map(col => {
    // The content for each column is the first .page-item--icon-box inside this column
    const iconBox = col.querySelector('.page-item--icon-box');
    return iconBox ? iconBox : document.createElement('div'); // fallback: empty cell if not found
  });

  // The header row should be exactly one cell: ['Columns (columns90)']
  const cells = [
    ['Columns (columns90)'], // header row: single column
    contentRow // content row: one cell per column
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(block);
}
