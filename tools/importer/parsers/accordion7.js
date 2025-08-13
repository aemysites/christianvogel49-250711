/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table: Header row and accordion item rows
  const cells = [];
  // Header row
  cells.push(['Accordion (accordion7)']);

  // --- 1. Aktuelle Entsprechenserklärung ---
  const aktuelleSection = element.querySelector('.tile-section.-blue-tile');
  if (aktuelleSection) {
    const headlineElem = aktuelleSection.querySelector('.page-item--headline h2');
    const galleryElem = aktuelleSection.querySelector('.page-item--gallery');
    if (headlineElem && galleryElem) {
      cells.push([headlineElem, galleryElem]);
    }
  }

  // --- 2. Frühere Entsprechenserklärungen + Konzern... attachments/text ---
  const greenSection = element.querySelector('.full-width-section.-corporate-green');
  if (greenSection) {
    // Title cell: First headline in green section
    const fruehereHeadline = greenSection.querySelector('.page-row.is-nth-1 h2');
    let titleCell = fruehereHeadline ? fruehereHeadline : document.createTextNode('Frühere Entsprechenserklärungen');

    // Content cell: All .page-item--attachment links (PDFs) in order
    const attachmentLinks = Array.from(greenSection.querySelectorAll('.page-item--attachment .file-attachment a'));

    // Find the Konzernerklärung zur Unternehmensführung headline and text block
    const konzernTextBlock = greenSection.querySelector('.page-row.is-nth-18 .page-item--text .text-block');
    const konzernHeadline = greenSection.querySelector('.page-row.is-nth-17 .page-item--headline h2');

    // Compose content
    const contentDiv = document.createElement('div');
    // Add all attachments first
    attachmentLinks.forEach(a => {
      const p = document.createElement('p');
      p.appendChild(a);
      contentDiv.appendChild(p);
    });
    // Then add the heading and text block for Konzernerklärung zur Unternehmensführung, if present
    if (konzernHeadline) {
      contentDiv.appendChild(konzernHeadline);
    }
    if (konzernTextBlock) {
      contentDiv.appendChild(konzernTextBlock);
    }
    cells.push([titleCell, contentDiv]);
  }

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
