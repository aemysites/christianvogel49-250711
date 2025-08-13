/* global WebImporter */
export default function parse(element, { document }) {
  // Select all columns (should be 4 for this block)
  const columns = Array.from(element.querySelectorAll(':scope > .row.for-column-items > .page-item--column'));

  // Defensive: if no columns found, do nothing
  if (!columns.length) return;

  // Helper: extract full column content (image + text)
  function extractColumnContent(col) {
    const content = [];
    // Find image/figure element
    const figure = col.querySelector('figure');
    if (figure) content.push(figure);
    // Find text block
    const textBlock = col.querySelector('.text-block');
    if (textBlock) content.push(textBlock);
    // Return content: single element, array, or empty string
    if (content.length === 1) return content[0];
    if (content.length > 1) return content;
    return '';
  }

  // Table header row (exactly one cell, matching example)
  const headerRow = ['Columns (columns154)'];
  // Content row: 4 columns, extracting content for each
  const columnsRow = columns.map(extractColumnContent);

  // Ensure there are exactly 4 columns (for robustness)
  while (columnsRow.length < 4) columnsRow.push('');

  // Create table and replace original element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);
  element.replaceWith(table);
}
