/* global WebImporter */
export default function parse(element, { document }) {
  // HEADER ROW: Matches example exactly
  const headerRow = ['Hero (hero17)'];

  // BACKGROUND IMAGE ROW: Example has optional image, source HTML does not have any image element.
  // So this row should be a single empty string cell.
  const backgroundRow = [''];

  // CONTENT ROW: Extract title, cta, and paragraph
  // Find the relevant content container:
  // The structure is: ...<section class="flex-text ..."><h2>Title</h2><div class="flex-text--button"><a>CTA</a></div><div class="flex-text--row"><div class="flex-text--text"><p>Text</p></div></div></section>
  const flexTextSection = element.querySelector('section.flex-text');
  const contentParts = [];
  if (flexTextSection) {
    // Title (h2)
    const title = flexTextSection.querySelector('h2');
    if (title) contentParts.push(title);
    // Call-to-action button (a)
    const btnDiv = flexTextSection.querySelector('.flex-text--button');
    if (btnDiv) {
      const btn = btnDiv.querySelector('a');
      if (btn) contentParts.push(btn);
    }
    // Paragraph (p)
    const flexTextRow = flexTextSection.querySelector('.flex-text--row');
    if (flexTextRow) {
      const textBlock = flexTextRow.querySelector('.flex-text--text');
      if (textBlock) {
        // Append all element children (typically <p>)
        Array.from(textBlock.children).forEach(child => {
          contentParts.push(child);
        });
      }
    }
  }
  const contentRow = [contentParts.length > 0 ? contentParts : ['']];

  // Compose table
  const cells = [
    headerRow,
    backgroundRow,
    contentRow,
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
