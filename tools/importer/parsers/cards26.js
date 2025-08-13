/* global WebImporter */
export default function parse(element, { document }) {
  // The header row should be a single cell array as per spec
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find the section containing the teasers/cards
  const section = element.querySelector('.full-width-section');
  if (section) {
    // Each teaser/card must be a separate row, with two cells: [image, text]
    const teasers = section.querySelectorAll('.page-item--teaser');
    teasers.forEach(teaser => {
      // --- IMAGE CELL ---
      const imgEl = teaser.querySelector('img');

      // --- TEXT CELL ---
      // Gather all text content from the teaser (title and any other text)
      const textCell = [];
      const title = teaser.querySelector('.teaser--title');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.push(strong);
      }
      // Defensive: include any additional text nodes
      Array.from(teaser.childNodes).forEach(node => {
        if (
          node.nodeType === Node.TEXT_NODE &&
          node.textContent.trim() &&
          (!title || node.textContent.trim() !== title.textContent.trim())
        ) {
          textCell.push(document.createTextNode(node.textContent.trim()));
        }
      });
      rows.push([
        imgEl,
        textCell.length ? textCell : ''
      ]);
    });
  }
  // Replace the original element with the block table if there are cards
  if (rows.length > 1) {
    const block = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(block);
  }
}
