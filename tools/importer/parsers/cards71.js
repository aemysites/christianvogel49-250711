/* global WebImporter */
export default function parse(element, { document }) {
  // Find all card elements
  const tiles = element.querySelectorAll('.document-tile');

  // Table header: EXACT match with example
  const headerRow = ['Cards (cards71)'];
  const rows = [headerRow];

  tiles.forEach(tile => {
    // --- IMAGE ---
    let imageEl = null;
    const imageLink = tile.querySelector('.document-tile--image');
    if (imageLink) {
      // Reference image directly (not clone)
      imageEl = imageLink.querySelector('img');
    }

    // --- TEXT CONTENT ---
    const textBlock = tile.querySelector('.document-tile--text');
    // Compose cell content as array
    const textCellContent = [];
    if (textBlock) {
      // Main text link (the card link)
      const mainLink = textBlock.querySelector('a[href]');
      if (mainLink) {
        // Title
        const titleDiv = mainLink.querySelector('.document-tile--title');
        if (titleDiv) {
          // Use <strong> for bold title (preserving semantic weight)
          const strong = document.createElement('strong');
          strong.textContent = titleDiv.textContent.trim();
          textCellContent.push(strong);
        }
        // Description
        const descDiv = mainLink.querySelector('.document-tile--description');
        if (descDiv) {
          // Reference the existing description element directly
          textCellContent.push(descDiv);
        }
        // The mainLink itself is not needed as CTA since all text is present above
      }
    }
    // If no title or description, fallback to empty string for that cell
    if (textCellContent.length === 0) {
      textCellContent.push('');
    }

    // Each card row: [image, text content]
    rows.push([imageEl, textCellContent]);
  });

  // Create the cards block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
