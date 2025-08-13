/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards103)'];
  // Get all card columns
  const cardColumns = Array.from(element.querySelectorAll('.for-column-items > .page-item--column'));
  const rows = [headerRow];

  cardColumns.forEach(card => {
    // IMAGE: Find the first <img> in the card (mandatory)
    let imgEl = card.querySelector('img');
    // TEXT: Find the headline <h5> element
    const headline = card.querySelector('.page-item--headline h5');
    // CTA: Find the first button/link in the card (optional)
    const cta = card.querySelector('.flex-text--button a');

    // Build text content cell
    const textCell = [];
    if (headline) textCell.push(headline);
    if (cta) textCell.push(cta);
    
    // Always provide an image and a text column
    rows.push([
      imgEl,
      textCell
    ]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
