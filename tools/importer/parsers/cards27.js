/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards27)'];
  const cells = [headerRow];
  // Each card is a direct child .image-tile.images-gallery--image
  const cardDivs = element.querySelectorAll(':scope > .image-tile.images-gallery--image');
  cardDivs.forEach(cardDiv => {
    // 1st column: image (reference existing img element)
    const img = cardDiv.querySelector('img');
    // 2nd column: all relevant text content
    let textContentArr = [];
    // Title: from .image-tile-overlay--info (with markup preserved, wrapped in <strong>)
    const infoDiv = cardDiv.querySelector('.image-tile-overlay--info');
    if (infoDiv) {
      const strong = document.createElement('strong');
      strong.innerHTML = infoDiv.innerHTML;
      textContentArr.push(strong);
    }
    // Consumption/description (for cards with spec details)
    const consumptionWrapper = cardDiv.querySelector('.consumption-wrapper[consumption-data]');
    if (consumptionWrapper) {
      const upData = consumptionWrapper.getAttribute('up-data');
      if (upData) {
        // decode HTML entities and preserve structure if any
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = upData;
        // If tempDiv has childNodes, append them all
        tempDiv.childNodes.forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            textContentArr.push(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            textContentArr.push(p);
          }
        });
      }
    }
    // Fallback: If no infoDiv or consumption-data, use aria-label
    if (textContentArr.length === 0) {
      const maximizeLink = cardDiv.querySelector('.image-tile-overlay a[aria-label]');
      if (maximizeLink) {
        const strong = document.createElement('strong');
        strong.textContent = maximizeLink.getAttribute('aria-label');
        textContentArr.push(strong);
      }
    }
    // Push only if image and text
    if (img && textContentArr.length > 0) {
      cells.push([img, textContentArr]);
    }
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
