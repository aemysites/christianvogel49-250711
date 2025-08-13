/* global WebImporter */
export default function parse(element, { document }) {
  // Find both columns
  const columns = Array.from(element.querySelectorAll(':scope > .row > .page-item.page-item--column'));
  if (columns.length !== 2) return;

  // LEFT COLUMN: Gallery tiles (image+caption) for pairing
  const leftCol = columns[0];
  let leftItems = [];
  const galleryBlock = leftCol.querySelector('.page-item--gallery');
  if (galleryBlock) {
    const galleryTiles = galleryBlock.querySelectorAll('.images-gallery--image.gallery--item');
    galleryTiles.forEach(tile => {
      const div = document.createElement('div');
      const img = tile.querySelector('img');
      if (img) div.appendChild(img);
      const caption = tile.querySelector('.image-tile-overlay--info');
      if (caption) div.appendChild(caption);
      leftItems.push(div);
    });
  }

  // RIGHT COLUMN: Each text block and video block separately for pairing
  const rightCol = columns[1];
  let rightItems = [];
  // For each possible content block in right column, in visual order
  rightCol.querySelectorAll(':scope > .page-row').forEach(row => {
    // Text
    row.querySelectorAll('.page-item--text .text-block').forEach(block => {
      // Non-empty paragraphs, else block itself
      const paras = Array.from(block.querySelectorAll('p')).filter(p => p.textContent.trim().length > 0);
      if (paras.length) {
        paras.forEach(p => rightItems.push(p));
      } else {
        rightItems.push(block);
      }
    });
    // Video
    row.querySelectorAll('.page-item--video-record').forEach(block => {
      rightItems.push(block);
    });
  });

  // Pair left and right items row-wise (multi-row structure)
  const maxRows = Math.max(leftItems.length, rightItems.length);
  while (leftItems.length < maxRows) leftItems.push('');
  while (rightItems.length < maxRows) rightItems.push('');

  const headerRow = ['Columns (columns58)'];
  const contentRows = [];
  for (let i = 0; i < maxRows; i++) {
    contentRows.push([leftItems[i], rightItems[i]]);
  }
  const cells = [headerRow, ...contentRows];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}