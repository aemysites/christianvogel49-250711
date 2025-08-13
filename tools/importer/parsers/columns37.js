/* global WebImporter */
export default function parse(element, { document }) {
  // Find images-gallery
  const imagesGallery = element.querySelector('.images-gallery');
  if (!imagesGallery) return;
  const imageTiles = Array.from(imagesGallery.querySelectorAll(':scope > .image-tile'));
  if (imageTiles.length === 0) return;

  // Helper: wrap image and caption in a div
  function imageWithCaption(tile) {
    const img = tile.querySelector('img');
    const captionText = tile.querySelector('.image-tile-overlay--info');
    if (img && captionText && captionText.textContent.trim()) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(img);
      const caption = document.createElement('p');
      caption.textContent = captionText.textContent.trim();
      wrapper.appendChild(caption);
      return wrapper;
    } else if (img) {
      return img;
    } else if (captionText && captionText.textContent.trim()) {
      const caption = document.createElement('p');
      caption.textContent = captionText.textContent.trim();
      return caption;
    }
    return '';
  }

  // Build two rows of two columns each (2x2 grid) after the header
  const rows = [];
  let row = [];
  for (let i = 0; i < imageTiles.length; i++) {
    row.push(imageWithCaption(imageTiles[i]));
    if (row.length === 2) {
      rows.push(row);
      row = [];
    }
  }
  // If odd number of images, pad last row
  if (row.length > 0) {
    while (row.length < 2) row.push('');
    rows.push(row);
  }

  const cells = [
    ['Columns (columns37)'],
    ...rows
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
