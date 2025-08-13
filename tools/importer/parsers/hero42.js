/* global WebImporter */
export default function parse(element, { document }) {
  // Find the registration form block
  const form = element.querySelector('form.registration-form');
  if (!form) return;

  // Find the hero content area (header)
  const header = form.querySelector('.registration-form--header');
  let heroContent = [];

  if (header) {
    // Include ALL children from the header that have non-empty text (preserving headings, paragraphs, etc)
    heroContent = Array.from(header.children).filter((child) => {
      // Only include elements with non-empty text
      return child.textContent && child.textContent.trim() !== '';
    });
    // Fallback in case all children are empty (shouldn't happen, but for resilience)
    if (heroContent.length === 0) heroContent = [header];
  } else {
    // If header is missing, fallback to all first-level children of form with non-empty text
    heroContent = Array.from(form.children).filter((child) => {
      return child.textContent && child.textContent.trim() !== '';
    });
  }

  // Compose the block table as per the Hero (hero42) spec
  const headerRow = ['Hero (hero42)'];
  // Background image row: no image in provided HTML
  const backgroundRow = [''];
  // Content row: all collected hero elements
  const contentRow = [heroContent.length === 1 ? heroContent[0] : heroContent];

  const cells = [headerRow, backgroundRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the form with the block table
  form.replaceWith(block);
}
