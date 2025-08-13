/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one column with the block name
  const headerRow = ['Columns (columns36)'];

  // Find all immediate share blocks (columns)
  const shareDivs = element.querySelectorAll(':scope > .shares-box--share');
  // Defensive: handle no shares case
  const shareContents = shareDivs.length > 0
    ? Array.from(shareDivs).map(shareBox => {
        const shareContent = shareBox.querySelector(':scope > .share');
        return shareContent || document.createElement('div');
      })
    : [document.createElement('div')];

  // Build the table: header is one cell, next row is share cells
  const tableRows = [headerRow, shareContents];

  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
