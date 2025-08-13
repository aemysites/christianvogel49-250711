/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example exactly
  const headerRow = ['Cards (cards106)'];
  const rows = [headerRow];

  // Find the documents gallery where cards live
  const galleryTab = element.querySelector('.gallery--tab[tab-content="documents"]');
  if (!galleryTab) return;
  const itemsContainer = galleryTab.querySelector('.documents-gallery');
  if (!itemsContainer) return;
  const cardEls = itemsContainer.querySelectorAll('.document-tile.gallery--item');

  cardEls.forEach(cardEl => {
    // First cell: Image or icon
    let imageEl = '';
    const imgAnchor = cardEl.querySelector('.document-tile--image');
    if (imgAnchor) {
      const img = imgAnchor.querySelector('img');
      if (img) {
        imageEl = img;
      }
    }
    // Second cell: Text content (title, description, CTA)
    // Always reference existing elements, combine content for resilience
    const textWrapper = cardEl.querySelector('.document-tile--text');
    const textCellContent = [];
    if (textWrapper) {
      // Get main text link block if present
      const mainLink = textWrapper.querySelector('a[rel="download"]');
      if (mainLink) {
        // Title (strong)
        const titleEl = mainLink.querySelector('.document-tile--title');
        if (titleEl && titleEl.textContent.trim()) {
          const strong = document.createElement('strong');
          strong.textContent = titleEl.textContent.trim();
          textCellContent.push(strong);
        }
        // Description (span)
        const descEl = mainLink.querySelector('.document-tile--description');
        if (descEl && descEl.textContent.trim()) {
          // Copy description structure, preserve <time> and <span> elements
          textCellContent.push(document.createElement('br'));
          textCellContent.push(descEl);
        }
        // Download CTA
        textCellContent.push(document.createElement('br'));
        const cta = document.createElement('a');
        cta.href = mainLink.href;
        cta.textContent = 'Download';
        cta.target = '_blank';
        cta.rel = 'noopener';
        textCellContent.push(cta);
      } else {
        // Fallback: If no mainLink, use all text content inside textWrapper
        if (textWrapper.textContent.trim()) {
          textCellContent.push(textWrapper.textContent.trim());
        }
      }
    } else {
      // Fallback: If no textWrapper, use all text content in cardEl
      if (cardEl.textContent.trim()) {
        textCellContent.push(cardEl.textContent.trim());
      }
    }
    // Add card row if image or text exists
    rows.push([
      imageEl,
      textCellContent.length ? textCellContent : ''
    ]);
  });

  // Create block table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
