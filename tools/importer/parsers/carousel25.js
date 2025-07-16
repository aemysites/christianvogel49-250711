/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single column with block name
  const rows = [['Carousel (carousel25)']];

  // Find the columns containing slides
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;
  const columns = Array.from(row.children).filter(col => col.classList.contains('page-item--column'));

  // Each slide consists of the image column and the text column
  for (let i = 0; i < columns.length; i += 2) {
    const imageCol = columns[i];
    const textCol = columns[i + 1];
    if (!imageCol || !textCol) continue;

    // Extract image element (reference, not clone)
    const img = imageCol.querySelector('img');

    // Extract text content: all direct children except spacers
    let textSection = textCol.querySelector('section') || textCol;
    const textContent = [];
    Array.from(textSection.children).forEach(child => {
      if (!child.classList.contains('page-row-spacer')) {
        textContent.push(child);
      }
    });
    // Fallback to the section itself if no children
    const textCell = textContent.length ? textContent : [textSection];

    // Add row: two columns (image, text)
    rows.push([img, textCell]);
  }

  // Replace with the new block table only if at least one slide
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
