/* global WebImporter */
export default function parse(element, { document }) {
  // Find the section containing the columns layout
  const section = element.querySelector('.full-width-section');
  if (!section) return;
  const row = section.querySelector('.row.for-column-items');
  if (!row) return;

  // Get both column containers
  const columns = row.querySelectorAll(':scope > .page-item--column');
  if (columns.length < 2) return;

  // Helper to get all content (including text and inline elements) from a column
  function getColumnContent(col) {
    // Find main content container in column (skip spacers)
    const contentRows = Array.from(col.querySelectorAll(':scope > .page-row')).filter(r => !r.className.includes('spacer'));
    let content = [];
    contentRows.forEach(r => {
      // For each child in page-row (should be .page-item), get its first (and usually only) child (the content block)
      Array.from(r.children).forEach(pageItem => {
        // Only consider .page-item elements
        if (pageItem.classList.contains('page-item')) {
          // Grab the first non-spacer child
          for (const child of Array.from(pageItem.children)) {
            if (!child.className || !child.className.includes('spacer')) {
              content.push(child);
            }
          }
        }
      });
    });
    // Fallback: if nothing found, just use the first non-spacer child of the column
    if (content.length === 0) {
      for (const child of Array.from(col.children)) {
        if (!child.className || !child.className.includes('spacer')) {
          content.push(child);
        }
      }
    }
    return content;
  }

  // Column 1: left-side content (video & caption)
  const col1Content = getColumnContent(columns[0]);
  // Column 2: right-side content (heading & text)
  const col2Content = getColumnContent(columns[1]);

  // Build the columns block table
  const cells = [
    ['Columns (columns125)'],
    [col1Content, col2Content]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
