/* global WebImporter */
export default function parse(element, { document }) {
  // Locate the topic-list section (contains the two columns)
  const topicSection = element.querySelector('section.topic-list');
  if (!topicSection) return;

  const ul = topicSection.querySelector('ul');
  if (!ul) return;

  // Get all <li> items
  const lis = Array.from(ul.querySelectorAll(':scope > li'));
  if (lis.length === 0) return;

  // Split the items as evenly as possible into two columns
  const mid = Math.ceil(lis.length / 2);
  const col1Items = lis.slice(0, mid);
  const col2Items = lis.slice(mid);

  // Create two <ul> elements for each column and reference existing <li>
  const col1Ul = document.createElement('ul');
  col1Items.forEach(li => col1Ul.appendChild(li));
  const col2Ul = document.createElement('ul');
  col2Items.forEach(li => col2Ul.appendChild(li));

  // Compose the table structure with a SINGLE header cell (matches markdown example)
  const cells = [
    ['Columns (columns30)'], // Single header cell in header row
    [col1Ul, col2Ul]         // Two columns for content
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
