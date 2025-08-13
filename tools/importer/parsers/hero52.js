/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row (must exactly match the provided block name)
  const headerRow = ['Hero (hero52)'];

  // 2. Extract main columns: left (text) and right (image)
  const mainColumns = element.querySelectorAll(':scope .for-column-items > .page-item--column');

  // Prepare background image (row 2)
  let imageEl = null;
  if (mainColumns.length > 1) {
    const imgCol = mainColumns[1];
    // Find the first <img> element inside the image column
    imageEl = imgCol.querySelector('img');
  }

  // Prepare headline, CTA, paragraph(s) (row 3)
  let contentEls = [];
  if (mainColumns.length > 0) {
    const textCol = mainColumns[0];
    // Find the section containing the headline and CTA
    const section = textCol.querySelector('section.flex-text');
    if (section) {
      // Headline (h2)
      const headline = section.querySelector('.flex-text--title');
      if (headline) {
        contentEls.push(headline);
      }
      // CTA button (if exists)
      const ctaBtn = section.querySelector('.flex-text--button');
      if (ctaBtn) {
        contentEls.push(ctaBtn);
      }
      // Paragraph(s) and text
      const textBlocks = section.querySelectorAll('.flex-text--text');
      textBlocks.forEach((block) => {
        // Use all child nodes inside the block (preserve formatting)
        block.childNodes.forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'P') {
            contentEls.push(child);
          }
        });
      });
    }
  }

  // Edge cases: ensure we always include 3 rows, even if image or text is missing
  const cells = [
    headerRow,
    [imageEl ? imageEl : ''],
    [contentEls.length > 0 ? contentEls : ''],
  ];

  // Create table and replace element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
