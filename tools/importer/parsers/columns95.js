/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find columns container (.row.for-column-items)
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  // 2. Get immediate column elements
  const columnEls = Array.from(columnsRow.children).filter(
    (child) => child.classList.contains('page-item--column')
  );
  // 3. For each column, extract its main block (image/text/etc), referencing original elements
  const columnsContent = columnEls.map((col) => {
    const innerRow = col.querySelector('.page-row.is-nth-1');
    if (!innerRow) return document.createTextNode('');
    const contentBlock = innerRow.querySelector(':scope > .page-item');
    if (contentBlock) {
      const fig = contentBlock.querySelector(':scope > figure');
      if (fig) return fig;
      const div = contentBlock.querySelector(':scope > div');
      if (div) return div;
      return contentBlock;
    }
    return innerRow.firstElementChild || document.createTextNode('');
  });
  // 4. Build the header row with correct number of columns
  // First cell is 'Columns (columns95)', rest are empty
  const headerRow = ['Columns (columns95)', ...Array(columnsContent.length - 1).fill('')];
  // 5. Compose table and replace original element
  const cells = [headerRow, columnsContent];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
