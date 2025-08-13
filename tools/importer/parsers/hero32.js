/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Hero (hero32)'];

  // Find .hero--stage (the main container)
  const stage = element.querySelector('.hero--stage');

  // --- Row 2: Background image ---
  let imageRow = ['']; // fallback
  if (stage) {
    const figure = stage.querySelector('figure.hero--image');
    if (figure) {
      const img = figure.querySelector('img');
      if (img) {
        imageRow = [img];
      }
    }
  }
  // fallback: find any img in the block
  if (imageRow[0] === '' || !imageRow[0]) {
    const img = element.querySelector('img');
    if (img) imageRow = [img];
  }

  // --- Row 3: Title and extras ---
  let contentRow = [''];
  if (stage) {
    // Collect title and any other possible content (subheading, CTA)
    const items = [];
    const title = stage.querySelector('h1');
    if (title) items.push(title);
    // If they ever introduce subheading/CTA, they would likely appear as direct children
    // We'll include any direct child of .hero--stage that is not the image/figure or hidden divs
    Array.from(stage.children).forEach(child => {
      // Already handled image/figure and h1
      if (child.tagName === 'FIGURE' || child.tagName === 'H1') return;
      // Ignore hidden technical divs
      if (child.tagName === 'DIV' && child.style.display === 'none') return;
      if (child.tagName === 'DIV' && child.classList.contains('up-can-clean')) return;
      if (child.textContent && child.textContent.trim()) items.push(child);
    });
    if (items.length) {
      // If only one item, put in cell directly, else as array
      contentRow = [items.length === 1 ? items[0] : items];
    }
  }

  // Compose table as per the example: 1 column, 3 rows (header, image, content)
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];

  // Create and replace block
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
