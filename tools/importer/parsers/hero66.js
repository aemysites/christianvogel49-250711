/* global WebImporter */
export default function parse(element, { document }) {
  // Ensure the section containing the hero content exists
  const section = element.querySelector('section.flex-text');
  if (!section) return;

  // Extract title (h2)
  const title = section.querySelector('h2');

  // Extract CTA button (may be inside .flex-text--button)
  let cta = null;
  const ctaWrapper = section.querySelector('.flex-text--button');
  if (ctaWrapper) {
    const a = ctaWrapper.querySelector('a');
    if (a) cta = a;
  }

  // Extract date and list information
  const textBlock = section.querySelector('.flex-text--text');
  let contentElements = [];
  if (title) contentElements.push(title);
  if (cta) contentElements.push(cta);
  if (textBlock) {
    // Add all children of textBlock (paragraphs, lists)
    Array.from(textBlock.children).forEach(child => {
      contentElements.push(child);
    });
  }

  // Compose block table
  // First row: header
  // Second row: image (none in this HTML, so blank string)
  // Third row: all content elements
  const cells = [
    ['Hero (hero66)'],
    [''],
    [contentElements]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
