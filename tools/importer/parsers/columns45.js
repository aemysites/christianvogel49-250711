/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get all immediate columns in the .tile-section.-infobox > .row.for-column-items
  function getColumnItems(el) {
    const tileSection = el.querySelector('.tile-section.-infobox');
    if (!tileSection) return [];
    const row = tileSection.querySelector('.row.for-column-items');
    if (!row) return [];
    // Only direct children with column class
    return Array.from(row.children).filter(col => col.classList.contains('page-item--column'));
  }

  const columns = getColumnItems(element);
  if (!columns.length) return;

  // Build content for each column (second row)
  const contentRow = columns.map(col => {
    // Most columns: one .page-row.is-nth-1, containing all real content blocks (img or appointments)
    const innerRow = col.querySelector('.page-row.is-nth-1');
    if (!innerRow) return document.createTextNode('');
    // Exclude spacer divs
    const contentEls = Array.from(innerRow.children).filter(child => !child.classList.contains('page-row-spacer'));
    if (contentEls.length === 1) return contentEls[0];
    if (contentEls.length > 1) return contentEls;
    return document.createTextNode('');
  });

  // Header row: must be a single cell/column as per the markdown example
  const headerRow = ['Columns (columns45)'];

  // Compose table
  const tableRows = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
