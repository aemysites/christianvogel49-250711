/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example: block name
  const headerRow = ['Cards (cards65)'];
  const cells = [headerRow];

  // Find all card columns in the layout
  const cardColumns = Array.from(element.querySelectorAll(':scope .for-column-items > .page-item--column'));

  cardColumns.forEach(col => {
    // Find the image (first image in the first .page-row)
    let imageEl = null;
    const imageRow = col.querySelector(':scope > .page-row.is-nth-1');
    if (imageRow) {
      const figure = imageRow.querySelector('figure');
      if (figure) imageEl = figure;
    }

    // Find the text (first .text-block in the second .page-row)
    let textEl = null;
    const textRow = col.querySelector(':scope > .page-row.is-nth-2');
    if (textRow) {
      const textBlock = textRow.querySelector('.text-block');
      if (textBlock) textEl = textBlock;
    }

    // Only add if there's at least one piece of content
    if (imageEl || textEl) {
      cells.push([
        imageEl || '',
        textEl || ''
      ]);
    }
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
