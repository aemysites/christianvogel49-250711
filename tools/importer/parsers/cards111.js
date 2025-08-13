/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery section where the document cards are
  const gallerySection = element.querySelector('section.gallery');
  if (!gallerySection) return;
  const docList = gallerySection.querySelector('.documents-gallery');
  if (!docList) return;
  const cards = Array.from(docList.querySelectorAll('.document-tile'));

  // Header row exactly as specified in block info
  const headerRow = ['Cards (cards111)'];
  const rows = [headerRow];

  cards.forEach((card) => {
    // Image cell: get img element inside .document-tile--image
    let img = null;
    const imageLink = card.querySelector('.document-tile--image');
    if (imageLink) {
      img = imageLink.querySelector('img');
    }

    // Text cell: build a semantic block with title, description, and link
    const textCellContent = [];
    // The text content is inside .document-tile--text > a
    const textContainer = card.querySelector('.document-tile--text');
    if (textContainer) {
      const mainLink = textContainer.querySelector('a[href]');
      if (mainLink) {
        // Title
        const titleDiv = mainLink.querySelector('.document-tile--title');
        if (titleDiv && titleDiv.textContent.trim()) {
          const strong = document.createElement('strong');
          strong.textContent = titleDiv.textContent.trim();
          textCellContent.push(strong);
        }
        // Description
        const descriptionDiv = mainLink.querySelector('.document-tile--description');
        if (descriptionDiv) {
          // Copy all children (time, span, etc)
          const descDiv = document.createElement('div');
          Array.from(descriptionDiv.childNodes).forEach((n) => descDiv.appendChild(n.cloneNode(true)));
          textCellContent.push(descDiv);
        }
        // Call to action: link to the document (always present in mainLink)
        // Only add as a separate CTA if the link text is not already used in title
        // In example, there is no explicit CTA, so skip this.
      }
    }

    rows.push([
      img,
      textCellContent.length === 1 ? textCellContent[0] : textCellContent
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}