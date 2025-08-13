/* global WebImporter */
export default function parse(element, { document }) {
  // Find the row containing the two card columns
  const columnRow = element.querySelector('.row.for-column-items');
  if (!columnRow) return;
  const columns = Array.from(columnRow.children).filter(child => child.classList.contains('page-item--column'));
  if (columns.length !== 2) return;

  // First column: image
  const imgEl = columns[0].querySelector('img');
  // Second column: text
  let textCell = null;
  const textBlock = columns[1].querySelector('.flex-text--text.text-block');
  if (textBlock) {
    textCell = textBlock.querySelector('p') || textBlock;
  }

  if (!imgEl || !textCell) return;

  // Critical fix: Header row must have two columns; the second is an empty string
  const cells = [
    ['Cards (cards91)', ''],
    [imgEl, textCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
