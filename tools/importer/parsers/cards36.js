/* global WebImporter */
export default function parse(element, { document }) {
  // Get all columns that represent cards
  const cardColumns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row > .page-item--column'));
  // The block table: header row is SINGLE CELL, data rows are [img, text]
  const rows = [ ['Cards (cards36)'] ];

  // Prepare image/text for each card
  let i = 0;
  while (i < cardColumns.length) {
    const col = cardColumns[i];
    const img = col.querySelector('img');
    const hasImg = !!img;
    let textCol = col;
    let textCell;
    // If this column is just an image, next column is the text
    if (hasImg && cardColumns[i+1]) {
      textCol = cardColumns[i+1];
      i++; // Skip next col in next loop
    }
    // Compose text cell (title, desc, cta)
    textCell = document.createElement('div');
    const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
    if (heading) textCell.appendChild(heading);
    const desc = textCol.querySelector('.flex-text--text, p');
    if (desc && !textCell.contains(desc)) textCell.appendChild(desc);
    const cta = textCol.querySelector('a');
    if (cta && !textCell.contains(cta)) textCell.appendChild(cta);
    if (!hasImg && !textCell.hasChildNodes()) {
      i++; // move to next
      continue;
    }
    rows.push([img || '', textCell]);
    i++;
  }
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
