/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row
  const headerRow = ['Columns (columns144)'];

  // Find the columns container
  const columnsContainer = element.querySelector('.container-fluid .row.for-column-items');
  if (!columnsContainer) return;

  // Get all direct column elements
  const columnElems = Array.from(columnsContainer.children).filter((col) => col.classList.contains('page-item--column'));

  // For each column, extract its main content
  const columns = columnElems.map((col) => {
    // Look for the first inner content wrapper
    const innerRow = col.querySelector('.page-row.is-nth-1');
    if (!innerRow) return '';

    // Find the actual content block inside the innerRow
    // This could be text, image, etc.
    // We'll use the whole content block for flexibility
    const pageItem = innerRow.querySelector('.page-item');
    if (!pageItem) return '';

    // For images, grab the <figure> (for image semantics)
    if (pageItem.classList.contains('page-item--image')) {
      const figure = pageItem.querySelector('figure');
      if (figure) return figure;
    }
    // For text, grab the text block (preserving headings, paragraphs, etc)
    if (pageItem.classList.contains('page-item--text')) {
      const textBlock = pageItem.querySelector('.text-block');
      if (textBlock) return textBlock;
    }
    // Fallback: use pageItem itself
    return pageItem;
  });

  // Only create a row if at least one column has content
  if (columns.length === 0) return;

  const cells = [
    headerRow,
    columns
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
