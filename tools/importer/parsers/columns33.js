/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: extract YouTube preview image and link from a column
  function getVideoCell(col) {
    const vidItem = col.querySelector('.page-item--youtube-video');
    if (!vidItem) return null;
    const vidDiv = vidItem.querySelector('.youtube-video');
    if (!vidDiv) return null;
    // Preview image
    let img = null;
    const placeholder = vidDiv.querySelector('.youtube-video--consent-placeholder');
    if (placeholder && placeholder.style && placeholder.style.backgroundImage) {
      const urlMatch = placeholder.style.backgroundImage.match(/url\((['"]?)(.*?)\1\)/);
      if (urlMatch && urlMatch[2]) {
        img = document.createElement('img');
        img.src = urlMatch[2];
        img.alt = '';
      }
    }
    // Link (extract YouTube embed url from up-data attribute)
    let videoUrl = null;
    if (vidDiv.hasAttribute('up-data')) {
      let upDataStr = vidDiv.getAttribute('up-data');
      try {
        videoUrl = JSON.parse(upDataStr.replace(/&quot;/g, '"'));
      } catch (e) {
        videoUrl = upDataStr.replace(/&quot;/g, '"');
      }
    }
    if (!videoUrl) {
      // fallback to iframe src
      const iframe = vidDiv.querySelector('iframe');
      if (iframe && iframe.src) videoUrl = iframe.src;
    }
    // Compose cell content: image (if any), line break, link (if any)
    const frag = document.createDocumentFragment();
    if (img) frag.appendChild(img);
    if (videoUrl) {
      if (img) frag.appendChild(document.createElement('br'));
      const a = document.createElement('a');
      a.href = videoUrl;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = 'Video';
      frag.appendChild(a);
    }
    return frag.childNodes.length ? frag : null;
  }

  // Helper: extract text block from a column
  function getTextCell(col) {
    const textItem = col.querySelector('.page-item--text');
    if (!textItem) return null;
    const textBlock = textItem.querySelector('.text-block');
    if (textBlock) return textBlock;
    return null;
  }

  // Find the columns wrapper (row)
  let columnsRow = element.querySelector('.row.for-column-items');
  if (!columnsRow) {
    columnsRow = Array.from(element.querySelectorAll(':scope > div')).find(d => d.querySelector('.row.for-column-items'));
    if (columnsRow) columnsRow = columnsRow.querySelector('.row.for-column-items');
  }
  if (!columnsRow) return;

  // All immediate column .page-item--column children
  const cols = Array.from(columnsRow.children).filter(col => col.classList.contains('page-item--column'));
  // For each column, collect [video, text] content
  const contentRow = cols.map(col => {
    const frag = document.createDocumentFragment();
    // Video block first
    const video = getVideoCell(col);
    if (video) frag.appendChild(video);
    // Text block after
    const text = getTextCell(col);
    if (text) frag.appendChild(text);
    return frag.childNodes.length === 1 ? frag.firstChild : frag;
  });

  // Compose table (header, row with columns)
  // Header row: MUST be a single cell (array of length 1), even if there are multiple columns (per markdown example)
  const headerRow = ['Columns (columns33)'];
  const cells = [headerRow, contentRow];

  // Create and replace
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
