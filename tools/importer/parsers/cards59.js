/* global WebImporter */
export default function parse(element, { document }) {
  // Cards Block: header row, then one row per card (image | text)
  const rows = [];
  // Header row: exactly as in example
  rows.push(['Cards (cards59)']);

  // Find all document tiles (cards)
  const cards = element.querySelectorAll('.document-tile');
  cards.forEach(card => {
    // --- Image Cell ---
    let img = card.querySelector('img');
    let imgCell = img || '';

    // --- Text Cell ---
    // We want ALL text: title, date, type, and any links
    const textParts = [];
    // Find the main text link (contains title and description)
    const mainTextLink = card.querySelector('.document-tile--text > a');
    if (mainTextLink) {
      // Title (styled as heading, use <strong>)
      const titleDiv = mainTextLink.querySelector('.document-tile--title');
      if (titleDiv && titleDiv.textContent.trim()) {
        const strong = document.createElement('strong');
        strong.textContent = titleDiv.textContent.trim();
        textParts.push(strong);
      }
      // Description
      const descDiv = mainTextLink.querySelector('.document-tile--description');
      if (descDiv) {
        // Compose description: date and type (with separator as in example)
        const time = descDiv.querySelector('time');
        const type = descDiv.querySelector('span');
        let descString = '';
        if (time && time.textContent.trim()) {
          descString += time.textContent.trim();
        }
        if (type && type.textContent.trim()) {
          if (descString) descString += ' · ';
          descString += type.textContent.trim();
        }
        if (descString) {
          textParts.push(document.createElement('br'));
          textParts.push(descString);
        }
      }
      // CTA: main PDF link
      if (mainTextLink.href) {
        textParts.push(document.createElement('br'));
        const cta = document.createElement('a');
        cta.href = mainTextLink.href;
        cta.textContent = 'PDF anzeigen';
        textParts.push(cta);
      }
    }
    // Fallback: if nothing found, use all text from card
    if (textParts.length === 0) {
      const fallbackText = card.textContent.trim();
      if (fallbackText) textParts.push(fallbackText);
    }
    // Add this card row
    rows.push([imgCell, textParts]);
  });

  // Create the table with exactly the expected structure
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
