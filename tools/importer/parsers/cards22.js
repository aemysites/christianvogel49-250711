/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards22) block
  const cells = [['Cards (cards22)']];

  // Find the gallery that contains the cards
  const gallery = element.querySelector('.gallery--item-container .documents-gallery');
  if (gallery) {
    const cardElems = gallery.querySelectorAll(':scope > .document-tile.gallery--item');
    cardElems.forEach(card => {
      // First cell: image (mandatory)
      let imgCell = null;
      const imageLink = card.querySelector(':scope > .document-tile--image');
      if (imageLink) {
        const img = imageLink.querySelector('img');
        if (img) imgCell = img;
      }

      // Second cell: text content
      const textContent = [];
      // Title (strong or heading)
      const titleDiv = card.querySelector('.document-tile--title');
      if (titleDiv && titleDiv.textContent.trim()) {
        const titleEl = document.createElement('strong');
        titleEl.textContent = titleDiv.textContent.trim();
        textContent.push(titleEl);
      }

      // Description (date, type, and summary)
      const descDiv = card.querySelector('.document-tile--description');
      if (descDiv) {
        // Gather all date, type, and summary as a flat string
        let descText = '';
        descDiv.childNodes.forEach(node => {
          if (node.nodeType === 1) { // element (time or span)
            descText += node.textContent.trim() + ' ';
          } else if (node.nodeType === 3) { // text node
            descText += node.textContent.trim() + ' ';
          }
        });
        descText = descText.replace(/\s+/g, ' ').trim();
        if (descText) {
          const descP = document.createElement('p');
          descP.textContent = descText;
          textContent.push(descP);
        }
      }

      // Call-to-action: download link (if present)
      // Only include a visible text link; prefer the card's main link.
      const cardMainLink = card.querySelector('.document-tile--text > a[href]');
      if (cardMainLink) {
        // If the link text is empty, add a default label
        const cta = document.createElement('a');
        cta.href = cardMainLink.href;
        cta.textContent = 'Download';
        textContent.push(cta);
      }

      cells.push([imgCell, textContent]);
    });
  }

  // Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
