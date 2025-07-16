/* global WebImporter */
export default function parse(element, { document }) {
  // Get all direct children that are image tiles (columns)
  const tiles = Array.from(element.querySelectorAll(':scope > .image-tile'));

  // Build header row exactly as required
  const header = ['Columns (columns16)'];

  // For each tile, include all image and visible text content, preserving block structure
  const cells = tiles.map(tile => {
    const cellContent = [];
    // Find the image-tile--image (may include img, or wrappers with text/labels)
    const imageBlock = tile.querySelector(':scope > .image-tile--image');
    if (imageBlock) cellContent.push(imageBlock);

    // Find the overlay info/caption from image-tile-overlay--info
    const overlay = tile.querySelector(':scope > .image-tile-overlay');
    if (overlay) {
      // Only keep the info div (caption/description)
      const info = overlay.querySelector(':scope > .image-tile-overlay--info');
      if (info && info.textContent.trim().length > 0) {
        // Wrap in <p> to match semantic block meaning, preserve inline markup
        const p = document.createElement('p');
        info.childNodes.forEach(n => p.appendChild(n.cloneNode(true)));
        cellContent.push(p);
      }
    }

    // If nothing found, but tile has text, include it
    if (cellContent.length === 0 && tile.textContent.trim().length > 0) {
      cellContent.push(tile.textContent.trim());
    }
    // Only return a single value if that's all, otherwise the array
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  });

  // Compose table: first row is header (1 cell), second row is actual columns (multiple cells)
  const tableRows = [header, cells];
  const block = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(block);
}
