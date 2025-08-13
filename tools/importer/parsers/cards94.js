/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header matches exactly
  const headerRow = ['Cards (cards94)'];
  const rows = [headerRow];

  // 2. Get all direct card columns
  const cardColumns = Array.from(element.querySelectorAll(':scope .for-column-items > .page-item--column'));

  cardColumns.forEach(col => {
    // Get the image element (first card image)
    let imageEl = null;
    const imageSection = col.querySelector('.page-item--image');
    if (imageSection) {
      const img = imageSection.querySelector('img');
      imageEl = img || null;
    }

    // Get card main content
    const textSection = col.querySelector('.page-item--flex section.flex-text');
    const textCellContent = [];
    if (textSection) {
      // Title
      const title = textSection.querySelector('.flex-text--title');
      if (title) {
        // Always use heading element from source, but adapt to h3 as in example
        const h3 = document.createElement('h3');
        h3.innerHTML = title.innerHTML;
        textCellContent.push(h3);
      }
      // Description
      const desc = textSection.querySelector('.flex-text--text p');
      if (desc) {
        textCellContent.push(desc);
      }
      // CTA, only if present
      const cta = textSection.querySelector('.flex-text--button a');
      if (cta) {
        textCellContent.push(cta);
      }
    }
    // Add the row only if we have meaningful card content
    if (imageEl && textCellContent.length > 0) {
      rows.push([imageEl, textCellContent]);
    }
  });

  // Create the block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
