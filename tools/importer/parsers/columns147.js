/* global WebImporter */
export default function parse(element, { document }) {
  // Find the group of smart links
  const group = element.querySelector('.smart-link-group');
  if (!group) return;
  // Get all smart-link <a> elements (columns)
  const links = Array.from(group.querySelectorAll('a.smart-link'));
  if (links.length === 0) return;

  // Header row must be a single cell, regardless of the number of columns
  const headerRow = ['Columns (columns147)'];
  // Content row: each column gets a link element
  const columnsRow = [...links];

  // Table data: header row as single cell, then columns row with correct number of cells
  const tableCells = [headerRow, columnsRow];

  const table = WebImporter.DOMUtils.createTable(tableCells, document);

  element.replaceWith(table);
}
