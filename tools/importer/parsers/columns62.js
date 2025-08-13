/* global WebImporter */
export default function parse(element, { document }) {
  // Select both column blocks
  const columns = element.querySelectorAll('.for-column-items > .page-item--column');
  if (columns.length < 2) return;

  // For left column: grab all children inside the first column's content wrapper
  let leftColumnContent = [];
  const leftContentWrapper = columns[0];
  // Find the primary content (quotation block)
  const quotation = leftContentWrapper.querySelector('.page-item--quotation');
  if (quotation) {
    leftColumnContent.push(quotation);
  }

  // For right column: grab all children inside the second column's content wrapper
  let rightColumnContent = [];
  const rightContentWrapper = columns[1];
  // Find the primary image figure
  const figure = rightContentWrapper.querySelector('figure');
  if (figure) {
    rightColumnContent.push(figure);
  }

  // Header row: single cell
  const headerRow = ['Columns (columns62)'];
  // Content row: two cells, one for each column
  const contentRow = [leftColumnContent, rightColumnContent];

  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
