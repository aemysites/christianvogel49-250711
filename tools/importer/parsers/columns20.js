/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Convert iframe (non-image) to link
  function iframeToLink(iframe) {
    if (!iframe) return null;
    const src = iframe.getAttribute('src');
    if (!src) return null;
    const a = document.createElement('a');
    a.href = src;
    a.textContent = src;
    return a;
  }

  // Find columns row
  const columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) return;
  const columns = columnsRow.querySelectorAll(':scope > .page-item--column');
  if (columns.length === 0) return;

  // For each column, gather all meaningful content into a cell
  const colCells = [];
  columns.forEach((col) => {
    const contentParts = [];
    // Get all relevant blocks (ignore spacers)
    const blocks = Array.from(col.children).filter(n => !n.classList.contains('page-row-spacer'));
    blocks.forEach((block) => {
      // For <div class="page-row">, get all its items
      if (block.classList.contains('page-row')) {
        Array.from(block.children).forEach((item) => {
          // Headline blocks
          if (item.classList.contains('page-item--headline')) {
            const head = item.querySelector('h1, h2, h3, h4, h5, h6');
            if (head) contentParts.push(head);
          }
          // Text blocks
          else if (item.classList.contains('page-item--text')) {
            Array.from(item.childNodes).forEach((child) => {
              if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
                contentParts.push(child);
              }
            });
          }
          // Markup blocks
          else if (item.classList.contains('page-item--markup')) {
            const iframe = item.querySelector('iframe');
            if (iframe) {
              const link = iframeToLink(iframe);
              if (link) contentParts.push(link);
            }
          }
        });
      } else if (block.classList.contains('page-item--headline')) {
        const head = block.querySelector('h1, h2, h3, h4, h5, h6');
        if (head) contentParts.push(head);
      } else if (block.classList.contains('page-item--text')) {
        Array.from(block.childNodes).forEach((child) => {
          if (child.nodeType === Node.ELEMENT_NODE || (child.nodeType === Node.TEXT_NODE && child.textContent.trim())) {
            contentParts.push(child);
          }
        });
      } else if (block.classList.contains('page-item--markup')) {
        const iframe = block.querySelector('iframe');
        if (iframe) {
          const link = iframeToLink(iframe);
          if (link) contentParts.push(link);
        }
      }
    });
    // Filter out any empty text nodes
    const cleanParts = contentParts.filter((n) =>
      (n.nodeType !== Node.TEXT_NODE) || (n.textContent && n.textContent.trim())
    );
    if (cleanParts.length === 0) {
      colCells.push('');
    } else if (cleanParts.length === 1) {
      colCells.push(cleanParts[0]);
    } else {
      colCells.push(cleanParts);
    }
  });

  // Fix: The header row is a single cell, even if there are multiple columns in the data
  const headerRow = ['Columns (columns20)'];
  const cells = [headerRow, colCells];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
