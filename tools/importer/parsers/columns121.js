/* global WebImporter */
export default function parse(element, { document }) {
  // Get the row containing the columns
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;
  const columns = Array.from(row.children).filter(col => col.classList.contains('page-item--column'));
  if (columns.length !== 2) return;

  // --- LEFT COLUMN ---
  const leftColumn = columns[0];
  let leftImg = leftColumn.querySelector('figure.image');
  let leftContent = leftImg ? leftImg : document.createElement('div');

  // --- RIGHT COLUMN: Only quote text and author ---
  const rightColumn = columns[1];
  const quoteFigure = rightColumn.querySelector('figure.quote-container');
  let rightContent = document.createElement('div');
  if (quoteFigure) {
    // Extract only the quote text block (including image) and the figcaption (author)
    const quoteText = quoteFigure.querySelector('blockquote.quote--text');
    const figcaption = quoteFigure.querySelector('figcaption');
    // Append only these elements
    if (quoteText) rightContent.appendChild(quoteText);
    if (figcaption) rightContent.appendChild(figcaption);
  }

  // Table header as in example
  const cells = [
    ['Columns (columns121)'],
    [leftContent, rightContent]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
