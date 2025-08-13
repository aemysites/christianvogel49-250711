/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cards29)'];
  const cardDivs = Array.from(element.querySelectorAll(':scope > div.masonry--item'));
  const rows = [headerRow];

  cardDivs.forEach(cardDiv => {
    const cardLink = cardDiv.querySelector('a.social-wall-card--link');
    if (!cardLink) return;

    // Get image element, reference it directly
    const imgSpan = cardLink.querySelector('.cropped-image');
    let img = '';
    if (imgSpan) {
      const realImg = imgSpan.querySelector('img');
      if (realImg) img = realImg;
    }

    // Get the label and posted-at info (network · age)
    const content = cardLink.querySelector('.social-wall-card--content');
    let textCellContent = [];
    if (content) {
      // Label (remove icon, keep everything else in label)
      const label = content.querySelector('.social-wall-card--label');
      if (label) {
        // Reference only the text and posted-at spans from the label
        const labelParts = [];
        label.childNodes.forEach(node => {
          if (node.nodeType === 1 && node.tagName === 'SPAN') {
            labelParts.push(node);
          } else if (node.nodeType === 3 && node.textContent.trim()) {
            // keep separator text (like '·')
            const span = document.createElement('span');
            span.textContent = node.textContent;
            labelParts.push(span);
          }
        });
        if (labelParts.length) {
          const labelDiv = document.createElement('div');
          labelParts.forEach(part => labelDiv.appendChild(part));
          textCellContent.push(labelDiv);
        }
      }
      // Main text
      const text = content.querySelector('.social-wall-card--text');
      if (text) {
        // Use a div to preserve formatting; reference directly
        textCellContent.push(text);
      }
    }
    // Always add CTA link as last item
    if (cardLink && cardLink.href) {
      const link = document.createElement('a');
      link.href = cardLink.href;
      link.textContent = 'View post';
      link.target = '_blank';
      textCellContent.push(link);
    }
    rows.push([
      img,
      textCellContent
    ]);
  });

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
