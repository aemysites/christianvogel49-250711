/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row matches exactly
  const headerRow = ['Columns (columns80)'];

  // 2. Find top-level columns
  const colElems = Array.from(
    element.querySelectorAll('.container-fluid > .row.for-column-items > .page-item--column')
  );
  // Defensive: If columns not found, treat element itself as column
  const leftCol = colElems[0] || element;
  const rightCol = colElems[1] || null;

  // 3. Left column: quote block
  let leftContent = null;
  // Find the quotation block itself
  const quoteItem = leftCol.querySelector('.page-item--quotation');
  if (quoteItem) {
    leftContent = quoteItem;
  } else {
    leftContent = leftCol;
  }

  // 4. Right column: financial block + shares block
  let rightContentArr = [];
  if (rightCol) {
    // Financial report/article block
    const financial = rightCol.querySelector('.page-item--flex');
    if (financial) {
      rightContentArr.push(financial);
    }
    // Shares/prices block
    const shares = rightCol.querySelector('.page-item--share-prices');
    if (shares) {
      rightContentArr.push(shares);
    }
  }
  // Defensive: If nothing found, push rightCol as fallback
  if (rightContentArr.length === 0 && rightCol) {
    rightContentArr.push(rightCol);
  }

  // 5. Construct table cells: two columns, one row after header
  const cells = [
    headerRow,
    [leftContent, rightContentArr]
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // 6. Replace element
  element.replaceWith(block);
}
