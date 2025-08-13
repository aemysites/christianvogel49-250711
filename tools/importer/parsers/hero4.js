/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: find the first image that is likely the background
  function findBackgroundImage(el) {
    // Try to find a direct descendant with class .page-item--image and grab its <img>
    const imgItem = el.querySelector('.page-item--image img');
    if (imgItem) return imgItem;
    // Fallback: find the first <img> in the block
    const img = el.querySelector('img');
    if (img) return img;
    return '';
  }

  // Helper: find the main content block with heading, paragraph, and button
  function findContentBlock(el) {
    // Look for section.flex-text
    const section = el.querySelector('section.flex-text');
    if (section) return section;
    // Fallback: grab heading and any following siblings
    const heading = el.querySelector('h1, h2, h3');
    if (heading) {
      const frag = document.createDocumentFragment();
      frag.appendChild(heading);
      let sib = heading.nextElementSibling;
      while (sib) {
        frag.appendChild(sib);
        sib = sib.nextElementSibling;
      }
      return frag;
    }
    // Last fallback: return el
    return el;
  }

  // Table header as specified in the example
  const headerRow = ['Hero (hero4)'];

  // 2nd row: Background Image
  const backgroundImg = findBackgroundImage(element);
  const backgroundRow = [backgroundImg ? backgroundImg : ''];

  // 3rd row: Content (title, subheading, CTA, paragraph)
  const contentBlock = findContentBlock(element);
  const contentRow = [contentBlock ? contentBlock : ''];

  // Compose the table structure
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];

  // Create the table using the provided helper
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element in the DOM with the new block table
  element.replaceWith(table);
}
