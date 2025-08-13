/* global WebImporter */
export default function parse(element, { document }) {
  // Find the columns container inside the infobox section
  const columnsRow = element.querySelector('.for-column-items');
  if (!columnsRow) return;
  const columnItems = columnsRow.querySelectorAll(':scope > .page-item--column');
  if (columnItems.length < 2) return;

  // LEFT COLUMN (Image)
  let leftImg = null;
  const leftImgWrap = columnItems[0].querySelector('.page-item--image');
  if (leftImgWrap) {
    leftImg = leftImgWrap.querySelector('img');
  }

  // RIGHT COLUMN (Heading, Button, Text)
  const rightColumn = columnItems[1];
  const flexSection = rightColumn.querySelector('section.flex-text');
  let rightElements = [];
  if (flexSection) {
    // Headline
    const headline = flexSection.querySelector('.flex-text--title');
    if (headline) rightElements.push(headline);
    // Button
    const buttonContainer = flexSection.querySelector('.flex-text--button');
    if (buttonContainer) {
      const button = buttonContainer.querySelector('a');
      if (button) rightElements.push(button);
    }
    // Descriptive text
    const description = flexSection.querySelector('.flex-text--text');
    if (description) rightElements.push(description);
  }

  // Compose table structure
  const headerRow = ['Columns (columns61)'];
  const contentRow = [leftImg ? leftImg : '', rightElements];

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
