/* global WebImporter */
export default function parse(element, { document }) {
  // Get the flex-tai--row, which contains both columns (image and text)
  const flexRow = element.querySelector('.flex-tai--row');
  if (!flexRow) return;

  // Find the direct children of flexRow (should be two columns)
  const columns = Array.from(flexRow.children);
  if (columns.length < 2) return;

  // Determine which column is image and which is text
  let imageCol = null;
  let textCol = null;
  for (const col of columns) {
    if (col.classList.contains('flex-tai--image-container')) {
      imageCol = col;
    } else if (col.classList.contains('flex-tai--text')) {
      textCol = col;
    }
  }

  // Defensive fallback in case class detection fails
  if (!imageCol || !textCol) {
    // Assume first is image, second is text
    [imageCol, textCol] = columns;
  }

  // For the image column, keep the entire figure (if present)
  let imageContent = null;
  if (imageCol) {
    const figure = imageCol.querySelector('figure');
    imageContent = figure ? figure : imageCol;
  }

  // For the text column, keep the whole content
  let textContent = textCol || null;

  // Compose the columns block table
  const headerRow = ['Columns (columns41)'];
  const dataRow = [textContent, imageContent];
  const cells = [headerRow, dataRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
