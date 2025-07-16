/* global WebImporter */
export default function parse(element, { document }) {
  // Helper to get direct children with a selector
  function scopedQueryAll(el, selector) {
    return Array.from(el.querySelectorAll(':scope > ' + selector));
  }

  // Find the carousel columns: expect image column and content column
  let columns = Array.from(element.querySelectorAll('.for-column-items > .page-item--column'));
  if (columns.length === 0) {
    // fallback: search for columns directly under the row
    columns = scopedQueryAll(element, 'div');
  }

  // Find the image column (should have an image inside)
  let imageCol = columns.find(col => col.querySelector('img'));
  let contentCol = columns.find(col => col !== imageCol);

  // Get the image element or its figure container
  let figure = null;
  if (imageCol) {
    figure = imageCol.querySelector('figure');
    if (!figure) {
      const img = imageCol.querySelector('img');
      if (img) figure = img;
    }
  }

  // Get the textual content from contentCol
  let section = contentCol && contentCol.querySelector('section.flex-text');
  let title = section ? section.querySelector('.flex-text--title') : null;
  let description = section ? section.querySelector('.flex-text--text') : null;
  let ctaDiv = section ? section.querySelector('.flex-text--button') : null;
  let cta = ctaDiv ? ctaDiv.querySelector('a') : null;

  // Compose the right cell with all text content
  let rightCellElements = [];
  if (title) rightCellElements.push(title);
  if (description) rightCellElements.push(description);
  if (cta) rightCellElements.push(cta);

  // ---
  // Create the table with a single-cell header row, followed by 2-column rows
  // ---
  // We'll need to create the table directly, since WebImporter.DOMUtils.createTable
  // does not support header <th> with colspan out-of-the-box.

  // Create table
  const table = document.createElement('table');

  // Create header row as a single <th> with colspan=2
  const headerTr = document.createElement('tr');
  const headerTh = document.createElement('th');
  headerTh.textContent = 'Carousel (carousel14)';
  headerTh.colSpan = 2;
  headerTr.appendChild(headerTh);
  table.appendChild(headerTr);

  // Create the slide row
  const slideTr = document.createElement('tr');
  const leftTd = document.createElement('td');
  if (figure) leftTd.appendChild(figure);
  slideTr.appendChild(leftTd);
  const rightTd = document.createElement('td');
  rightCellElements.forEach(e => {
    if (e) rightTd.appendChild(e);
  });
  slideTr.appendChild(rightTd);
  table.appendChild(slideTr);

  element.replaceWith(table);
}
