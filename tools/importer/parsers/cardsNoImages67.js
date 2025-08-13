/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as in example
  const headerRow = ['Cards (cardsNoImages67)'];

  // Safely find the cards tile container
  const tilesContainer = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!tilesContainer) return;
  const tiles = Array.from(tilesContainer.children).filter(el => el.classList.contains('imageless-tile'));

  // For each card, structure the text as heading and description as per the block guideline
  const rows = tiles.map(tile => {
    // Extract badge data
    const badge = tile.querySelector('.imageless-tile--badge .badge');
    let badgeText = '';
    if (badge) {
      const timeEl = badge.querySelector('time');
      const timeText = timeEl ? timeEl.textContent.trim() : '';
      const spanEl = badge.querySelector('span');
      const spanText = spanEl ? spanEl.textContent.trim() : '';
      badgeText = [timeText, spanText].filter(Boolean).join(' · ');
    }
    // Card title
    const titleEl = tile.querySelector('.imageless-tile--title');
    const titleText = titleEl ? titleEl.textContent.trim() : '';

    // Build cell content to match example: badge in bold, title below
    const frag = document.createDocumentFragment();
    if (badgeText) {
      const badgeDiv = document.createElement('strong');
      badgeDiv.textContent = badgeText;
      frag.appendChild(badgeDiv);
      frag.appendChild(document.createElement('br'));
    }
    if (titleText) {
      const titleDiv = document.createElement('div');
      titleDiv.textContent = titleText;
      frag.appendChild(titleDiv);
    }
    // Use the original tile's href as a link for the entire cell, as cards are clickable
    const href = tile.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.appendChild(frag);
      return [link];
    }
    return [frag];
  });

  // Table data
  const tableData = [headerRow, ...rows];
  // Create table and replace original element
  const block = WebImporter.DOMUtils.createTable(tableData, document);
  element.replaceWith(block);
}
