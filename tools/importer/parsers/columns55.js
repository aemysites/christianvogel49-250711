/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column blocks in the layout
  const columns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row.for-column-items > .page-item.page-item--column'));
  // Prepare the table header as required
  const headerRow = ['Columns (columns55)'];
  // Sanity: fallback to empty columns if not found
  const col1 = columns[0] || document.createElement('div');
  const col2 = columns[1] || document.createElement('div');

  // LEFT COLUMN: Image block and links block
  // Get the image block (the entire .page-item--image)
  const imageBlock = col1.querySelector('.page-row.is-nth-1 .page-item--image');
  // Get the quicklink list block (the entire .page-item--quicklink-list)
  const linksBlock = col1.querySelector('.page-row.is-nth-2 .page-item--quicklink-list');
  // Add both if they exist, in order
  const leftColContent = [];
  if (imageBlock) leftColContent.push(imageBlock);
  if (linksBlock) leftColContent.push(linksBlock);

  // RIGHT COLUMN: Large text block
  // Get the text block (the entire .page-item--text)
  const textBlock = col2.querySelector('.page-row.is-nth-1 .page-item--text');
  const rightColContent = [];
  if (textBlock) rightColContent.push(textBlock);

  // Compose the data cells row: two columns, matching the example/screenshot
  const cellsRow = [leftColContent, rightColContent];

  // Assemble the final table structure
  const tableData = [headerRow, cellsRow];
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the new block
  element.replaceWith(table);
}
