/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero123)'];

  // Find the FIRST <img> in the element (background image)
  let imgElem = element.querySelector('img');
  let imageRow = imgElem ? [imgElem] : [''];

  // Find headline (usually h2 inside page-item--headline)
  let headlineElem = element.querySelector('.page-item--headline h2');
  // Find intro text div (contains <p>), inside .intro-text--text
  let introTextElem = element.querySelector('.intro-text--text');
  // Find tag list (optional)
  let tagsElem = element.querySelector('.intro-text--tags');

  // Compose content for the main text cell (middle row)
  let cellContent = [];
  if (headlineElem) cellContent.push(headlineElem);
  if (introTextElem) cellContent.push(introTextElem);
  if (tagsElem) cellContent.push(tagsElem);
  if (cellContent.length === 0) cellContent = [''];
  let contentRow = [cellContent];

  // Compose and replace with table
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
