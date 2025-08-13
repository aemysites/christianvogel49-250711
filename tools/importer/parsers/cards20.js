/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must have exactly one column
  const headerRow = ['Cards (cards20)'];

  // Parse all cards (columns)
  const columnItems = element.querySelectorAll('.for-column-items > .page-item--column');
  const rows = [];
  columnItems.forEach((col) => {
    const teaser = col.querySelector('.page-item--teaser a.teaser, .page-item--teaser a');
    if (!teaser) return;
    // Image or icon cell
    let imageCell = '';
    const teaserImage = teaser.querySelector('.teaser--image img');
    if (teaserImage) {
      imageCell = teaserImage;
    } else {
      const icon = teaser.querySelector('.teaser--icon, .icon');
      if (icon) imageCell = icon;
    }
    // Text cell: strong title wrapped in a link
    let textCell = '';
    const titleDiv = teaser.querySelector('.teaser--title');
    if (titleDiv) {
      const titleText = Array.from(titleDiv.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
        .map((node) => node.textContent.trim())
        .join(' ');
      if (titleText) {
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        if (teaser.href) {
          const link = document.createElement('a');
          link.href = teaser.href;
          link.appendChild(strong);
          textCell = link;
        } else {
          textCell = strong;
        }
      }
      // Preserve icons inside title (e.g., arrow)
      const iconInsideTitle = titleDiv.querySelector('.teaser--icon, .icon');
      if (iconInsideTitle) {
        if (typeof textCell === 'string') textCell = document.createElement('span');
        textCell.appendChild(iconInsideTitle);
      }
    }
    rows.push([imageCell, textCell]);
  });

  // Table: header row must be a 1-cell row, all others 2 cells
  const tableRows = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
