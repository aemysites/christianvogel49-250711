/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for Embed block, must match example exactly
  const cells = [
    ['Embed']
  ];

  const cellContent = [];

  // Find preview image (gallery tile or video poster)
  let img = null;
  const galleryImg = element.querySelector('.videos-gallery-tile--preview img');
  if (galleryImg) {
    img = galleryImg;
  } else {
    // Fallback: video poster
    const videoEl = element.querySelector('video');
    if (videoEl && videoEl.poster) {
      img = document.createElement('img');
      img.src = videoEl.poster;
      img.alt = '';
    }
  }
  if (img) cellContent.push(img);

  // Find video URL (download link, <video> source, or gallery tile link)
  let videoUrl = '';
  const downloadLink = element.querySelector('a[rel="download"][href*=".mp4"]');
  if (downloadLink) {
    videoUrl = downloadLink.href;
  } else {
    const mp4Source = element.querySelector('video source[type="video/mp4"]');
    if (mp4Source) {
      videoUrl = mp4Source.src;
    } else {
      const tileLink = element.querySelector('.videos-gallery-tile[href]');
      if (tileLink) {
        videoUrl = tileLink.href;
      }
    }
  }
  if (videoUrl) {
    if (img) cellContent.push(document.createElement('br'));
    const link = document.createElement('a');
    link.href = videoUrl;
    link.textContent = videoUrl;
    cellContent.push(link);
  }

  // Find all main textual info (title, metadata, etc.)
  // Use the largest info container for text (detail-page-info)
  const info = element.querySelector('.detail-page-info');
  if (info) {
    // Also include buttons (e.g. download, share, cart) if present
    const infoButtons = element.querySelector('.detail-page-info--buttons');
    // Compose a wrapper for the textual content
    const wrapper = document.createElement('div');
    // Title
    const title = info.querySelector('.detail-page-info--title');
    if (title) wrapper.appendChild(title);
    // Metadata
    const metadata = info.querySelector('.detail-page-info--metadata');
    if (metadata) wrapper.appendChild(metadata);
    // Buttons
    if (infoButtons) wrapper.appendChild(infoButtons);
    // Add wrapper only if it has some content
    if (wrapper.childNodes.length) {
      if (cellContent.length) cellContent.push(document.createElement('br'));
      cellContent.push(wrapper);
    }
  }

  // Compose table: always 1 column per example
  cells.push([cellContent]);

  // Replace element with the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
