/* global WebImporter */
export default function parse(element, { document }) {
  // Table header must match exactly
  const headerRow = ['Cards (cards32)'];
  // Get all column cards under the block
  const cardColumns = Array.from(element.querySelectorAll(':scope > .row.for-column-items > .page-item--column'));
  const rows = [];
  cardColumns.forEach((col) => {
    // IMAGE: get the main image element for the card
    let imageEl = null;
    // The image is in: figure.flex-float--image > span.cropped-image > img
    const figure = col.querySelector('figure.flex-float--image');
    if (figure) {
      imageEl = figure.querySelector('img');
    }

    // TEXT: build a cell that contains heading, paragraph, CTA
    // - Heading: .flex-float--title
    // - Description: p (not inside button)
    // - CTA: .flex-float--button (usually contains a link)
    const textCellContent = [];
    const heading = col.querySelector('.flex-float--title');
    if (heading) textCellContent.push(heading);
    // Description paragraphs
    const textBlock = col.querySelector('.flex-float--text.text-block');
    if (textBlock) {
      // Only paragraphs that are not inside the button
      Array.from(textBlock.querySelectorAll('p')).forEach((p) => {
        // Ensure this is not a CTA button paragraph
        if (!p.closest('.flex-float--button')) {
          textCellContent.push(p);
        }
      });
      // CTA button (may be a div.flex-float--button containing an <a>)
      const ctaDiv = textBlock.querySelector('.flex-float--button');
      if (ctaDiv) {
        textCellContent.push(ctaDiv);
      }
    }
    // Push this card row: [image, text cell]
    rows.push([
      imageEl ? imageEl : '',
      textCellContent.length ? textCellContent : '',
    ]);
  });

  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
