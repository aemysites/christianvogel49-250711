/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns wrapper row
  const row = element.querySelector('.row.for-column-items');
  if (!row) return;
  // Get immediate columns
  const columns = Array.from(row.children).filter(
    c => c.classList.contains('page-item--column')
  );

  // --- COLUMN 1 ---
  let col1Content = [];
  const col1 = columns.find(c => c.classList.contains('column-width-66'));
  if (col1) {
    // All .text-block paragraphs (main body copy)
    const textBlock = col1.querySelector('.page-item--text .text-block');
    if (textBlock) {
      const ps = textBlock.querySelectorAll('p');
      ps.forEach(p => {
        // Only add if not empty
        if (p.textContent.trim()) col1Content.push(p);
      });
    }
    // All .btn.btn-default links (calls to action)
    const buttonLinks = col1.querySelectorAll('.btn.btn-default');
    buttonLinks.forEach(link => col1Content.push(link));
  }

  // --- COLUMN 2 ---
  let col2Content = [];
  const col2 = columns.find(c => c.classList.contains('column-width-33'));
  if (col2) {
    // Only the main quote and attribution, as seen in the example
    const quoteContainer = col2.querySelector('.quote-container');
    if (quoteContainer) {
      // Grab the blockquote with text (with possible image inside)
      const quoteTextBlock = quoteContainer.querySelector('.quote--text');
      if (quoteTextBlock) col2Content.push(quoteTextBlock);
      // Grab the author/caption
      const figcaption = quoteContainer.querySelector('figcaption');
      if (figcaption) col2Content.push(figcaption);
    }
  }

  // Table header, per the spec
  const headerRow = ['Columns (columns150)'];
  // Table row - columns side by side
  const dataRow = [col1Content, col2Content];

  const cells = [headerRow, dataRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
