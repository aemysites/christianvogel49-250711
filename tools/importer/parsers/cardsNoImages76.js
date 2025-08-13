/* global WebImporter */
export default function parse(element, { document }) {
  // Table header: must match example EXACTLY
  const headerRow = ['Cards (cardsNoImages76)'];
  const cells = [headerRow];

  // Find the row of card columns
  const columnsParent = element.querySelector(':scope > .row.for-column-items');
  if (columnsParent) {
    // Each column is a card
    const cardColumns = Array.from(columnsParent.children);
    cardColumns.forEach((col) => {
      // Find the teaser anchor (card link)
      const teaserLink = col.querySelector('a.teaser');
      if (teaserLink) {
        // Find the card title (remove icon if present)
        const teaserTitle = teaserLink.querySelector('.teaser--title');
        let cardTitle = '';
        if (teaserTitle) {
          const icon = teaserTitle.querySelector('.teaser--icon');
          if (icon) icon.remove();
          cardTitle = teaserTitle.textContent.trim();
        } else {
          // fallback: just use link text
          cardTitle = teaserLink.textContent.trim();
        }
        // Create a single element containing all text from teaserTitle
        // If the card contains multiple lines (as in source HTML), preserve them
        // For maximum flexibility, get all text nodes from teaserTitle
        let cardCell = [];
        if (teaserTitle) {
          // Get all child nodes except icon
          Array.from(teaserTitle.childNodes).forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
              const text = node.textContent.trim();
              if (text) {
                // Use strong for the heading
                const heading = document.createElement('strong');
                heading.textContent = text;
                cardCell.push(heading);
              }
            }
          });
        } else {
          // fallback: strong with cardTitle
          const heading = document.createElement('strong');
          heading.textContent = cardTitle;
          cardCell.push(heading);
        }
        // Always add a CTA link (the card itself is a link)
        const link = document.createElement('a');
        link.href = teaserLink.getAttribute('href');
        link.textContent = cardTitle;
        // Add a line break between heading and link
        cardCell.push(document.createElement('br'));
        cardCell.push(link);
        cells.push([cardCell]);
      }
    });
  }
  // Replace with table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
