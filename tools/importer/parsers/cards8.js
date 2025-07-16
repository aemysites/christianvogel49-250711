/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards8) block header
  const rows = [['Cards (cards8)']];

  // Get all direct cards
  const cards = element.querySelectorAll('.document-tile');
  cards.forEach((card) => {
    // FIRST COLUMN: Image (reference original img element)
    let imageEl = null;
    const imgAnchor = card.querySelector(':scope > a.document-tile--image, :scope > a.document-tile--image.-landscape');
    if (imgAnchor) {
      imageEl = imgAnchor.querySelector('img');
    }

    // SECOND COLUMN: All text & actions in the card (reference the entire .document-tile--text block)
    let textBlock = card.querySelector('.document-tile--text');
    // Fallback if .document-tile--text is missing
    if (!textBlock) {
      textBlock = document.createElement('div');
      // Append everything except the image
      Array.from(card.childNodes).forEach((child) => {
        if (!(child.matches && (child.matches('a.document-tile--image') || child.matches('a.document-tile--image.-landscape')))) {
          textBlock.appendChild(child);
        }
      });
    }
    rows.push([imageEl, textBlock]);
  });

  // Create and replace with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
