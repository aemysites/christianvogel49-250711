/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare table rows: header first, then one row per card
  const cells = [['Cards (cards11)']];

  // Get all card columns
  const columns = element.querySelectorAll(':scope .for-column-items > .page-item--column');

  // Helper to extract image and all associated text for a card column
  function extractImageAndText(col) {
    let imgEl = null;
    let textEl = null;
    // Prefer figure > img for image
    const img = col.querySelector('figure img');
    if (img) imgEl = img;
    // Prefer .flex-float--text.text-block for text block, else fallback to all text
    const textBlock = col.querySelector('.flex-float--text.text-block');
    if (textBlock) {
      textEl = textBlock;
    } else {
      // Fallback: all paragraphs inside column
      const ps = col.querySelectorAll('p');
      if (ps.length) {
        const div = document.createElement('div');
        ps.forEach(p => div.appendChild(p));
        textEl = div;
      } else {
        // Fallback: all text nodes
        const div = document.createElement('div');
        div.textContent = col.textContent.trim();
        textEl = div;
      }
    }
    return [imgEl, textEl];
  }

  // Helper for document card
  function extractDocumentCard(col) {
    // Get the .document-tile
    const docTile = col.querySelector('.document-tile');
    if (!docTile) return [null, null];
    // Image
    const docImg = docTile.querySelector('img');
    // Text: combine .document-tile--title and .document-tile--description
    const docTitle = docTile.querySelector('.document-tile--title');
    const docDesc = docTile.querySelector('.document-tile--description');
    const textArr = [];
    if (docTitle) {
      const strong = document.createElement('strong');
      strong.textContent = docTitle.textContent.trim();
      textArr.push(strong);
    }
    if (docDesc) {
      const div = document.createElement('div');
      // Include all content (dates, spans)
      Array.from(docDesc.childNodes).forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          div.append(node.cloneNode(true));
        }
      });
      textArr.push(div);
    }
    // Compose textEl
    let textEl = null;
    if (textArr.length) {
      const wrapper = document.createElement('div');
      textArr.forEach(e => wrapper.appendChild(e));
      textEl = wrapper;
    }
    return [docImg, textEl];
  }

  // Card 1: left column (DVD)
  if (columns[0]) {
    const [imgEl1, textEl1] = extractImageAndText(columns[0]);
    // Only push if at least one is present
    if (imgEl1 || textEl1) {
      cells.push([imgEl1, textEl1]);
    }
  }

  // Card 2: right column (Booklet)
  if (columns[1]) {
    const [imgEl2, textEl2] = extractDocumentCard(columns[1]);
    // Only push if at least one is present
    if (imgEl2 || textEl2) {
      cells.push([imgEl2, textEl2]);
    }
  }

  // Create and replace table in DOM
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
