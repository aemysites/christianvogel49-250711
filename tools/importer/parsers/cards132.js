/* global WebImporter */
export default function parse(element, { document }) {
  // Table header as required by the block spec
  const headerRow = ['Cards (cards132)'];

  // Utility to extract image element from a contact card
  function getImageEl(mediaContact) {
    // Use the img element directly, do not clone
    const img = mediaContact.querySelector('.media-contact--image img');
    return img || '';
  }

  // Utility to build the text cell containing all contact details
  function getTextCell(mediaContact) {
    const cellContent = [];
    // Name/title
    const nameDiv = mediaContact.querySelector('.media-contact--name');
    if (nameDiv && nameDiv.textContent.trim()) {
      const strong = document.createElement('strong');
      strong.textContent = nameDiv.textContent.trim();
      cellContent.push(strong);
    }
    // Positions (may be multiple spans)
    const posDiv = mediaContact.querySelector('.media-contact--position');
    if (posDiv) {
      posDiv.querySelectorAll('span').forEach((span) => {
        if (span.textContent.trim()) {
          const div = document.createElement('div');
          div.textContent = span.textContent.trim();
          cellContent.push(div);
        }
      });
    }
    // Contact info (phone, email)
    const infoDiv = mediaContact.querySelector('.media-contact--contact-information');
    if (infoDiv) {
      const telA = infoDiv.querySelector('a[href^="tel:"]');
      if (telA && telA.textContent.trim()) {
        const div = document.createElement('div');
        div.appendChild(telA);
        cellContent.push(div);
      }
      const emailA = infoDiv.querySelector('a[href^="mailto:"]');
      if (emailA && emailA.textContent.trim()) {
        const div = document.createElement('div');
        div.appendChild(emailA);
        cellContent.push(div);
      }
    }
    // If there's nothing, return empty string
    if (!cellContent.length) return '';
    return cellContent.length === 1 ? cellContent[0] : cellContent;
  }

  // Find all contacts
  const cards = element.querySelectorAll('.media-contact');
  const rows = Array.from(cards).map((mediaContact) => [
    getImageEl(mediaContact),
    getTextCell(mediaContact)
  ]);

  // Build table
  const cells = [headerRow, ...rows];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
