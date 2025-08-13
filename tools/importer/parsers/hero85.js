/* global WebImporter */
export default function parse(element, { document }) {
  // Find main column containing the block's content
  const mainColumn = element.querySelector('.page-item--column');
  if (!mainColumn) return;

  // Row 2: Image
  let imageCell = null;
  const imageRow = mainColumn.querySelector('.page-item--image');
  if (imageRow) {
    const figure = imageRow.querySelector('figure');
    if (figure) {
      imageCell = figure;
    }
  }

  // Row 3: Headline and text content
  let textCellContent = [];
  // Headline (h2)
  const headlineRow = mainColumn.querySelector('.page-item--headline');
  if (headlineRow) {
    const h2 = headlineRow.querySelector('h2');
    if (h2) textCellContent.push(h2);
  }
  // Text block (paragraphs)
  const textRow = mainColumn.querySelector('.page-item--text');
  if (textRow) {
    const textBlock = textRow.querySelector('.text-block');
    if (textBlock) {
      // Collect all paragraphs in textBlock
      const paragraphs = Array.from(textBlock.children).filter(el => el.tagName === 'P');
      textCellContent.push(...paragraphs);
    }
  }
  // Compose the text cell
  let textCell;
  if (textCellContent.length === 0) {
    textCell = '';
  } else if (textCellContent.length === 1) {
    textCell = textCellContent[0];
  } else {
    // Wrap in a div only if multiple elements
    const div = document.createElement('div');
    textCellContent.forEach(el => div.appendChild(el));
    textCell = div;
  }

  // Compose the hero block table cells: header, image, text
  const cells = [
    ['Hero (hero85)'],
    [imageCell],
    [textCell]
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
