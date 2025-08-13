/* global WebImporter */
export default function parse(element, { document }) {
  // The header row must match the example exactly
  const headerRow = ['Columns (columns23)'];

  // Find the main row containing columns
  const flexRow = element.querySelector('.flex-tai--row');

  let columnCells = [];

  if (flexRow) {
    // Get direct children of the flex row: image container and text container
    const children = Array.from(flexRow.children);
    const imageContainer = children.find((el) => el.classList.contains('flex-tai--image-container'));
    const textContainer = children.find((el) => el.classList.contains('flex-tai--text'));

    // For the image column: reference the figure element directly if present
    let imageCell = null;
    if (imageContainer) {
      const figure = imageContainer.querySelector('figure');
      imageCell = figure ? figure : imageContainer;
    }

    // For the text column: reference the text container directly (do not clone, as per instructions)
    let textCell = null;
    if (textContainer) {
      textCell = textContainer;
    }

    // Organize columns: text first, image second (semantic match to screenshot)
    if (textCell && imageCell) {
      columnCells = [textCell, imageCell];
    } else if (textCell) {
      columnCells = [textCell];
    } else if (imageCell) {
      columnCells = [imageCell];
    }
  } else {
    // Fallback: if flexRow not found, use all immediate children as columns
    columnCells = Array.from(element.children);
  }

  // Ensure we do not miss any text content: check for any trailing text nodes directly under element
  if (columnCells.length === 0) {
    // If the element is just text, include it
    columnCells = [element];
  }

  // Compose the table
  const cells = [headerRow, columnCells];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
