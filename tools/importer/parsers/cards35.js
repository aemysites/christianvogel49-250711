/* global WebImporter */
export default function parse(element, { document }) {
  // Find the container holding all cards
  const tiles = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!tiles) return;

  // Compose rows: first row is header
  const rows = [['Cards (cards35)']];

  // Loop over each card tile
  const cards = Array.from(tiles.querySelectorAll(':scope > a.image-tile'));
  cards.forEach((card) => {
    // Image cell
    let imgCell = null;
    const img = card.querySelector('.image-tile--image img');
    if (img) {
      imgCell = img;
    }

    // Text cell
    const textDiv = document.createElement('div');
    // Badge: date and type (meta info)
    const badge = card.querySelector('.image-tile--badge .badge');
    if (badge) {
      const time = badge.querySelector('time');
      const type = badge.querySelector('span');
      if (time || type) {
        const small = document.createElement('small');
        const parts = [];
        if (time) parts.push(time.textContent.trim());
        if (type) parts.push(type.textContent.trim());
        small.textContent = parts.join(' – ');
        textDiv.appendChild(small);
        textDiv.appendChild(document.createElement('br'));
      }
    }
    // Title (below image)
    const titleDiv = card.querySelector('.image-tile--title-below-image');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textDiv.appendChild(strong);
    }
    // Make full text cell a link if card has href
    let textCell = textDiv;
    if (card.href) {
      const link = document.createElement('a');
      link.href = card.href;
      link.appendChild(textDiv);
      textCell = link;
    }
    rows.push([imgCell, textCell]);
  });

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
