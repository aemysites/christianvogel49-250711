/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match the example exactly
  const headerRow = ['Cards (cards63)'];
  // Find all direct card columns
  const cardColumns = Array.from(element.querySelectorAll(':scope .page-item--column'));

  const rows = cardColumns.map((col) => {
    // Each card column contains a teaser
    const teaser = col.querySelector('.page-item--teaser');
    if (!teaser) return null;

    // Attempt to find an image in teaser
    let img = null;
    const teaserImg = teaser.querySelector('.teaser--image img');
    if (teaserImg) {
      img = teaserImg;
    }

    // Build text cell
    let textContent = '';
    const titleDiv = teaser.querySelector('.teaser--title');
    if (titleDiv) {
      // Remove any icon content (in Berichte card)
      let titleText = '';
      titleDiv.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          titleText += node.textContent;
        }
      });
      titleText = titleText.trim();
      if (titleText) {
        // If there is only a title, use a <strong> element
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        textContent = strong;
      }
    }
    // Compose row: [image or empty string, textContent (as element or empty string)]
    return [img || '', textContent];
  }).filter(Boolean);

  // Compose the final cells array
  const cells = [headerRow, ...rows];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element
  element.replaceWith(block);
}
