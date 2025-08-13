/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: Must match the example exactly
  const headerRow = ['Hero (hero46)'];

  // 2. Image row: Find the most prominent image in the block
  let imgEl = element.querySelector('img');
  const imageRow = [imgEl ? imgEl : ''];

  // 3. Text row: Extract all headings, paragraphs, and visible text from the element
  //    - Find headings (h1-h6), paragraphs, and any spans with text
  //    - If that's empty, parse up-data attribute as fallback
  let textContent = [];
  // Get all headings and paragraphs
  const textSelectors = 'h1, h2, h3, h4, h5, h6, p, .hero-text, .block-text, .content, .text-content, span';
  Array.from(element.querySelectorAll(textSelectors)).forEach((el) => {
    if (el.textContent.trim()) {
      textContent.push(el);
    }
  });

  // If no normal headings/text, try up-data attribute as fallback (Audi-style blocks)
  if (textContent.length === 0) {
    const upDataEl = element.querySelector('[up-data]');
    if (upDataEl) {
      let upData = upDataEl.getAttribute('up-data');
      if (upData) {
        // Decode HTML entities
        const txt = document.createElement('textarea');
        txt.innerHTML = upData;
        upData = txt.value;
        // Parse as HTML fragment
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = upData;
        Array.from(tempDiv.childNodes).forEach((node) => {
          // Only append nodes with visible text
          if (
            (node.nodeType === 1 && node.textContent.trim()) ||
            (node.nodeType === 3 && node.textContent.trim())
          ) {
            textContent.push(node);
          }
        });
      }
    }
  }

  // Compose the table: header, image, text rows
  const cells = [headerRow, imageRow, [textContent.length ? textContent : '']];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
