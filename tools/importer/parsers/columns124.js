/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Get the two column items (columns)
  const columnItems = Array.from(element.querySelectorAll(':scope > div > div > div.for-column-items > div.page-item--column'));
  if (columnItems.length < 2) return;

  // 2. Prepare the left column cell
  // Find the .page-item--gallery section containing the document tile
  let leftCellContent = null;
  const galleryBlock = columnItems[0].querySelector('.page-item--gallery section.gallery');
  if (galleryBlock) {
    // Find the first document tile inside the gallery
    const documentTile = galleryBlock.querySelector('.document-tile.gallery--item');
    if (documentTile) {
      leftCellContent = documentTile;
    }
  }
  // Fallback: if document tile not found, include the full column content
  if (!leftCellContent) {
    leftCellContent = columnItems[0];
  }

  // 3. Prepare the right column cell
  // Find the .page-item--image figure containing the image
  let rightCellContent = null;
  const imageBlock = columnItems[1].querySelector('.page-item--image figure.image');
  if (imageBlock) {
    rightCellContent = imageBlock;
  }
  // Fallback: if image not found, include the full column content
  if (!rightCellContent) {
    rightCellContent = columnItems[1];
  }

  // 4. Table header row as per instructions
  const headerRow = ['Columns (columns124)'];
  // 5. Table columns row: left and right cell
  const columnsRow = [leftCellContent, rightCellContent];

  // 6. Create and replace with the block table
  const cells = [headerRow, columnsRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
