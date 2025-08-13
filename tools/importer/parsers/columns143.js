/* global WebImporter */
export default function parse(element, { document }) {
  // Find the topic-list section
  const topicListSection = element.querySelector('.topic-list');
  if (!topicListSection) return;
  const ul = topicListSection.querySelector('ul');
  if (!ul) return;

  // Extract all <li> items
  const lis = Array.from(ul.children).filter(child => child.tagName === 'LI');

  // Organize into two columns: 1st and 2nd in col1, 3rd in col2 if available
  // If there are only two, one in each column; if only one, all in first column
  const col1 = document.createElement('ul');
  const col2 = document.createElement('ul');
  if (lis.length === 3) {
    col1.appendChild(lis[0]);
    col1.appendChild(lis[1]);
    col2.appendChild(lis[2]);
  } else if (lis.length === 2) {
    col1.appendChild(lis[0]);
    col2.appendChild(lis[1]);
  } else if (lis.length === 1) {
    col1.appendChild(lis[0]);
  }
  // If no items, do nothing
  if (lis.length === 0) return;

  // Only add columns that have content
  const columns = [];
  if (col1.children.length > 0) columns.push(col1);
  if (col2.children.length > 0) columns.push(col2);

  // Prepare cells for table
  // --- FIX: header row must be single cell, not one per column ---
  const headerRow = ['Columns (columns143)'];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    columns
  ], document);

  element.replaceWith(table);
}
