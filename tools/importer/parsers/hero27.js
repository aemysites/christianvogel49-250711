/* global WebImporter */
export default function parse(element, { document }) {
  // Find the two main columns (image side, text side)
  const columns = element.querySelectorAll('.page-item--column');

  // --- First cell: block header ---
  const headerRow = ['Hero (hero27)'];

  // --- Second cell: background image ---
  let imageEl = null;
  if (columns.length > 0) {
    // Look for an <img> tag inside the first column
    imageEl = columns[0].querySelector('img');
  }
  const imageRow = [imageEl ? imageEl : ''];

  // --- Third cell: content (headline, paragraph, button) ---
  const contentEls = [];
  if (columns.length > 1) {
    const textCol = columns[1];
    // Find the heading (keep the heading tag)
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) contentEls.push(heading);
    // Find the main paragraph (usually in .flex-text--text or p)
    const para = textCol.querySelector('.flex-text--text, p');
    if (para) contentEls.push(para);
    // Find the call-to-action button (look for <a> inside .flex-text--button, .btn etc.)
    const cta = textCol.querySelector('.flex-text--button a, a.btn, a.button');
    if (cta) contentEls.push(cta);
  }
  let contentRow;
  if (contentEls.length === 1) {
    // If there's only one element, just use it directly
    contentRow = [contentEls[0]];
  } else if (contentEls.length > 1) {
    // If multiple, append them all into a fragment
    const frag = document.createDocumentFragment();
    contentEls.forEach(el => frag.appendChild(el));
    contentRow = [frag];
  } else {
    contentRow = [''];
  }

  // Build the table
  const cells = [headerRow, imageRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
