/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct columns in the layout
  function getColumns(element) {
    let row = element.querySelector('.row.for-column-items');
    if (!row) row = element.querySelector('.row');
    if (!row) return [];
    return Array.from(row.children).filter(
      (col) => col.classList.contains('page-item--column')
    );
  }

  // Extract the main content for each column
  function extractColumnContent(column) {
    const content = [];
    // Find image (figure or img)
    const figure = column.querySelector('figure.image');
    if (figure) {
      content.push(figure);
    }
    // Find text block
    const textBlock = column.querySelector('.text-block');
    if (textBlock) {
      content.push(textBlock);
    }
    // Find button
    const flexBtn = column.querySelector('.flex-text--button .btn, .btn.btn-default');
    if (flexBtn && !content.includes(flexBtn)) {
      content.push(flexBtn);
    }
    if (content.length === 0) {
      // Try direct children
      const mainRows = column.querySelectorAll(':scope > div');
      for (const r of mainRows) {
        if (r.classList.contains('page-row-spacer')) continue;
        if (r.querySelector('figure.image') || r.querySelector('img')) {
          const f = r.querySelector('figure.image') || r.querySelector('img');
          content.push(f);
        } else if (r.querySelector('.text-block')) {
          content.push(r.querySelector('.text-block'));
        } else if (r.querySelector('.flex-text--button .btn, .btn.btn-default')) {
          const b = r.querySelector('.flex-text--button .btn, .btn.btn-default');
          content.push(b);
        }
      }
    }
    if (content.length === 0) {
      return column;
    }
    if (content.length === 1) return content[0];
    return content;
  }

  let columns = getColumns(element);
  if (columns.length === 0) {
    columns = Array.from(element.children).filter(x => x.classList.contains('page-item--column'));
  }

  if (columns.length > 0) {
    // Header row should be a single cell with colspan matching number of columns
    const headerCell = document.createElement('th');
    headerCell.setAttribute('colspan', columns.length);
    headerCell.textContent = 'Columns (columns1)';
    const headerRow = [headerCell];
    const contentRow = columns.map(col => extractColumnContent(col));
    const table = WebImporter.DOMUtils.createTable([headerRow, contentRow], document);
    element.replaceWith(table);
  }
}
