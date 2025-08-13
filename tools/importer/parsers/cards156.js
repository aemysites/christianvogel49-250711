/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery container for cards
  const galleryContainer = element.querySelector('.documents-gallery');
  const cardRows = [];

  if (galleryContainer) {
    const cards = galleryContainer.querySelectorAll('.document-tile');
    cards.forEach(card => {
      // Get image element if present
      let imgElem = null;
      const imageAnchor = card.querySelector('.document-tile--image');
      if (imageAnchor) {
        imgElem = imageAnchor.querySelector('img');
      }

      // Compose the text content cell
      const textCellContents = [];
      const textDiv = card.querySelector('.document-tile--text');
      if (textDiv) {
        // Title
        const titleDiv = textDiv.querySelector('.document-tile--title');
        if (titleDiv) {
          // Use strong for heading
          const strong = document.createElement('strong');
          strong.textContent = titleDiv.textContent.trim();
          textCellContents.push(strong);
        }
        // Description (date and type)
        const descDiv = textDiv.querySelector('.document-tile--description');
        if (descDiv) {
          // Copy all child nodes (date, span, etc), to retain all text
          const descFrag = document.createElement('div');
          Array.from(descDiv.childNodes).forEach(node => descFrag.appendChild(node.cloneNode(true)));
          textCellContents.push(descFrag);
        }
        // CTA: If the outermost .document-tile--text > a[href] exists, include as Download link
        const ctaLink = textDiv.querySelector('a[href]');
        if (ctaLink && ctaLink.href) {
          const linkElem = document.createElement('a');
          linkElem.href = ctaLink.href;
          linkElem.textContent = 'Download';
          linkElem.target = '_blank';
          textCellContents.push(linkElem);
        }
      }
      // Fallback: if no text content, use full text
      if (textCellContents.length === 0 && textDiv) {
        textCellContents.push(textDiv.textContent.trim());
      }
      cardRows.push([
        imgElem,
        textCellContents
      ]);
    });
  }

  // Table header from example: Cards (cards156)
  const cells = [
    ['Cards (cards156)'],
    ...cardRows
  ];

  // Create block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
