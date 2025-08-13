/* global WebImporter */
export default function parse(element, { document }) {
  // Header row as per spec
  const headerRow = ['Cards (cards21)'];
  // Find the relevant contacts block
  const contactsGroup = element.querySelector('.media-contact-group');
  if (!contactsGroup) return;
  // Extract each card (contact)
  const cards = Array.from(contactsGroup.querySelectorAll(':scope > .media-contact'));
  const rows = cards.map(card => {
    // Image cell
    let img = card.querySelector('.media-contact--image img');
    // Use the actual img element from the DOM
    // Text cell
    const details = card.querySelector('.media-contact--details');
    const cellContent = [];
    // Name, bold
    const nameEl = details && details.querySelector('.media-contact--name');
    if (nameEl) {
      const strong = document.createElement('strong');
      strong.textContent = nameEl.textContent.trim();
      cellContent.push(strong, document.createElement('br'));
    }
    // vCard download link (optional)
    const vcardLink = details && details.querySelector('.media-contact--download');
    if (vcardLink) {
      // Use the link element directly, but remove the icon for clarity
      const link = vcardLink;
      // Remove any icon child
      const icon = link.querySelector('.icon');
      if (icon) icon.remove();
      link.textContent = 'vCard';
      cellContent.push(link, document.createElement('br'));
    }
    // Position
    const posSpan = details && details.querySelector('.media-contact--position span');
    if (posSpan) {
      cellContent.push(posSpan, document.createElement('br'));
    }
    // Contact info: phone and mail
    const contactDiv = details && details.querySelector('.media-contact--contact-information');
    if (contactDiv) {
      // Usually contains <span><a></a></span> for phone and another for mail
      Array.from(contactDiv.children).forEach(span => {
        // Keep original <span> for formatting, but if you want just <a>, use span.querySelector('a')
        cellContent.push(span, document.createElement('br'));
      });
    }
    // Remove last <br> if present
    if (cellContent.length > 0 && cellContent[cellContent.length - 1].tagName === 'BR') {
      cellContent.pop();
    }
    return [img, cellContent];
  });
  const table = WebImporter.DOMUtils.createTable([headerRow, ...rows], document);
  element.replaceWith(table);
}
