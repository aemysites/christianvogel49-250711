/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as per block name from the example
  const headerRow = ['Cards (cardsNoImages119)'];
  const rows = [headerRow];

  // Find the card content section
  const cardSection = element.querySelector('.flex-text');
  if (cardSection) {
    // Prepare the card content array
    const cellContent = [];

    // Heading: <h2 class="flex-text--title">
    const heading = cardSection.querySelector('.flex-text--title');
    if (heading) {
      cellContent.push(heading);
    }

    // Description/date/list: <div class="flex-text--row"><div class="flex-text--text text-block">...</div></div>
    const textBlock = cardSection.querySelector('.flex-text--row .flex-text--text');
    if (textBlock) {
      cellContent.push(textBlock);
    }

    // CTA/button: <div class="flex-text--button"><a...></a></div>
    const btnDiv = cardSection.querySelector('.flex-text--button');
    if (btnDiv) {
      cellContent.push(btnDiv);
    }

    if (cellContent.length > 0) {
      rows.push([cellContent]);
    }
  }

  // Only create/replace if rows have any card content
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
}
