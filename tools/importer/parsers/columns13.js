/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row with columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;
  // Get all column top-level elements in this row
  const columns = Array.from(row.children).filter(col => col.classList.contains('page-item--column'));
  // Each column: gather its main content
  const columnCells = columns.map(col => {
    // Ignore spacers, gather meaningful content only
    // Get all direct .page-row children
    const rows = Array.from(col.children).filter(n => n.classList.contains('page-row'));
    const content = [];
    rows.forEach(r => {
      // Find the main content element(s) in each page-row
      // Typically a .page-item, but could in rare cases be direct content
      const items = Array.from(r.children).filter(n => n.classList && n.classList.contains('page-item'));
      if (items.length > 0) {
        content.push(...items);
      } else {
        // If no .page-item, just push the row itself
        content.push(r);
      }
    });
    // In case there's a shares block (e.g., Aktien ticker), which may not be wrapped in .page-row
    const share = col.querySelector(':scope > .page-item--share-prices');
    if (share) content.push(share);
    // Fallback: if nothing gathered, include non-spacer children
    if (content.length === 0) {
      const nonSpacer = Array.from(col.children).filter(n => !(n.classList && n.classList.contains('page-row-spacer')));
      if (nonSpacer.length) content.push(...nonSpacer);
    }
    // Only one, return it directly. Multiple, return as array.
    return content.length === 1 ? content[0] : content;
  });
  // Construct the table: header then one row with N columns
  const cells = [
    ['Columns (columns13)'],
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}