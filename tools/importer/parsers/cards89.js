/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header row as a single cell
  const headerRow = ['Cards (cards89)'];

  // Find all immediate card columns
  const cardColumns = element.querySelectorAll('.for-column-items > .page-item--column');
  const rows = [];

  cardColumns.forEach((col) => {
    // Find the teaser inside each column
    const teaser = col.querySelector('.page-item--teaser');
    if (!teaser) return;
    const a = teaser.querySelector('a.teaser');

    // IMAGE or ICON (first cell)
    let imageOrIcon = '';
    const imageDiv = a ? a.querySelector('.teaser--image') : null;
    if (imageDiv) {
      const img = imageDiv.querySelector('img');
      if (img) {
        imageOrIcon = img;
      }
    } else {
      // Check for icon inside the title
      const titleDiv = a ? a.querySelector('.teaser--title') : null;
      if (titleDiv) {
        const icon = titleDiv.querySelector('.teaser--icon');
        if (icon) {
          imageOrIcon = icon;
        }
      }
    }

    // TEXT (second cell)
    const titleDiv = a ? a.querySelector('.teaser--title') : null;
    let textCell = '';
    if (titleDiv) {
      // Remove .teaser--icon from the title so it does not appear in the text
      const icon = titleDiv.querySelector('.teaser--icon');
      if (icon) icon.remove();
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      if (a && a.href) {
        const link = document.createElement('a');
        link.href = a.href;
        link.append(strong);
        textCell = link;
      } else {
        textCell = strong;
      }
    }
    rows.push([imageOrIcon || '', textCell || '']);
  });

  // Create a single-cell header row, then all card rows as two-cell rows
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
