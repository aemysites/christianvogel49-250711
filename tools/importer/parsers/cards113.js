/* global WebImporter */
export default function parse(element, { document }) {
  // Header as per example
  const headerRow = ['Cards (cards113)'];

  // Find the gallery list root
  const galleryTab = element.querySelector('.gallery--tab');
  if (!galleryTab) return;
  const cardsList = galleryTab.querySelector('.documents-gallery.infinite-nodes--list');
  if (!cardsList) return;

  // Collect all document-tile elements (each is a card)
  const cardEls = Array.from(cardsList.querySelectorAll('.document-tile'));
  const cards = cardEls.map(cardEl => {
    // --- IMAGE COLUMN ---
    let imageCell = null;
    const img = cardEl.querySelector('img');
    if (img) imageCell = img;

    // --- TEXT COLUMN ---
    const textCell = document.createElement('div');
    textCell.style.display = 'block';
    const textWrap = cardEl.querySelector('.document-tile--text');
    if (textWrap) {
      // Title, use <strong>, reference existing element content
      const titleDiv = textWrap.querySelector('.document-tile--title');
      if (titleDiv) {
        const strong = document.createElement('strong');
        strong.textContent = titleDiv.textContent.trim();
        textCell.appendChild(strong);
      }
      // Description (date, type), flatten as text
      const descDiv = textWrap.querySelector('.document-tile--description');
      if (descDiv && descDiv.textContent.trim()) {
        textCell.appendChild(document.createElement('br'));
        textCell.appendChild(document.createTextNode(descDiv.textContent.trim()));
      }
      // Download/CTA link: If the title/desc isn't already wrapped in a link, add CTA link if present and visible
      // Use the first <a> directly under .document-tile--text that is NOT just a wrapper for title/desc
      const allLinks = Array.from(textWrap.querySelectorAll('a[href]'));
      const ctaLink = allLinks.find(a => a.textContent.trim() && (!titleDiv || !a.contains(titleDiv)));
      if (ctaLink) {
        textCell.appendChild(document.createElement('br'));
        textCell.appendChild(ctaLink);
      }
    } else {
      // Fallback: use all text content if structure missing
      if (cardEl.textContent.trim()) {
        textCell.textContent = cardEl.textContent.trim();
      }
    }
    return [imageCell, textCell];
  });

  // Compose table
  const cells = [headerRow, ...cards];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
