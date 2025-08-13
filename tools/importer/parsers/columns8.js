/* global WebImporter */
export default function parse(element, { document }) {
  // Find the direct column blocks
  const columns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row.for-column-items > .page-item--column'));

  // Table header must exactly match the example
  const headerRow = ['Columns (columns8)'];

  // For each column, gather its content as a single cell
  const cellsRow = columns.map((col) => {
    // Collect all meaningful content from each column (in document order)
    // Only consider .page-row children, skip spacers
    const content = [];
    const pageRows = Array.from(col.querySelectorAll(':scope > .page-row'));
    pageRows.forEach((row) => {
      // Find all page-item content blocks inside this .page-row
      const contentBlocks = Array.from(row.querySelectorAll(':scope > .page-item'));
      contentBlocks.forEach((block) => {
        if (block.classList.contains('page-item--text')) {
          // Reference the existing .text-block
          const textBlock = block.querySelector('.text-block');
          if (textBlock) content.push(textBlock);
        }
        if (block.classList.contains('page-item--image')) {
          // Reference the existing figure (image block)
          const figure = block.querySelector('figure');
          if (figure) content.push(figure);
        }
        if (block.classList.contains('page-item--quicklink-list')) {
          // Reference the existing quicklink list
          const quicklinkList = block.querySelector('.quicklink-list');
          if (quicklinkList) content.push(quicklinkList);
        }
      });
    });
    // If only one element, provide as single reference; otherwise, array
    if (content.length === 1) return content[0];
    if (content.length > 1) return content;
    // If no meaningful content, insert an empty string (edge case)
    return '';
  });

  // Structure: first row is header (single cell); second row has one cell per column
  const cells = [headerRow, cellsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
