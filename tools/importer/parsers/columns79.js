/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as specified in guidelines
  const headerRow = ['Columns (columns79)'];

  // Find columns: direct children with .page-item--column
  const columns = Array.from(
    element.querySelectorAll('.for-column-items > .page-item--column')
  );

  // Build content row, referencing existing elements, matching screenshot and example intent
  const contentRow = columns.map((col) => {
    // Column could be image or text/button area
    // Search for image block
    const imageEl = col.querySelector('.page-item--image .image');
    if (imageEl) {
      // Reference the whole figure (includes img and caption)
      return imageEl;
    }

    // Search for flex text block
    const flexSection = col.querySelector('section.flex-text');
    if (flexSection) {
      // Reference the whole section (includes heading, button, paragraph)
      return flexSection;
    }

    // Fallback: reference the entire column if unknown structure
    return col;
  });

  // Compose table matching example structure
  const cells = [headerRow, contentRow];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the source element with the new block table
  element.replaceWith(table);
}
