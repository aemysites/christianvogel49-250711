/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match example
  const headerRow = ['Columns (columns74)'];

  // Get direct column elements (ensure only columns at the root are grabbed)
  const columns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row.for-column-items > .page-item--column'));

  // Compose columns content (each cell for the columns row)
  const columnsRow = columns.map((columnEl) => {
    const content = [];
    // Only immediate page-rows within this column
    const pageRows = Array.from(columnEl.querySelectorAll(':scope > .page-row'));
    pageRows.forEach((rowEl) => {
      // Check for headline (e.g. h2)
      const headline = rowEl.querySelector('.page-item--headline h2');
      if (headline) content.push(headline);
      // Check for text blocks (e.g. lists)
      const textBlock = rowEl.querySelector('.text-block');
      if (textBlock) content.push(textBlock);
      // Check for markup blocks (e.g. iframe)
      const markup = rowEl.querySelector('.page-item--markup');
      if (markup) {
        const iframe = markup.querySelector('iframe[src]');
        if (iframe) {
          const link = document.createElement('a');
          link.href = iframe.src;
          link.textContent = iframe.title || 'Preview';
          content.push(link);
        }
      }
    });
    // If only one content element, return it directly; if several, return array
    if (content.length === 0) return '';
    if (content.length === 1) return content[0];
    return content;
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columnsRow
  ], document);

  // Replace original element with our block table
  element.replaceWith(table);
}
