/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the stage (contains heading and image)
  const stage = element.querySelector('.hero--stage');

  // 2. Get the background image figure (if present)
  let imageFigure = null;
  if (stage) {
    imageFigure = stage.querySelector('.hero--image');
  }
  // Ensure we're referencing the existing element
  let imageRow = [imageFigure ? imageFigure : ''];

  // 3. Get heading (if present)
  let headingEl = null;
  if (stage) {
    headingEl = stage.querySelector('h1, h2, h3, h4, h5, h6');
  }

  // 4. Get CTA links (if present)
  // The group of links is in .hero--smart-links .smart-link-group
  let linksContainer = null;
  const smartLinksGroup = element.querySelector('.hero--smart-links .smart-link-group');
  if (smartLinksGroup) {
    // Create a div and re-append all existing smart-link anchors in order
    linksContainer = document.createElement('div');
    smartLinksGroup.querySelectorAll('a.smart-link').forEach(a => {
      linksContainer.appendChild(a);
    });
  }

  // 5. Compose textual content cell (heading + optional links)
  const textCell = document.createElement('div');
  if (headingEl) {
    textCell.appendChild(headingEl);
  }
  if (linksContainer && linksContainer.childNodes.length > 0) {
    textCell.appendChild(linksContainer);
  }

  // 6. Build the table
  const cells = [
    ['Hero (hero12)'],
    imageRow,
    [textCell]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
