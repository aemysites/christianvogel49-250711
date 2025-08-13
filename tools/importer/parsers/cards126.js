/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as in the example
  const cells = [['Cards (cards126)']];

  // Find the gallery section containing the cards
  const gallerySection = element.querySelector('section.gallery');
  if (!gallerySection) return;

  // Find all card containers (document-tile elements)
  const cardNodes = gallerySection.querySelectorAll('.documents-gallery .document-tile');

  cardNodes.forEach(card => {
    // First cell: image
    let imageEl = card.querySelector('img');

    // Second cell: text content
    // Get the document-tile--text div
    const textDiv = card.querySelector('.document-tile--text');
    let textEl;
    if (textDiv) {
      // Compose semantic content
      const textContent = [];
      // Title: as <strong>
      const titleEl = textDiv.querySelector('.document-tile--title');
      if (titleEl && titleEl.textContent.trim()) {
        const strongEl = document.createElement('strong');
        strongEl.textContent = titleEl.textContent.trim();
        textContent.push(strongEl);
      }
      // Description: date, type, person
      const descDiv = textDiv.querySelector('.document-tile--description');
      if (descDiv) {
        // Collect all non-empty text nodes (time and spans)
        let descParts = [];
        const timeEl = descDiv.querySelector('time');
        if (timeEl && timeEl.textContent.trim()) descParts.push(timeEl.textContent.trim());
        descDiv.querySelectorAll('span').forEach(span => {
          if (span.textContent.trim()) descParts.push(span.textContent.trim());
        });
        if (descParts.length) {
          const descP = document.createElement('div');
          descP.textContent = descParts.join(' · ');
          textContent.push(descP);
        }
      }
      // If there is any additional text (outside title/desc), add it
      // (such as download/share buttons, usually not needed)
      textEl = document.createElement('div');
      textContent.forEach(el => textEl.appendChild(el));
      // If no content at all, fallback to full textDiv
      if (!textEl.textContent.trim()) {
        textEl = textDiv;
      }
    } else {
      // Fallback: all text in card
      textEl = document.createElement('div');
      textEl.textContent = card.textContent.trim();
    }
    cells.push([imageEl, textEl]);
  });

  // Create the table and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
