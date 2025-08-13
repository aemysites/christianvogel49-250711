/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row as required by the block
  const headerRow = ['Search'];

  // Dynamically extract the search input placeholder text
  let placeholder = '';
  let searchInput = element.querySelector('input[type="text"][placeholder]');
  if (searchInput) {
    placeholder = searchInput.getAttribute('placeholder') || '';
  }

  // Dynamically extract all text content from the search block
  // Find the search block
  let searchBlock = element.querySelector('.search');
  // Sometimes, the .search may be wrapped inside .page-item--search
  if (!searchBlock) {
    const searchItem = element.querySelector('.page-item--search');
    if (searchItem) {
      searchBlock = searchItem;
    } else {
      // fallback to container
      searchBlock = element;
    }
  }
  // Reference the search block directly for resilience

  // Compose all relevant content (including text & input placeholder)
  // If needed, can add the placeholder as a paragraph above the block
  let contentElements = [];
  if (placeholder) {
    const para = document.createElement('p');
    para.textContent = placeholder;
    contentElements.push(para);
  }
  contentElements.push(searchBlock);

  // The row should include all text and the visual block
  const rows = [
    headerRow, // header row
    [contentElements] // content row, preserves all text and input semantics
  ];

  // Create the required block table and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
