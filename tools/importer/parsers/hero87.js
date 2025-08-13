/* global WebImporter */
export default function parse(element, { document }) {
  // Extract the main hero section
  const heroSection = element.querySelector('.full-width-section') || element;

  // Extract image from the left column
  let imgEl = null;
  const leftCol = heroSection.querySelector('.page-item--column.col-sm-4, .page-item--column.column-width-33');
  if (leftCol) {
    const figureImg = leftCol.querySelector('img');
    if (figureImg) imgEl = figureImg;
  }

  // Extract right column with text and CTA
  let rightCol = heroSection.querySelector('.page-item--column.col-sm-6, .page-item--column.column-width-50');

  // Gather text content: Title (h2), CTA (a.btn), Paragraph (p)
  const cellContent = [];
  if (rightCol) {
    // Title
    const title = rightCol.querySelector('h2');
    if (title) cellContent.push(title);
    // Paragraph(s)
    const paragraphs = rightCol.querySelectorAll('p');
    paragraphs.forEach(p => cellContent.push(p));
    // CTA
    const cta = rightCol.querySelector('a.btn, a.btn-default');
    if (cta) cellContent.push(cta);
  }

  // Build table structure
  const cells = [
    ['Hero (hero87)'],
    [imgEl ? imgEl : ''],
    [cellContent.length > 0 ? cellContent : '']
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
