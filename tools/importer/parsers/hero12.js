/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: match the example exactly
  const headerRow = ['Hero (hero12)'];

  // 2. Image row: find the main image in the hero--image figure
  let imageEl = null;
  const stage = element.querySelector('.hero--stage');
  if (stage) {
    const figure = stage.querySelector('.hero--image');
    if (figure) {
      imageEl = figure.querySelector('img');
    }
  }
  const imageRow = [imageEl ? imageEl : ''];

  // 3. Content row: headline, smart links
  const contentArr = [];
  // Headline (h1)
  if (stage) {
    const h1 = stage.querySelector('h1');
    if (h1) contentArr.push(h1);
  }
  // Smart links (if present)
  const smartLinksBlock = element.querySelector('.hero--smart-links');
  if (smartLinksBlock) {
    // Find all smart-link <a> elements
    const aEls = Array.from(smartLinksBlock.querySelectorAll('a.smart-link'));
    if (aEls.length > 0) {
      // Group all CTAs in a div
      const ctaDiv = document.createElement('div');
      aEls.forEach(a => ctaDiv.appendChild(a));
      contentArr.push(ctaDiv);
    }
  }
  const contentRow = [contentArr.length > 0 ? contentArr : ''];

  // Compose table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}
