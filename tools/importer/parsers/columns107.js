/* global WebImporter */
export default function parse(element, { document }) {
  // Get the two column items
  const columnItems = Array.from(element.querySelectorAll('.page-item--column'));

  // Defensive: if there are not two columns, abort
  if (columnItems.length < 2) return;

  // COLUMN 1 (left): Image
  let leftContent = document.createElement('div');
  const leftCol = columnItems[0];
  // Find the image element within the left column
  const imageItem = leftCol.querySelector('.page-item--image');
  if (imageItem) {
    // Use the entire imageItem element as is
    leftContent.appendChild(imageItem);
  }

  // COLUMN 2 (right): Heading, Button, and Text
  let rightContent = document.createElement('div');
  const rightCol = columnItems[1];
  const flexSection = rightCol.querySelector('section.flex-text');
  if (flexSection) {
    // Heading
    const heading = flexSection.querySelector('.flex-text--title');
    if (heading) rightContent.appendChild(heading);
    // Button
    const buttonDiv = flexSection.querySelector('.flex-text--button');
    if (buttonDiv) rightContent.appendChild(buttonDiv);
    // Text block
    const textBlockDiv = flexSection.querySelector('.flex-text--text');
    if (textBlockDiv) rightContent.appendChild(textBlockDiv);
  }

  // Table construction per spec
  const headerRow = ['Columns (columns107)'];
  const contentRow = [leftContent, rightContent];
  const cells = [headerRow, contentRow];

  // Create table and replace element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
