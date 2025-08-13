/* global WebImporter */
export default function parse(element, { document }) {
  // Find the tiles container
  const tilesContainer = element.querySelector('.horizontal-scroll-page-list--tiles');
  if (!tilesContainer) return;
  const cards = Array.from(tilesContainer.children).filter(el => el.classList.contains('image-tile'));

  const rows = [['Cards (cards83)']];

  cards.forEach(card => {
    // IMAGE cell: Reference the actual <img> element
    let imageCell = '';
    const imageWrapper = card.querySelector('.image-tile--image');
    if (imageWrapper && imageWrapper.querySelector('img')) {
      imageCell = imageWrapper.querySelector('img');
    }

    // TEXT cell: Collect badge (date, type), title, and ensure all text is present
    const textContent = document.createElement('div');

    // Badge (date and possibly type)
    const badge = card.querySelector('.image-tile--badge');
    if (badge) {
      // Copy all direct children of badge (e.g., <time>, <span>...)
      Array.from(badge.children).forEach(child => {
        textContent.appendChild(child.cloneNode(true));
      });
    }

    // Title (always present)
    const titleDiv = card.querySelector('.image-tile--title-below-image');
    if (titleDiv) {
      // Use <strong> for clear heading (for visual hierarchy)
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      textContent.appendChild(strong);
    }

    // No explicit description in this source HTML; all text comes from titleDiv and badge
    // Add CTA link if href is present
    const href = card.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = href.startsWith('/') ? 'Mehr erfahren' : href;
      // (Optionally, you may want to translate or use the actual link text if available)
      textContent.appendChild(link);
    }

    rows.push([
      imageCell,
      textContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
