/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the columns
  const columnsRow = element.querySelector(':scope > .row.for-column-items');
  let columns = [];
  if (columnsRow) {
    columns = Array.from(columnsRow.querySelectorAll(':scope > .page-item--column'));
  }
  if (columns.length === 0) {
    // fallback: treat the element as a single column if structure is unexpected
    columns = [element];
  }

  // Extract meaningful content from each column
  const dataRow = columns.map((col) => {
    // Exclude spacer divs for a cleaner result
    const contentDivs = Array.from(col.children).filter(
      (child) => !child.classList.contains('page-row-spacer')
    );
    if (contentDivs.length === 1) {
      return contentDivs[0];
    } else if (contentDivs.length > 1) {
      return contentDivs;
    } else {
      return col;
    }
  });

  // The header row must have a single cell, and the next row must have one cell per column
  // This will make the header row span all columns visually
  const cells = [
    ['Columns (columns115)'],
    dataRow
  ];
  
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
