/* global WebImporter */
export default function parse(element, { document }) {
  // Find the Finanznachrichten cards block
  const blockName = 'Cards (cards54)';
  let cardsTiles = null;
  const pageListBlocks = element.querySelectorAll('.page-item--page-list');
  for (const block of pageListBlocks) {
    const tiles = block.querySelector('.horizontal-scroll-page-list--tiles');
    if (tiles && tiles.querySelector('.image-tile')) {
      cardsTiles = tiles;
      break;
    }
  }
  if (!cardsTiles) return;

  const cardLinks = cardsTiles.querySelectorAll('.image-tile');
  const cells = [[blockName]];

  cardLinks.forEach(card => {
    // Left column: image element (reference existing)
    let img = null;
    const imgContainer = card.querySelector('.image-tile--image');
    if (imgContainer) {
      const foundImg = imgContainer.querySelector('img');
      if (foundImg) img = foundImg;
    }

    // Right column: collect all text (badge, title, and anything else visible, as existing elements)
    // We'll reference the child elements except .image-tile--image
    const textParts = [];
    Array.from(card.children).forEach(child => {
      if (!child.classList.contains('image-tile--image')) {
        textParts.push(child);
      }
    });
    // Ensure all visible text is retained, even if not inside elements
    Array.from(card.childNodes).forEach(node => {
      if (
        node.nodeType === Node.TEXT_NODE &&
        node.textContent.trim().length > 0 &&
        !textParts.some(e => e.textContent && e.textContent.includes(node.textContent.trim()))
      ) {
        // Wrap text node in <span> to insert into table
        const span = document.createElement('span');
        span.textContent = node.textContent.trim();
        textParts.push(span);
      }
    });
    cells.push([img ? img : '', textParts.length === 1 ? textParts[0] : textParts]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
