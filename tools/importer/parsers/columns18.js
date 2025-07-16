/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery list containing images
  const galleryList = element.querySelector('.images-gallery.infinite-nodes--list');
  if (!galleryList) return;

  // Get all image tiles (direct children only)
  const galleryItems = Array.from(galleryList.querySelectorAll(':scope > .images-gallery--image.gallery--item'));
  if (galleryItems.length === 0) return;

  // Prepare the cells for a 2x2 grid (as in the screenshot)
  // That means 2 rows (after header), each row has 2 cells (columns)
  const grid = [];
  for (let i = 0; i < 2; i++) {
    const row = [];
    for (let j = 0; j < 2; j++) {
      const index = i * 2 + j;
      if (galleryItems[index]) {
        const item = galleryItems[index];
        // Extract the image
        const img = item.querySelector('.image-tile--image img');
        // Extract the caption, if any
        const captionDiv = item.querySelector('.image-tile-overlay--info');
        const cellContents = [];
        if (img) cellContents.push(img);
        if (captionDiv && captionDiv.textContent.trim().length > 0) {
          const p = document.createElement('p');
          p.textContent = captionDiv.textContent.trim();
          cellContents.push(p);
        }
        row.push(cellContents.length === 1 ? cellContents[0] : cellContents);
      } else {
        // If missing, push empty string for consistent columns
        row.push('');
      }
    }
    grid.push(row);
  }

  // Compose the table rows
  const headerRow = ['Columns (columns18)'];
  const tableRows = [headerRow, ...grid];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(tableRows, document);
  element.replaceWith(table);
}
