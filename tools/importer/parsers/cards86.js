/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery list containing the cards
  const galleryList = element.querySelector('.documents-gallery');
  if (!galleryList) return;

  // Table header row: exactly one cell, with exact name
  const cells = [['Cards (cards86)']];

  // Extract all cards
  const cards = Array.from(galleryList.querySelectorAll(':scope > .document-tile'));

  cards.forEach(card => {
    // Left cell: image (reference the actual <img> element from the DOM)
    let image = '';
    const imageContainer = card.querySelector('.document-tile--image');
    if (imageContainer) {
      const img = imageContainer.querySelector('img');
      if (img) image = img;
    }

    // Right cell: full text content
    const textBlock = document.createElement('div');

    // Title
    const titleEl = card.querySelector('.document-tile--title');
    if (titleEl) {
      const strong = document.createElement('strong');
      strong.textContent = titleEl.textContent.trim();
      textBlock.appendChild(strong);
    }

    // Description (date + type)
    const descEl = card.querySelector('.document-tile--description');
    if (descEl) {
      // If textContent, append as a new block element
      const desc = document.createElement('div');
      desc.innerHTML = descEl.innerHTML; // preserve possible spans/tags
      textBlock.appendChild(desc);
    }

    // CTA (main document link, if not already covered by title)
    const mainLink = card.querySelector('.document-tile--text > a[href]');
    if (mainLink) {
      // Only add as CTA if the link's text is empty (as in these cards), so use 'Download' as text
      const cta = document.createElement('a');
      cta.href = mainLink.href;
      cta.textContent = 'Download';
      textBlock.appendChild(cta);
    }

    // Compose row: exactly one cell for each column
    cells.push([
      image || '',
      textBlock
    ]);
  });

  // Create and replace the table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
