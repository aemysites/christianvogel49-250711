/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Hero (hero141)'];

  // Find all relevant content blocks
  // We expect one main container
  const container = element.querySelector('.container-narrow');

  // Find main headline (h2)
  let titleEl = null;
  const headlineBlock = container && container.querySelector('.page-item--headline h2');
  if (headlineBlock) {
    titleEl = headlineBlock;
  }

  // Find the text block (paragraphs)
  let textBlockContent = null;
  const textBlock = container && container.querySelector('.page-item--text .text-block');
  if (textBlock) {
    textBlockContent = textBlock;
  }

  // Find the image block (image and caption)
  let imageEl = null;
  let captionEl = null;
  const imageBlock = container && container.querySelector('.page-item--image figure');
  if (imageBlock) {
    imageEl = imageBlock.querySelector('img');
    captionEl = imageBlock.querySelector('figcaption');
  }

  // Second row: Only the image element (background image, if present)
  const imageRow = [imageEl ? imageEl : ''];

  // Third row: headline, paragraph, and image caption (if present)
  // Always maintain semantic meaning: headline as heading, paragraph as-is, caption if present
  const contentArr = [];
  if (titleEl) contentArr.push(titleEl);
  if (textBlockContent) contentArr.push(textBlockContent);
  if (captionEl) contentArr.push(captionEl);
  const contentRow = [contentArr.length === 1 ? contentArr[0] : contentArr];

  // Compose final table structure
  const cells = [headerRow, imageRow, contentRow];

  // Create block table and replace original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
