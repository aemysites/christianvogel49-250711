/* global WebImporter */
export default function parse(element, { document }) {
  // Find all columns representing cards
  const columnItems = element.querySelectorAll('.for-column-items > .page-item--column');

  const rows = [['Cards (cards82)']]; // header row

  columnItems.forEach((col) => {
    // --- Image/Icon cell ---
    const figure = col.querySelector('figure.image');
    let imageCell = null;
    if (figure) {
      // Clone figure and remove figcaption to keep only image in first cell
      const newFig = figure.cloneNode(true);
      const fc = newFig.querySelector('figcaption');
      if (fc) fc.remove();
      imageCell = newFig;
    }

    // --- Textual content cell ---
    let textCell = '';
    if (figure) {
      const caption = figure.querySelector('.image--caption');
      if (caption) {
        const cap = caption.textContent.trim();
        // Split into title/description at the first dash
        let dashIndex = cap.indexOf(' - ');
        let frag = document.createDocumentFragment();
        if (dashIndex > -1) {
          // Title: before dash, Description: after dash
          const titleText = cap.substring(0, dashIndex);
          const descText = cap.substring(dashIndex + 3);
          const strong = document.createElement('strong');
          strong.textContent = titleText;
          frag.appendChild(strong);
          if (descText && descText.trim()) {
            frag.appendChild(document.createElement('br'));
            const desc = document.createTextNode(descText);
            frag.appendChild(desc);
          }
        } else {
          // No dash, treat all as title
          const strong = document.createElement('strong');
          strong.textContent = cap;
          frag.appendChild(strong);
        }
        textCell = frag;
      }
    }
    rows.push([imageCell, textCell]);
  });

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
