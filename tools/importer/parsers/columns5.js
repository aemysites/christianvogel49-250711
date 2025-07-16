/* global WebImporter */
export default function parse(element, { document }) {
  function getImmediateChild(parent, selector) {
    for (const el of parent.children) {
      if (el.matches(selector)) return el;
    }
    return null;
  }

  const headContainer = element.querySelector('.page-head-container');
  if (!headContainer) return;

  const textCol = getImmediateChild(headContainer, '.page-head-container--text');
  const imageCol = getImmediateChild(headContainer, '.page-head-container--image');

  // Build left column: all content in --text
  let leftColContent = [];
  if (textCol) {
    const pageHead = textCol.querySelector('.page-head');
    if (pageHead) leftColContent.push(pageHead);
    const mediaContacts = textCol.querySelector('.page-head--media-contacts');
    if (mediaContacts) leftColContent.push(mediaContacts);
  }

  // Build right column: the main image in --image
  let rightColContent = [];
  if (imageCol) {
    const figure = imageCol.querySelector('figure') || imageCol.querySelector('img');
    if (figure) rightColContent.push(figure);
  }

  // Always guarantee two columns (even if one is empty)
  const leftCell = leftColContent.length === 1 ? leftColContent[0] : (leftColContent.length > 1 ? leftColContent : '');
  const rightCell = rightColContent.length === 1 ? rightColContent[0] : (rightColContent.length > 1 ? rightColContent : '');

  const cells = [
    ['Columns (columns5)'],
    [leftCell, rightCell]
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
