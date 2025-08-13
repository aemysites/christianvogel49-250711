/* global WebImporter */
export default function parse(element, { document }) {
  // Compose table header
  const headerRow = ['Hero (hero142)'];

  // No background image in the sample HTML, so background row will be blank.
  const backgroundRow = [''];

  // Content row: headline, intro text, and tag (as in screenshot 2)
  // Find headline (h1)
  let h1 = null;
  const headlineEl = element.querySelector('.page-item--headline h1') || element.querySelector('h1');
  if (headlineEl) h1 = headlineEl;

  // Find <p> with intro text
  let introPara = null;
  const introParaEl = element.querySelector('.intro-text--text p') || element.querySelector('p');
  if (introParaEl) introPara = introParaEl;

  // Find tag (link, eg. #Strategie)
  let tagEl = null;
  const tagLinkEl = element.querySelector('.intro-text--tags a') || element.querySelector('.tag-list a');
  if (tagLinkEl) tagEl = tagLinkEl;

  // Compose content cell (preserve order: h1, paragraph, tag)
  const cellContent = [];
  if (h1) cellContent.push(h1);
  if (introPara) cellContent.push(introPara);
  if (tagEl) cellContent.push(tagEl);
  // If nothing, provide empty cell
  const contentRow = [cellContent.length ? cellContent : ''];

  const rows = [headerRow, backgroundRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
