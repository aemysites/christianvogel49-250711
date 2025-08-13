/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the Columns block
  const headerRow = ['Columns (columns110)'];

  // Find the row containing all columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;

  // Get all immediate column wrappers
  const colDivs = row.querySelectorAll(':scope > .page-item--column');

  // For each column, gather all relevant visible content except spacers
  const columns = Array.from(colDivs).map((col) => {
    // Get all children except page-row-spacer
    const contentEls = Array.from(col.children).filter(child => {
      return !child.classList.contains('page-row-spacer');
    });
    // If no relevant children, fallback to all non-empty text and elements
    if (contentEls.length === 0) {
      return Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }
    return contentEls;
  });

  // Table structure: header, then columns row
  const tableRows = [headerRow, columns];
  const blockTable = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(blockTable);
}
