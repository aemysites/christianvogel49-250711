/* global WebImporter */
export default function parse(element, { document }) {
  // Find the gallery section
  const section = element.querySelector('section.gallery');
  if (!section) return;

  // --- LEFT COLUMN: main video info and player ---
  let leftColumn;
  const stage = section.querySelector('.videos-gallery--stage');
  if (stage) {
    // Use a fragment with all info and player blocks
    const frag = document.createDocumentFragment();
    // Select all direct children (preserves order)
    Array.from(stage.children).forEach(child => {
      frag.appendChild(child);
    });
    leftColumn = frag;
  } else {
    leftColumn = document.createTextNode('');
  }

  // --- RIGHT COLUMN: video gallery sidebar ---
  let rightColumn;
  const selection = section.querySelector('.videos-gallery--selection');
  if (selection) {
    // Only include the .videos-gallery-tiles element
    const tiles = selection.querySelector('.videos-gallery-tiles');
    rightColumn = tiles || document.createTextNode('');
  } else {
    rightColumn = document.createTextNode('');
  }

  // Table: first row is header (single cell), second is content (two columns)
  const cells = [
    ['Columns (columns23)'],
    [leftColumn, rightColumn],
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
