/* global WebImporter */
export default function parse(element, { document }) {
  // Table header matches the block name exactly as in the example
  const cells = [['Cards']];

  // Get all card links (immediate card elements)
  const cardLinks = element.querySelectorAll('.imageless-tile');

  cardLinks.forEach((cardLink) => {
    // Each card contains: badge (date + label), then the title
    // We want to preserve the structure and semantic meaning
    const badge = cardLink.querySelector('.imageless-tile--badge .badge');
    const title = cardLink.querySelector('.imageless-tile--title');

    // Compose the card content using existing elements where possible
    const frag = document.createDocumentFragment();

    if (badge) {
      // Use the badge's time and span, separated by ": "
      const time = badge.querySelector('time');
      const span = badge.querySelector('span');
      if (time && span) {
        // Combine into one line just as it displays visually
        const badgeLine = document.createElement('div');
        badgeLine.textContent = `${time.textContent} · ${span.textContent}`;
        frag.appendChild(badgeLine);
      } else if (time) {
        frag.appendChild(time);
      } else if (span) {
        frag.appendChild(span);
      }
    }

    if (title) {
      // Add the title text below the badge line
      const titleDiv = document.createElement('div');
      titleDiv.textContent = title.textContent;
      titleDiv.style.marginTop = '0.5em';
      frag.appendChild(titleDiv);
    }

    // Wrap everything in a link to the card's href
    const link = document.createElement('a');
    link.href = cardLink.getAttribute('href');
    link.appendChild(frag);

    // Each card is a single cell in its own row
    cells.push([link]);
  });

  // Replace only if there are cards
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
