/* global WebImporter */
export default function parse(element, { document }) {
  // Block header as in the example
  const headerRow = ['Hero (hero31)'];

  // Background image row: none present in the HTML example
  const bgRow = [''];

  // Content row: title, date, list, call-to-action
  const section = element.querySelector('section.flex-text');

  // Guard against missing section
  if (!section) {
    // Still replace with basic block structure if section is missing
    const cells = [
      headerRow,
      [bgRow[0]],
      ['']
    ];
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
    return;
  }

  // Compose content fragment in display order
  const frag = document.createDocumentFragment();

  // Title
  const title = section.querySelector('.flex-text--title');
  if (title) frag.appendChild(title);

  // Date and text block
  const rowBlock = section.querySelector('.flex-text--row');
  if (rowBlock) {
    // flex-text--row wraps flex-text--text which contains <p> and <ul>
    Array.from(rowBlock.children).forEach(child => {
      frag.appendChild(child);
    });
  }

  // Button (call-to-action)
  const buttonWrap = section.querySelector('.flex-text--button');
  if (buttonWrap) frag.appendChild(buttonWrap);

  // Table construction
  const cells = [
    headerRow,
    [bgRow[0]],
    [frag]
  ];

  // Replace original element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
