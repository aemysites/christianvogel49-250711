/* global WebImporter */
export default function parse(element, { document }) {
  // Block header
  const headerRow = ['Cards (cards128)'];
  // Find all columns (cards)
  const columns = element.querySelectorAll(':scope > .container-fluid > .row.for-column-items > .page-item--column');
  const rows = [];
  columns.forEach((col) => {
    // Card main content
    const card = col.querySelector('article.flex-float');
    if (!card) return;
    // Image (first <img> in <figure>)
    let image = null;
    const figure = card.querySelector('figure.flex-float--image');
    if (figure) {
      image = figure.querySelector('img');
    }
    // Right cell: title, description, CTA
    const cellContent = [];
    const title = card.querySelector('.flex-float--title');
    if (title) cellContent.push(title);
    // Find the description paragraph only in the text block
    const textBlock = card.querySelector('.flex-float--text');
    if (textBlock) {
      const p = textBlock.querySelector('p');
      if (p) cellContent.push(p);
      // CTA
      const btnWrap = textBlock.querySelector('.flex-float--button');
      if (btnWrap) {
        const btn = btnWrap.querySelector('a');
        if (btn) cellContent.push(btn);
      }
    }
    rows.push([image, cellContent]);
  });
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
