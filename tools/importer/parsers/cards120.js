/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as per example
  const headerRow = ['Cards (cards120)'];
  const cardsRows = [];

  // Helper to get all card columns from both .row.for-column-items.-four-columns rows
  const rowContainers = element.querySelectorAll('.row.for-column-items.-four-columns');
  rowContainers.forEach((rowContainer) => {
    const cardColumns = rowContainer.querySelectorAll(':scope > .page-item.page-item--column');
    cardColumns.forEach((cardColumn) => {
      // Find image in column
      let imageEl = null;
      const imageItem = cardColumn.querySelector('.page-item--image');
      if (imageItem) {
        const figure = imageItem.querySelector('figure.image');
        if (figure) imageEl = figure;
      }
      // Find text in column
      let textEl = null;
      const textItem = cardColumn.querySelector('.page-item--text');
      if (textItem) {
        const textBlock = textItem.querySelector('.text-block');
        if (textBlock) textEl = textBlock;
      }
      // Only add valid cards: needs both image and text
      if (imageEl && textEl) {
        cardsRows.push([imageEl, textEl]);
      }
    });
  });

  // Edge case: if nothing found, do nothing
  if (cardsRows.length === 0) return;

  const cells = [headerRow, ...cardsRows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
