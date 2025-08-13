/* global WebImporter */
export default function parse(element, { document }) {
  // Check for .text-block, which is the column block
  const textBlock = element.querySelector('.text-block');
  if (!textBlock) return;

  // Get all <p> children - each is a country+link row
  const paragraphs = Array.from(textBlock.querySelectorAll('p'));
  if (paragraphs.length === 0) return;

  // Split paragraphs into two columns, as visually rendered by CSS column-count: 2
  const mid = Math.ceil(paragraphs.length / 2);
  const leftCol = paragraphs.slice(0, mid);
  const rightCol = paragraphs.slice(mid);

  // Reference the existing <p> elements in the cells
  const leftCell = document.createElement('div');
  leftCol.forEach(p => leftCell.appendChild(p));

  const rightCell = document.createElement('div');
  rightCol.forEach(p => rightCell.appendChild(p));

  // Table header row exactly as specified
  const headerRow = ['Columns (columns48)'];

  // Table content row
  const contentRow = [leftCell, rightCell];

  // Assemble the table
  const cells = [headerRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
