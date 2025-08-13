/* global WebImporter */
export default function parse(element, { document }) {
  // Table (striped, bordered) block
  const headerRow = ['Table (striped, bordered)'];
  const cells = [headerRow];

  // --- 1. Introductory Text ---
  let introContainer = null;
  const introElem = element.querySelector('.intro-text--text');
  if (introElem) {
    introContainer = introElem; // Reference existing element directly
  }

  // --- 2. Ratings Tables ---
  // They are four tables, each under .table-responsive
  const ratingsTables = Array.from(element.querySelectorAll('.table-responsive table'));

  // --- 3. Explanatory Paragraphs and Link ---
  // The blocks after the ratings tables
  // We'll take all page-item--text .text-block elements after the 4 tables
  const textBlocks = Array.from(element.querySelectorAll('.page-item--text .text-block'));
  // The last two .text-blocks contain the footnote and the link/info
  // Get all paragraphs in those blocks
  let extraInfoContainer = null;
  if (textBlocks.length > 4) {
    extraInfoContainer = document.createElement('div');
    // The last two blocks
    const lastBlocks = textBlocks.slice(-2);
    lastBlocks.forEach(block => {
      Array.from(block.children).forEach(child => {
        if (
          child.tagName === 'P' || child.tagName === 'A' ||
          child.tagName === 'BR'
        ) {
          extraInfoContainer.appendChild(child);
        }
      });
    });
  }

  // --- 4. Rating Releases Section ---
  // Under .full-width-section
  const releasesSection = element.querySelector('.full-width-section');
  let releasesContainer = null;
  if (releasesSection) {
    releasesContainer = releasesSection; // Reference existing element directly
  }

  // --- Compose content in order ---
  const cellContent = [];
  if (introContainer) cellContent.push(introContainer);
  ratingsTables.forEach(table => cellContent.push(table));
  if (extraInfoContainer && extraInfoContainer.childNodes.length) cellContent.push(extraInfoContainer);
  if (releasesContainer) cellContent.push(releasesContainer);

  cells.push([cellContent]);

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
