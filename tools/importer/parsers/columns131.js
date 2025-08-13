/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header (exact match)
  const headerRow = ['Columns (columns131)'];

  // 2. Get both column elements (should be two columns only)
  const forColumnItems = element.querySelector('.row.for-column-items');
  const columnDivs = forColumnItems ? forColumnItems.querySelectorAll(':scope > .page-item--column') : [];

  // Edge case: If no columns, do nothing
  if (columnDivs.length === 0) return;

  // 3. Gather left column (Medienkontakte)
  const leftCol = columnDivs[0];
  const leftColContents = [];

  // Headline
  const leftHeadline = leftCol.querySelector('.page-item--headline h2');
  if (leftHeadline) leftColContents.push(leftHeadline);

  // Contact list (media-contact-group)
  const contactGroup = leftCol.querySelector('.media-contact-group');
  if (contactGroup) leftColContents.push(contactGroup);

  // Link at bottom (Alle Medienkontakte)
  const allContactsText = leftCol.querySelector('.page-item--text');
  if (allContactsText) leftColContents.push(allContactsText);

  // 4. Gather right column (Corporate Design Portal)
  const rightCol = columnDivs[1];
  const rightColContents = [];

  // Headline
  const rightHeadline = rightCol.querySelector('.page-item--headline h2');
  if (rightHeadline) rightColContents.push(rightHeadline);

  // Article with image and portal text (flex-float)
  const flexFloat = rightCol.querySelector('article.flex-float');
  if (flexFloat) rightColContents.push(flexFloat);

  // 5. Build rows (always 2 columns)
  const columnsRow = [leftColContents, rightColContents];
  const tableArray = [headerRow, columnsRow];

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(tableArray, document);
  element.replaceWith(table);
}
