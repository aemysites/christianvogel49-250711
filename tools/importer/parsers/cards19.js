/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tile list container
  const tilesContainer = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!tilesContainer) return;

  const rows = [['Cards (cards19)']];
  const cards = tilesContainer.querySelectorAll('.image-tile');
  cards.forEach((card) => {
    // Image (first column)
    let img = card.querySelector('.image-tile--image img');
    let imgCell = img || '';

    // Text content (second column)
    const textElements = [];

    // Badge/date/label (optional)
    const badgeContainer = card.querySelector('.image-tile--badge .badge');
    if (badgeContainer) {
      // Compose badge (date, then label)
      const badgeParts = [];
      const time = badgeContainer.querySelector('time');
      const label = badgeContainer.querySelector('span');
      if (time) {
        const dateElem = document.createElement('span');
        dateElem.textContent = time.textContent;
        badgeParts.push(dateElem);
      }
      if (label) {
        if (badgeParts.length > 0) badgeParts.push(document.createTextNode(' · '));
        const labelElem = document.createElement('span');
        labelElem.textContent = label.textContent;
        badgeParts.push(labelElem);
      }
      const badgeDiv = document.createElement('div');
      badgeParts.forEach((e) => badgeDiv.appendChild(e));
      textElements.push(badgeDiv);
    }

    // Title (mandatory)
    const titleDiv = card.querySelector('.image-tile--title-below-image');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textElements.push(strong);
    }

    // Wrap all text in a link if the card is a link
    let textCell;
    if (card.getAttribute('href')) {
      const a = document.createElement('a');
      a.href = card.getAttribute('href');
      textElements.forEach((child) => a.appendChild(child));
      textCell = a;
    } else {
      // unlikely, but fallback
      textCell = document.createElement('div');
      textElements.forEach((child) => textCell.appendChild(child));
    }

    rows.push([imgCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
