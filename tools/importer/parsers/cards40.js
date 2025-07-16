/* global WebImporter */
export default function parse(element, { document }) {
  // Find both columns in the component
  const columns = Array.from(element.querySelectorAll('.for-column-items > .page-item--column'));
  const cards = [];

  columns.forEach((column) => {
    // Each column should have a .page-item--quotation > figure.quote-container
    const quotation = column.querySelector('.page-item--quotation');
    if (!quotation) return;
    const figure = quotation.querySelector('figure.quote-container');
    if (!figure) return;

    // LEFT CELL: Image.
    // Use .quote-container--image img if available, else .quote--image img
    let img = null;
    const landscape = figure.querySelector('.quote-container--image img');
    if (landscape) {
      img = landscape;
    } else {
      const portrait = figure.querySelector('.quote--image img');
      if (portrait) img = portrait;
    }
    if (!img) return;

    // RIGHT CELL: Text content (quote + author/role)
    const cellContent = [];

    // Blockquote text (excluding the image node inside)
    const blockquote = figure.querySelector('blockquote.quote--text');
    if (blockquote) {
      // We'll create a paragraph with the text content after the image inside blockquote
      // blockquote.firstChild is the image div, then the text node follows
      // We'll collect all text nodes after the image div
      let text = '';
      for (const node of blockquote.childNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          text += node.textContent;
        } else if (node.nodeType === Node.ELEMENT_NODE && !node.classList.contains('quote--image')) {
          text += node.textContent;
        }
      }
      // Add as a <p>
      if (text.trim()) {
        const p = document.createElement('p');
        p.textContent = text.trim();
        cellContent.push(p);
      }
    }

    // Author + Role in figcaption
    const figcaption = figure.querySelector('.quote--caption figcaption');
    if (figcaption) {
      // The first child <strong> is the name, the rest is the role
      // We'll wrap name in <strong>, role in a <div> below it
      const strong = figcaption.querySelector('strong');
      if (strong) {
        const strongEl = document.createElement('strong');
        strongEl.textContent = strong.textContent.trim();
        cellContent.push(strongEl);
        // Rest of the figcaption text (remove the strong node)
        let roleText = '';
        for (const node of figcaption.childNodes) {
          if (node !== strong && node.nodeType === Node.TEXT_NODE) {
            roleText += node.textContent;
          }
        }
        if (roleText.trim()) {
          const roleDiv = document.createElement('div');
          roleDiv.textContent = roleText.trim();
          cellContent.push(roleDiv);
        }
      } else {
        // fallback: append the whole figcaption
        cellContent.push(figcaption);
      }
    }

    // Add the row to cards
    cards.push([img, cellContent]);
  });

  // Block table with the header row and the cards
  const table = WebImporter.DOMUtils.createTable([
    ['Cards (cards40)'],
    ...cards
  ], document);

  element.replaceWith(table);
}
