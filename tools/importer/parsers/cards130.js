/* global WebImporter */
export default function parse(element, { document }) {
  // Find the card container
  const cardsContainer = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!cardsContainer) return;

  // Get all card links
  const cardLinks = Array.from(cardsContainer.querySelectorAll(':scope > a.image-tile'));

  // Table header matches exactly the example
  const headerRow = ['Cards (cards130)'];
  const rows = [headerRow];

  cardLinks.forEach(card => {
    // --- Image cell ---
    let imageCell = null;
    const imageWrapper = card.querySelector('.image-tile--image img');
    if (imageWrapper) imageCell = imageWrapper;

    // --- Text cell ---
    // Get date (if present)
    let dateElem = card.querySelector('.image-tile--badge time');
    // Title (below image)
    let titleElem = card.querySelector('.image-tile--title-below-image');

    // Compose text cell, keeping all text content
    const parts = [];
    if (dateElem) {
      // Date as subtle text above title
      const dateDiv = document.createElement('div');
      dateDiv.style.fontSize = '0.9em';
      dateDiv.style.opacity = '0.7';
      dateDiv.textContent = dateElem.textContent.trim();
      parts.push(dateDiv);
    }
    if (titleElem) {
      // Title as bold
      const titleDiv = document.createElement('div');
      titleDiv.style.fontWeight = 'bold';
      titleDiv.textContent = titleElem.textContent.trim();
      parts.push(titleDiv);
    }
    // No additional description in this layout

    // If nothing, fallback to empty div
    const textCell = parts.length ? parts : document.createElement('div');

    rows.push([imageCell, textCell]);
  });

  // Create and replace the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
