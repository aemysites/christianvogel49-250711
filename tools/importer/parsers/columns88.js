/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main columns container
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;

  // 2. Find immediate column items (left and right columns)
  const columnDivs = Array.from(columnsRow.children).filter(child => child.classList.contains('page-item--column'));
  if (columnDivs.length < 2) return;

  // 3. Extract left column content
  const leftCol = columnDivs[0];
  const leftRows = Array.from(leftCol.querySelectorAll(':scope > .page-row'));
  // Find text block inside left column
  let leftContent = null;
  for (const row of leftRows) {
    const textBlock = row.querySelector('.page-item--text .text-block');
    if (textBlock) {
      leftContent = textBlock;
      break;
    }
  }
  // Fallback if not found
  if (!leftContent) leftContent = leftCol;

  // 4. Extract right column content (image and quicklinks)
  const rightCol = columnDivs[1];
  const rightRows = Array.from(rightCol.querySelectorAll(':scope > .page-row'));
  let imageBlock = null;
  let quickLinkBlock = null;
  for (const row of rightRows) {
    if (!imageBlock) {
      const imgFigure = row.querySelector('.page-item--image figure');
      if (imgFigure) imageBlock = imgFigure;
    }
    if (!quickLinkBlock) {
      const quicklinks = row.querySelector('.page-item--quicklink-list .quicklink-list');
      if (quicklinks) quickLinkBlock = quicklinks;
    }
  }
  // Compose right column content
  // If both found, array, else just the one found, else fallback
  let rightContent;
  if (imageBlock && quickLinkBlock) {
    rightContent = [imageBlock, quickLinkBlock];
  } else if (imageBlock) {
    rightContent = imageBlock;
  } else if (quickLinkBlock) {
    rightContent = quickLinkBlock;
  } else {
    rightContent = rightCol;
  }

  // 5. Create the table structure
  const headerRow = ['Columns (columns88)'];
  const dataRow = [leftContent, rightContent];
  const cells = [headerRow, dataRow];

  // 6. Replace the element with the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
