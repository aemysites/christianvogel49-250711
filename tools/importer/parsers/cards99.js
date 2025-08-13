/* global WebImporter */
export default function parse(element, { document }) {
  // Build the header
  const headerRow = ['Cards (cards99)'];
  const rows = [];
  // Find top-level columns (cards)
  const columns = element.querySelectorAll('.page-item--column');
  columns.forEach((col) => {
    // Get the flex card article
    const article = col.querySelector('article.flex-float');
    if (!article) return;
    // Image cell: prefer the <figure> if present
    const figure = article.querySelector('figure.flex-float--image');
    const imageCell = figure ? figure : article.querySelector('img');
    // Text cell: heading, description, CTA button, in order
    const textCell = [];
    const title = article.querySelector('.flex-float--title');
    if (title) textCell.push(title);
    const textBlock = article.querySelector('.flex-float--text.text-block');
    if (textBlock) {
      // Add <p> elements (description)
      Array.from(textBlock.children).forEach((child) => {
        if (child.tagName === 'P') textCell.push(child);
        if (child.classList.contains('flex-float--button')) textCell.push(child);
      });
    }
    rows.push([imageCell, textCell]);
  });
  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);
  element.replaceWith(table);
}
