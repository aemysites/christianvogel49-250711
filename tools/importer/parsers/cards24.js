/* global WebImporter */
export default function parse(element, { document }) {
  // Table header exactly as required
  const headerRow = ['Cards (cards24)'];
  const rows = [];
  // Select all direct children representing cards
  const cardDivs = element.querySelectorAll(':scope > div.masonry--item');
  cardDivs.forEach(cardDiv => {
    // Find the link wrapping the card
    const link = cardDiv.querySelector('a.social-wall-card--link');
    if (!link) return;
    // Get the image element for the first cell
    const img = link.querySelector('.cropped-image img');
    // Construct the text content cell
    const contentDiv = link.querySelector('.social-wall-card--content');
    const cellContent = [];
    if (contentDiv) {
      // Use the LinkedIn label (with icon, time, etc) and post text
      const label = contentDiv.querySelector('.social-wall-card--label');
      if (label) cellContent.push(label);
      const text = contentDiv.querySelector('.social-wall-card--text');
      if (text) cellContent.push(text);
    }
    // Push row with image and text content
    rows.push([
      img,
      cellContent
    ]);
  });
  // Only create table if there are any cards
  if (rows.length) {
    const table = WebImporter.DOMUtils.createTable([
      headerRow,
      ...rows
    ], document);
    element.replaceWith(table);
  }
}
