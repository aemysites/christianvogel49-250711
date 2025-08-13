/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as specified
  const headerRow = ['Columns (columns6)'];

  // Find the main column container
  const container = element.querySelector('.container-fluid');
  if (!container) return;
  const row = container.querySelector('.row.for-column-items');
  if (!row) return;
  // Find direct children columns
  const columns = Array.from(row.children).filter(col => col.classList.contains('page-item--column'));
  if (columns.length !== 2) return;

  // --- LEFT COLUMN ---
  const leftCol = columns[0];
  // Find headline
  let headline = null;
  const headlineRow = leftCol.querySelector('.page-item--headline');
  if (headlineRow) {
    headline = headlineRow.querySelector('h3');
  }
  // Find paragraph
  let paragraph = null;
  const textRow = leftCol.querySelector('.page-item--text');
  if (textRow) {
    const block = textRow.querySelector('.text-block');
    if (block) {
      paragraph = block.querySelector('p');
    }
  }
  // Compose left column cell
  const leftColContent = [];
  if (headline) leftColContent.push(headline);
  if (paragraph) leftColContent.push(paragraph);

  // --- RIGHT COLUMN ---
  const rightCol = columns[1];
  let sharesBox = null;
  const sharePricesRow = rightCol.querySelector('.page-item--share-prices');
  if (sharePricesRow) {
    sharesBox = sharePricesRow.querySelector('.shares-box');
  }
  const rightColContent = sharesBox ? [sharesBox] : [];

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    [leftColContent, rightColContent]
  ], document);

  element.replaceWith(table);
}
