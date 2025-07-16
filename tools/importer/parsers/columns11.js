/* global WebImporter */
export default function parse(element, { document }) {
  // Find the infobox section
  const infobox = element.querySelector('.tile-section.-infobox');
  if (!infobox) return;

  // Find the columns wrapper
  const row = infobox.querySelector('.row.for-column-items');
  if (!row) return;
  const columns = row.querySelectorAll(':scope > .page-item--column');
  if (columns.length === 0) return;

  // Only two columns are present in this block
  const leftCol = columns[0];
  const rightCol = columns[1];

  // --- LEFT COLUMN: Medienkontakte ---
  const leftContent = [];
  // Headline (keep heading tag)
  const leftHeadline = leftCol.querySelector('.page-item--headline');
  if (leftHeadline) leftContent.push(leftHeadline);
  // Media contacts group (contains all contacts)
  const contactsGroup = leftCol.querySelector('.media-contact-group');
  if (contactsGroup) leftContent.push(contactsGroup);
  // 'Alle Medienkontakte' link (the text block at the bottom)
  const allContactsBlock = leftCol.querySelector('.page-item--text');
  if (allContactsBlock) leftContent.push(allContactsBlock);

  // --- RIGHT COLUMN: Corporate Design Portal ---
  const rightContent = [];
  // Headline (keep heading tag)
  const rightHeadline = rightCol.querySelector('.page-item--headline');
  if (rightHeadline) rightContent.push(rightHeadline);
  // Flex block (contains image + text)
  const flexBlock = rightCol.querySelector('.flex-float');
  if (flexBlock) rightContent.push(flexBlock);

  // Compose the cells array for the Columns block
  // Header row must match exactly as required: 'Columns (columns11)'
  const cells = [
    ['Columns (columns11)'],
    [leftContent, rightContent],
  ];

  // Create block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the block table
  element.replaceWith(table);
}
