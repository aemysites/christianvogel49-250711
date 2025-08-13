/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards18)'];
  const cells = [headerRow];

  // Find all columns/cards (should be two from the HTML example)
  const cardColumns = Array.from(element.querySelectorAll(':scope > .container-fluid > .row > .page-item--column'));

  cardColumns.forEach((col) => {
    const quoteItem = col.querySelector('.page-item--quotation');
    if (!quoteItem) return;
    // Get the image: prefer the .quote--image img in blockquote, fall back to .quote-container--image
    let img = null;
    let imgContainer = quoteItem.querySelector('blockquote .quote--image img');
    if (!imgContainer) {
      imgContainer = quoteItem.querySelector('.quote-container--image img');
    }
    if (imgContainer) img = imgContainer;

    // Get the quote text (excluding the image)
    let blockquote = quoteItem.querySelector('blockquote.quote--text');
    let quoteText = '';
    if (blockquote) {
      // Remove the .quote--image from blockquote when extracting text
      const temp = blockquote.cloneNode(true);
      const imgDiv = temp.querySelector('.quote--image');
      if (imgDiv) imgDiv.remove();
      quoteText = temp.textContent.trim();
    }

    // Get author and role from figcaption
    let author = '';
    let role = '';
    const figcaption = quoteItem.querySelector('figcaption');
    if (figcaption) {
      const strong = figcaption.querySelector('strong');
      if (strong) {
        author = strong.textContent.trim();
        // Get the rest of the figcaption text after the strong
        let fcClone = figcaption.cloneNode(true);
        const strongClone = fcClone.querySelector('strong');
        if (strongClone) strongClone.remove();
        role = fcClone.textContent.trim().replace(/^,?\s*/, '');
      } else {
        // If no strong, all is role
        role = figcaption.textContent.trim();
      }
    }

    // Construct the text cell: title (author) as strong, role as plain, then quote text below
    const textCell = document.createElement('div');
    if (author) {
      const authorStrong = document.createElement('strong');
      authorStrong.textContent = author;
      textCell.appendChild(authorStrong);
    }
    if (role) {
      if (author) textCell.appendChild(document.createElement('br'));
      const roleSpan = document.createElement('span');
      roleSpan.textContent = role;
      textCell.appendChild(roleSpan);
    }
    if (quoteText) {
      if (author || role) textCell.appendChild(document.createElement('br'));
      const quotePara = document.createElement('div');
      quotePara.textContent = quoteText;
      textCell.appendChild(quotePara);
    }

    // Add the row: [image, textCell]
    cells.push([
      img || '',
      textCell
    ]);
  });

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
