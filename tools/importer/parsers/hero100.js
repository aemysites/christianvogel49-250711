/* global WebImporter */
export default function parse(element, { document }) {
  // 1. HEADER ROW: Always use the block name EXACTLY as in the example
  const headerRow = ['Hero (hero100)'];

  // 2. Extract background image (row 2)
  // The image is in a figure inside the first .page-item--column
  let imageEl = null;
  const columnItems = element.querySelectorAll(':scope .page-item--column');
  if (columnItems.length > 0) {
    // Try to find a figure with an image in the first column
    const firstCol = columnItems[0];
    const figure = firstCol.querySelector('figure');
    if (figure && figure.querySelector('img')) {
      imageEl = figure;
    } else {
      // fallback: just an img
      const img = firstCol.querySelector('img');
      if (img) imageEl = img;
    }
  }
  // fallback anywhere in the element
  if (!imageEl) {
    const fallbackImg = element.querySelector('figure img')?.closest('figure') || element.querySelector('img');
    if (fallbackImg) imageEl = fallbackImg;
  }

  // 3. Extract content block (row 3)
  // Content is in the second .page-item--column
  let contentElements = [];
  if (columnItems.length > 1) {
    const contentCol = columnItems[1];
    const flexText = contentCol.querySelector('.flex-text');
    if (flexText) {
      // Title (styled as Heading)
      const heading = flexText.querySelector('.flex-text--title');
      if (heading) contentElements.push(heading);
      // CTA (button)
      const btn = flexText.querySelector('.flex-text--button a');
      if (btn) contentElements.push(btn);
      // Text block (paragraphs, subheading, etc)
      const textBlock = flexText.querySelector('.flex-text--text');
      if (textBlock) {
        // Push all direct children (should be <p>, can handle other tags)
        Array.from(textBlock.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            contentElements.push(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            // wrap text node in <p>
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            contentElements.push(p);
          }
        });
      }
    }
  }

  // fallback: search for first .flex-text
  if (contentElements.length === 0) {
    const flexText = element.querySelector('.flex-text');
    if (flexText) {
      // Title
      const heading = flexText.querySelector('.flex-text--title');
      if (heading) contentElements.push(heading);
      // CTA
      const btn = flexText.querySelector('.flex-text--button a');
      if (btn) contentElements.push(btn);
      // Text block
      const textBlock = flexText.querySelector('.flex-text--text');
      if (textBlock) {
        Array.from(textBlock.childNodes).forEach(node => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            contentElements.push(node);
          } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            contentElements.push(p);
          }
        });
      }
    }
  }

  // Ensure no empty rows
  const rows = [
    headerRow,
    imageEl ? [imageEl] : [],
    contentElements.length ? [contentElements] : [],
  ].filter(row => row.length);

  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
