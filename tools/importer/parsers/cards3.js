/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main card tiles block
  const tilesWrapper = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!tilesWrapper) return;
  // Get all card anchor elements
  const cards = Array.from(tilesWrapper.querySelectorAll(':scope > a.image-tile'));
  // Header row must be exactly one column
  const rows = [['Cards (cards3)']];
  // Each card row is a 2-column array: [image, text]
  cards.forEach(card => {
    // 1. Image (reference the existing <img>)
    let imageEl = null;
    const img = card.querySelector('.image-tile--image img');
    if (img) imageEl = img;
    // 2. Text content cell, with date and title/description
    const textParts = [];
    // Date from badge (time)
    const badge = card.querySelector('.image-tile--badge');
    if (badge) {
      const time = badge.querySelector('time');
      if (time && time.textContent.trim()) {
        const timeDiv = document.createElement('div');
        timeDiv.textContent = time.textContent.trim();
        textParts.push(timeDiv);
      }
    }
    // Title/description
    const titleDiv = card.querySelector('.image-tile--title-below-image');
    if (titleDiv) {
      const titleContainer = document.createElement('div');
      Array.from(titleDiv.childNodes).forEach(node => {
        titleContainer.appendChild(node.cloneNode(true));
      });
      textParts.push(titleContainer);
    }
    let textCell;
    if (textParts.length === 1) {
      textCell = textParts[0];
    } else if (textParts.length > 1) {
      const div = document.createElement('div');
      textParts.forEach(part => div.appendChild(part));
      textCell = div;
    } else {
      textCell = '';
    }
    // Push each card row as a 2-column row
    rows.push([imageEl, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
