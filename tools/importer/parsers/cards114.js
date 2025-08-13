/* global WebImporter */
export default function parse(element, { document }) {
  // Block header - must match the example exactly
  const headerRow = ['Cards (cards114)'];

  // Find all card columns
  // Each card: .page-item--column
  const cards = element.querySelectorAll('.page-item--column');
  const rows = [];

  cards.forEach((card) => {
    // Find image
    const img = card.querySelector('img');
    // If missing, cell will be empty
    
    // Find heading (h3)
    const heading = card.querySelector('h3');

    // Find description (first <p> in .flex-float--text)
    let description = null;
    const textBlock = card.querySelector('.flex-float--text');
    if (textBlock) {
      description = textBlock.querySelector('p');
    }

    // Find CTA button (first <a> in .flex-float--button)
    let cta = null;
    const buttonBlock = card.querySelector('.flex-float--button');
    if (buttonBlock) {
      cta = buttonBlock.querySelector('a');
    }

    // Compose text cell content
    const textContent = [];
    if (heading) textContent.push(heading);
    if (description) textContent.push(description);
    if (cta) textContent.push(cta);

    // Add row as [image, textContent]
    rows.push([img, textContent]);
  });

  // Compose final table structure
  const cells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(blockTable);
}
