/* global WebImporter */
export default function parse(element, { document }) {
  // Find the accordion block (robust for variations in container structure)
  const accordion = element.querySelector('.accordion');
  if (!accordion) return;

  // Prepare the header row exactly as required
  const rows = [['Accordion (accordion38)', '']];

  // Find all accordion items (each row)
  const items = accordion.querySelectorAll('.accordion-item');
  items.forEach((item) => {
    // TITLE CELL: use the original button element (preserves formatting/semantics)
    const titleEl = item.querySelector('.accordion-item--title');
    // If missing, fallback to empty string
    const titleCell = titleEl ? titleEl : '';

    // CONTENT CELL: collect all relevant content inside the accordion-item--content
    const contentContainer = item.querySelector('.accordion-item--content');
    let contentCell;
    if (contentContainer) {
      // Only use direct children inside contentContainer, referencing them directly
      const children = Array.from(contentContainer.children);
      if (children.length === 0) {
        // fallback: if nothing, use contentContainer itself (e.g. for text-only)
        contentCell = contentContainer;
      } else if (children.length === 1) {
        contentCell = children[0];
      } else {
        contentCell = children;
      }
    } else {
      contentCell = '';
    }
    rows.push([titleCell, contentCell]);
  });

  // Create the block table using the provided helper
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
