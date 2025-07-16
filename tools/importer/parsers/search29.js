/* global WebImporter */
export default function parse(element, { document }) {
  // Create header row as shown in example
  const cells = [['Search']];
  
  // The example's second row is:
  // [ absolute search index URL ]
  // But the spec says to reference relevant content from the input element.
  // Since the search block is only an input, and the example only includes the index URL,
  // we must only output the link to the search index in the block, even if more content exists visually below.
  
  // Create the search index link element
  const searchIndexURL = 'https://main--helix-block-collection--adobe.hlx.page/block-collection/sample-search-data/query-index.json';
  const link = document.createElement('a');
  link.href = searchIndexURL;
  link.textContent = searchIndexURL;
  
  // Only the link goes in the cell, as in example (no other text or content)
  cells.push([link]);
  
  // Build and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
