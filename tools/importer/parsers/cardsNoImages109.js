/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by spec and example
  const headerRow = ['Cards (cardsNoImages109)'];
  const rows = [headerRow];

  // Select all card sections; in this HTML, cards are represented by .flex-text sections
  const cardSections = element.querySelectorAll('.flex-text');
  cardSections.forEach((cardSection) => {
    const cellContent = [];
    // Heading (optional)
    const title = cardSection.querySelector('.flex-text--title');
    if (title) cellContent.push(title);
    // Description/content (optional)
    const textBlock = cardSection.querySelector('.flex-text--text');
    if (textBlock) cellContent.push(textBlock);
    // CTA (optional)
    const ctaWrapper = cardSection.querySelector('.flex-text--button');
    if (ctaWrapper) {
      // Use the link inside the button wrapper
      const cta = ctaWrapper.querySelector('a');
      if (cta) cellContent.push(cta);
    }
    // Always add, even if cellContent is empty (handles edge cases cleanly)
    rows.push([cellContent]);
  });

  // Only replace if there is at least a header and one card row
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    element.replaceWith(table);
  }
  // Otherwise don't replace, which is safest for edge cases
}
