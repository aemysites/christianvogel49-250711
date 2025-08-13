/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <section class="topic-list"> inside the block
  const section = element.querySelector('section.topic-list');
  if (!section) return;

  // Get the <ul> and its <li> children
  const ul = section.querySelector('ul');
  if (!ul) return;
  const liNodes = Array.from(ul.children).filter(n => n.tagName === 'LI');

  // Split for two columns: first 2 items in col1, rest in col2
  const col1Lis = liNodes.slice(0, 2);
  const col2Lis = liNodes.slice(2);

  // Only create <ul> if there are items
  let col1Content = '';
  if (col1Lis.length > 0) {
    const col1Ul = document.createElement('ul');
    col1Lis.forEach(li => col1Ul.appendChild(li));
    col1Content = col1Ul;
  }

  let col2Content = '';
  if (col2Lis.length > 0) {
    const col2Ul = document.createElement('ul');
    col2Lis.forEach(li => col2Ul.appendChild(li));
    col2Content = col2Ul;
  }

  // Ensure header row is always a single cell (one column)
  const tableRows = [
    ['Columns (columns16)'],
    [col1Content, col2Content]
  ];

  // Create and replace block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  // Set the first row to have only one <th> (colspan)
  const headerTr = block.querySelector('tr');
  if (headerTr && headerTr.children.length === 1 && block.rows.length > 1) {
    headerTr.children[0].setAttribute('colspan', block.rows[1].children.length);
  }
  element.replaceWith(block);
}
