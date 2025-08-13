/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches example exactly
  const headerRow = ['Cards (cards92)'];
  const cells = [headerRow];

  // Get all columns for cards
  const columns = element.querySelectorAll('.for-column-items > .page-item--column');
  columns.forEach((col) => {
    // Find the figure element (contains image and caption)
    const figure = col.querySelector('figure.image');
    let imageCell = '';
    let textCell = '';
    if (figure) {
      // Reference the image element
      const img = figure.querySelector('img');
      if (img) {
        imageCell = img;
      }
      // Reference the caption text
      const figcaption = figure.querySelector('.image--caption');
      if (figcaption) {
        // Use a div for the text cell (preserves semantic meaning)
        const textDiv = document.createElement('div');
        textDiv.textContent = figcaption.textContent.trim();
        textCell = textDiv;
      } else {
        // Edge case: no caption
        textCell = document.createTextNode('');
      }
    } else {
      // Edge case: no figure/image
      imageCell = document.createTextNode('');
      textCell = document.createTextNode('');
    }
    cells.push([imageCell, textCell]);
  });

  // Create and replace table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
