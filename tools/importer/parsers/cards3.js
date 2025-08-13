/* global WebImporter */
export default function parse(element, { document }) {
  // Always create a header row with block name, matching the example
  const headerRow = ['Cards (cards3)'];
  const rows = [headerRow];

  // Find all document cards (each .document-tile inside .documents-gallery)
  const galleryList = element.querySelector('.documents-gallery');
  let cards = [];
  if (galleryList) {
    cards = Array.from(galleryList.querySelectorAll('.document-tile'));
  }

  // For each card, extract image and full text content
  cards.forEach(card => {
    // Find image element directly (reference existing DOM node)
    const img = card.querySelector('img');

    // Extract all text content from .document-tile--text (reference existing DOM node)
    const textBlock = card.querySelector('.document-tile--text');
    let textCell = [];
    if (textBlock) {
      // Title as <strong>
      const title = textBlock.querySelector('.document-tile--title');
      if (title) {
        const strong = document.createElement('strong');
        strong.textContent = title.textContent.trim();
        textCell.push(strong);
      }
      // Description: iterate child nodes for text, keeping semantic breaks
      const desc = textBlock.querySelector('.document-tile--description');
      if (desc) {
        Array.from(desc.childNodes).forEach((node, idx, arr) => {
          if (node.nodeType === 3) {
            const txt = node.textContent.replace(/\s+/g,' ').trim();
            if (txt) textCell.push(document.createTextNode(txt));
          } else if (node.nodeType === 1) {
            const txt = node.textContent.replace(/\s+/g,' ').trim();
            if (txt) textCell.push(document.createTextNode(txt));
          }
          // Add <br> unless last node (to separate lines, as in example)
          if (idx !== arr.length - 1) {
            textCell.push(document.createElement('br'));
          }
        });
      }
      // For semantic correctness, add download CTA if present
      const buttons = textBlock.querySelector('.document-tile--buttons');
      if (buttons) {
        const downloadLink = buttons.querySelector('a[rel="download"][href*=".pdf"]');
        if (downloadLink) {
          textCell.push(document.createElement('br'));
          const cta = document.createElement('a');
          cta.href = downloadLink.href;
          cta.textContent = 'Download';
          textCell.push(cta);
        }
      }
    }
    // If no textBlock, fallback to all card text
    if (textCell.length === 0) {
      textCell.push(document.createTextNode(card.textContent.trim()));
    }
    // Only add row if actual content exists
    if (img || textCell.length) {
      rows.push([
        img ? img : '',
        textCell
      ]);
    }
  });

  // Only replace if at least one card was found
  if (rows.length > 1) {
    const table = WebImporter.DOMUtils.createTable(rows, document);
    // Merge header row cells for proper table formatting
    const tr = table.querySelector('tr');
    if (tr && tr.children.length === 1) {
      tr.firstElementChild.setAttribute('colspan', '2');
    }
    element.replaceWith(table);
  }
}
