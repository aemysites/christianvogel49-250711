/* global WebImporter */
export default function parse(element, { document }) {
  // Header row must be a SINGLE column, per spec/example
  const headerRow = ['Cards (cards145)'];
  const cells = [headerRow];

  // Extract all card-like feature blocks
  const cardSections = Array.from(element.querySelectorAll('.page-item.page-item--flex'));
  cardSections.forEach((section) => {
    let imageCell = null;
    const figure = section.querySelector('figure');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) imageCell = img;
    }
    const textCell = [];
    const title = section.querySelector('.flex-float--title');
    if (title) textCell.push(title);
    const descBlock = section.querySelector('.flex-float--text.text-block');
    if (descBlock) {
      Array.from(descBlock.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (!node.classList.contains('flex-float--button')) {
            textCell.push(node);
          }
        } else if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent.trim()) {
            textCell.push(document.createTextNode(node.textContent));
          }
        }
      });
      const ctaBtn = descBlock.querySelector('.flex-float--button a');
      if (ctaBtn) textCell.push(ctaBtn);
    }
    if (imageCell && textCell.length) {
      cells.push([imageCell, textCell]); // EACH ROW IS AN ARRAY OF TWO CELLS
    }
  });

  // Teaser cards (bottom)
  const teaserCards = Array.from(element.querySelectorAll('.page-item--teaser'));
  teaserCards.forEach((teaser) => {
    const imageCell = teaser.querySelector('img');
    const textCell = [];
    const teaserTitle = teaser.querySelector('.teaser--title');
    if (teaserTitle) {
      const strong = document.createElement('strong');
      strong.textContent = teaserTitle.textContent;
      textCell.push(strong);
    }
    const link = teaser.closest('a.teaser') || teaser.querySelector('a.teaser');
    if (link) textCell.push(link);
    if (imageCell && textCell.length) {
      cells.push([imageCell, textCell]);
    }
  });

  // Fix: use header row with one column, all subsequent card rows with two columns
  // This matches the requirement: [['Cards (cards145)'], [img, text], ...]
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
