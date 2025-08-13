/* global WebImporter */
export default function parse(element, { document }) {
  // The goal is to create a Columns (columns129) table with three columns:
  // 1. The video info (title, metadata, buttons)
  // 2. The main video (video tag)
  // 3. The right gallery selection (thumbnails/links)

  // Defensive: Find the main gallery block
  const gallery = element.querySelector('.gallery');
  if (!gallery) return;
  // The main detail section for video info (left column)
  let leftCol = document.createElement('div');
  const info = gallery.querySelector('.detail-page-info');
  if (info) {
    // Use the children of info (instead of just copying info, to avoid extra wrapper)
    Array.from(info.children).forEach(child => leftCol.appendChild(child));
  }

  // The main video (middle column)
  let videoCol = null;
  const medium = gallery.querySelector('.detail-page--medium');
  if (medium) {
    const vid = medium.querySelector('video');
    if (vid) videoCol = vid;
  }
  // If video is missing, fallback to a blank div to keep columns
  if (!videoCol) videoCol = document.createElement('div');

  // The video gallery selection (right column)
  let rightCol = document.createElement('div');
  const selection = gallery.querySelector('.videos-gallery--selection .videos-gallery-tiles');
  if (selection) {
    // We'll use the .videos-gallery-tiles element (contains a list of <a> video tiles)
    Array.from(selection.children).forEach(child => rightCol.appendChild(child));
  }

  // Build the table rows
  const cells = [];
  // Header row (must match block name exactly)
  cells.push(['Columns (columns129)']);
  // Second row: columns
  cells.push([leftCol, videoCol, rightCol]);

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
