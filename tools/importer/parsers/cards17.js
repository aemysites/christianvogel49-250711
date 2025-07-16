/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two direct child columns
  const columns = element.querySelectorAll(':scope > .row > .page-item--column');
  if (columns.length < 2) return;

  // First column: headline/title extraction
  const headlineContainer = columns[0];
  let headline = headlineContainer.querySelector('h1, h2, h3, h4, h5, h6');
  if (!headline) headline = headlineContainer;

  // Second column: CTA/button extraction
  const ctaContainer = columns[1];
  let cta = null;
  const ctaDiv = ctaContainer.querySelector('.flex-text--button');
  if (ctaDiv) {
    cta = ctaDiv.querySelector('a, button');
  }

  // Compose the card row as an array of two cells: image cell (blank) and text cell
  const textCell = document.createElement('div');
  if (headline) textCell.appendChild(headline);
  if (cta) textCell.appendChild(cta);
  const cardRow = ['', textCell];

  // The table: header is a single cell row, card rows are two cell rows
  const cells = [
    ['Cards (cards17)'],
    cardRow
  ];

  // Create the table and replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
