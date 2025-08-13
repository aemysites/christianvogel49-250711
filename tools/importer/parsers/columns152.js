/* global WebImporter */
export default function parse(element, { document }) {
  // Helper function to get direct column elements
  function getColumns(block) {
    const row = block.querySelector('.row.for-column-items');
    if (row) {
      return Array.from(row.children).filter(child => child.classList.contains('page-item--column'));
    }
    return [];
  }

  // Find the column blocks inside the given section
  const columns = getColumns(element);
  if (!columns.length) return;

  // Header row: block name exactly as required
  const headerRow = ['Columns (columns152)'];

  // For each column, find the main content area for each cell
  const cellsRow = columns.map(col => {
    // Find the first non-spacer direct child .page-row
    const pageRows = Array.from(col.querySelectorAll(':scope > .page-row'));
    // Pick the first one that contains a .page-item or section or figure (content)
    let contentRow = pageRows.find(r => r.querySelector('.page-item, section, figure'));
    if (!contentRow) contentRow = col; // fallback

    // If the contentRow contains only one child (e.g., .page-item--flex or .page-item--image), use that
    // Otherwise, use the contentRow itself
    // This ensures we get e.g. the <section> or <figure> content
    let mainContent = contentRow;
    const directContent = contentRow.querySelector(':scope > .page-item, :scope > section, :scope > figure');
    if (directContent && contentRow.children.length === 1) {
      mainContent = directContent;
    }
    // Only reference the existing element, do not clone or create new ones
    return mainContent;
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    cellsRow
  ], document);

  // Replace original element with the table
  element.replaceWith(table);
}
