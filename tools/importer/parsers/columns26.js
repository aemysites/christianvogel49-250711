/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must contain exactly one cell (one column), matching the example
  const headerRow = ['Columns (columns26)'];

  // Find the smart-link group containing the links, which are the visible columns
  const group = element.querySelector('.smart-link-group');
  if (!group) return;

  // Each direct child anchor in the group becomes a column
  const links = Array.from(group.querySelectorAll('a.smart-link'));
  if (links.length === 0) return;

  // The content row should have as many columns as there are links, each is a cell
  const contentRow = links;

  // Compose the cells array so the first row (header) is always a single cell
  // and the second row has N columns (one per link)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the table and replace the original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
