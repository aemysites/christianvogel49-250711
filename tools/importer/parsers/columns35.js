/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  const columns = Array.from(columnsRow.children).filter(col => col.classList.contains('page-item--column'));

  // For each column, extract the relevant main content
  const columnCells = columns.map((col) => {
    const pageRow = col.querySelector('.page-row');
    if (!pageRow) return '';
    const image = pageRow.querySelector('.image');
    if (image) {
      return image;
    }
    const flex = pageRow.querySelector('section.flex-text');
    if (flex) {
      return flex;
    }
    return Array.from(pageRow.children);
  });

  // Create the table using createTable as before
  const cells = [
    ['Columns (columns35)'], // this will be the header row
    columnCells
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Fix the header row to have colspan matching the number of columns
  const th = table.querySelector('th');
  if (th && columnCells.length > 1) {
    th.setAttribute('colspan', String(columnCells.length));
    // Remove any extra <th> that may have been created by createTable
    let next = th.nextElementSibling;
    while (next) {
      const toRemove = next;
      next = next.nextElementSibling;
      toRemove.remove();
    }
  }

  element.replaceWith(table);
}
