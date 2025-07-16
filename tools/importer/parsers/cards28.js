/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: matches example, single cell
  const cells = [['Cards (cards28)']];

  // Find card columns
  let columns = element.querySelectorAll(':scope > .row > .page-item--column, :scope > .page-item--column');
  if (!columns.length) {
    columns = element.querySelectorAll('.page-item--column');
  }

  columns.forEach((col) => {
    const teaser = col.querySelector('.page-item--teaser a.teaser');
    if (!teaser) return;

    // Image: prefer img, fallback to video poster
    let imageElement = teaser.querySelector('.teaser--image img');
    if (!imageElement) {
      const video = teaser.querySelector('video');
      if (video && video.poster) {
        const posterImg = document.createElement('img');
        posterImg.src = video.poster;
        posterImg.alt = '';
        imageElement = posterImg;
      }
    }

    // --- TEXT CONTENT (title + description) ---
    const textContainer = document.createElement('div');
    // Title
    const title = teaser.querySelector('.teaser--title');
    if (title) {
      const strong = document.createElement('strong');
      strong.textContent = title.textContent.trim();
      if (teaser.href) {
        const a = document.createElement('a');
        a.href = teaser.href;
        a.appendChild(strong);
        textContainer.appendChild(a);
      } else {
        textContainer.appendChild(strong);
      }
    }
    // Description: Any other text nodes or elements that are not .teaser--image or .teaser--title
    // This ensures we include extra description if present in future cards
    Array.from(teaser.childNodes).forEach((node) => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        // Text node, not empty
        const p = document.createElement('p');
        p.textContent = node.textContent.trim();
        textContainer.appendChild(p);
      } else if (
        node.nodeType === 1 &&
        !node.classList.contains('teaser--image') &&
        !node.classList.contains('teaser--title')
      ) {
        if (node.tagName === 'P' || node.tagName === 'DIV') {
          textContainer.appendChild(node);
        } else if (node.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = node.textContent.trim();
          textContainer.appendChild(p);
        }
      }
    });

    // Add card row: two columns (image, text)
    cells.push([
      imageElement || '',
      textContainer
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
