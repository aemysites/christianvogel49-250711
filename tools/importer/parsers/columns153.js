/* global WebImporter */
export default function parse(element, { document }) {
  // Step 1: Find the columns
  const columnItems = element.querySelectorAll('.for-column-items > .page-item--column');
  if (columnItems.length === 0) return;
  // Only continue if we have at least 2 columns
  // If less, fallback to putting entire element content into one column

  // === LEFT COLUMN ===
  // Try to find the main text block inside the left column
  let leftContent = null;
  if (columnItems[0]) {
    leftContent = columnItems[0].querySelector('.text-block');
    // Fallback to the column itself if text-block not found
    if (!leftContent) leftContent = columnItems[0];
  } else {
    leftContent = document.createElement('div');
    leftContent.textContent = '';
  }

  // === RIGHT COLUMN ===
  // For the right column, include video and caption if present
  let rightContent = null;
  if (columnItems[1]) {
    // Find video block
    const videoBlock = columnItems[1].querySelector('.video-player');
    const videoCaption = columnItems[1].querySelector('.video-actions');
    if (videoBlock && videoCaption) {
      // Combine video and caption into one cell
      const cellDiv = document.createElement('div');
      cellDiv.appendChild(videoBlock);
      cellDiv.appendChild(videoCaption);
      rightContent = cellDiv;
    } else if (videoBlock) {
      rightContent = videoBlock;
    } else {
      rightContent = columnItems[1];
    }
  } else {
    rightContent = document.createElement('div');
    rightContent.textContent = '';
  }

  // Block name header
  const headerRow = ['Columns (columns153)'];

  // Compose table data
  const tableData = [
    headerRow,
    [leftContent, rightContent]
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace original element
  element.replaceWith(table);
}
