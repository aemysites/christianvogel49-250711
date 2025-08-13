/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in example
  const headerRow = ['Cards (cards34)'];

  // Always a single card in this context
  const card = element;

  // Image: reference the existing <img> element if present
  const image = card.querySelector('img') || '';

  // Gather all relevant text content in order: badge, title, intro
  const fragments = [];

  // Badge (date and label)
  const badge = card.querySelector('.vertical-page-list-item--badge');
  if (badge) {
    // Reference existing badge element for full fidelity (date + type)
    fragments.push(badge);
  }

  // Title (as <strong> for emphasis, matching semantic intent)
  const title = card.querySelector('.vertical-page-list-item--title');
  if (title && title.textContent.trim()) {
    const strong = document.createElement('strong');
    strong.textContent = title.textContent.trim();
    fragments.push(strong);
  }

  // Intro/Description
  const intro = card.querySelector('.vertical-page-list-item--intro');
  if (intro && intro.textContent.trim()) {
    // Reference the existing intro element to preserve structure
    fragments.push(intro);
  }

  // Compose the text cell, ensuring all content/order is preserved
  const textCell = fragments.length > 1 ? fragments : (fragments[0] || '');

  // Build the rows: header, then the card row
  const rows = [headerRow, [image, textCell]];

  // Replace the element with the structured table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
