/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as in the example
  const cells = [['Cards (cards51)']];

  // Find all cards in the gallery
  const galleryList = element.querySelector('.documents-gallery');
  if (galleryList) {
    const cards = galleryList.querySelectorAll(':scope > .document-tile');
    cards.forEach((card) => {
      // --- First column: card image ---
      let imgCell = null;
      const imgLink = card.querySelector('.document-tile--image');
      if (imgLink) {
        const img = imgLink.querySelector('img');
        if (img) imgCell = img;
      }
      
      // --- Second column: card text and CTA ---
      let textCellContent = [];
      const textDiv = card.querySelector('.document-tile--text');
      if (textDiv) {
        const link = textDiv.querySelector('a'); // main link with title & description
        if (link) {
          // Title
          const titleDiv = link.querySelector('.document-tile--title');
          if (titleDiv) {
            const strong = document.createElement('strong');
            strong.textContent = titleDiv.textContent.trim();
            textCellContent.push(strong);
          }
          // Description (date+type)
          const descDiv = link.querySelector('.document-tile--description');
          if (descDiv) {
            textCellContent.push(document.createElement('br'));
            descDiv.childNodes.forEach((node) => {
              if (node.nodeType === 1) {
                textCellContent.push(node);
              } else if (node.nodeType === 3 && node.textContent.trim()) {
                textCellContent.push(document.createTextNode(node.textContent.trim()));
              }
            });
          }
          // CTA: PDF download link
          if (link.href) {
            textCellContent.push(document.createElement('br'));
            const cta = document.createElement('a');
            cta.href = link.href;
            cta.textContent = 'PDF herunterladen';
            cta.target = '_blank';
            textCellContent.push(cta);
          }
        }
        // Edge case: If no .document-tile--title or .document-tile--description, fallback to all text
        if (textCellContent.length === 0 && textDiv.textContent.trim()) {
          textCellContent = [textDiv.textContent.trim()];
        }
      } else if (card.textContent.trim()) {
        // Fallback: take all text in card
        textCellContent = [card.textContent.trim()];
      }
      // Only add card row if both columns have content
      if (imgCell && textCellContent.length) {
        cells.push([imgCell, textCellContent]);
      }
    });
  }
  // Create and replace with block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
