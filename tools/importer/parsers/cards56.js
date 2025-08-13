/* global WebImporter */
export default function parse(element, { document }) {
  // Create the header row exactly as the example
  const cells = [['Cards (cards56)']];

  // The main content area holding all cards
  const section = element.querySelector('.tile-section');
  if (!section) return;

  // Helper: Extract the media element (img, video link, or icon)
  function extractMedia(teaser) {
    const teaserImage = teaser.querySelector('.teaser--image');
    if (teaserImage) {
      const img = teaserImage.querySelector('img');
      if (img) return img;
      const video = teaserImage.querySelector('video');
      if (video) {
        // Use first source if available, otherwise video src
        let src = '';
        const source = video.querySelector('source[src]');
        if (source && source.src) src = source.src;
        else if (video.src) src = video.src;
        if (src) {
          const link = document.createElement('a');
          link.href = src;
          link.textContent = src.split('/').pop();
          return link;
        }
      }
    }
    // Fallback to icon if present
    const icon = teaser.querySelector('.teaser--icon, .icon');
    if (icon) return icon;
    return '';
  }

  // Helper: Extract ALL text content from teaser (title, description, cta)
  function extractText(teaser) {
    const result = [];

    // 1. Title (strong)
    const teaserTitle = teaser.querySelector('.teaser--title');
    if (teaserTitle) {
      // Remove any icon inside title
      const titleText = Array.from(teaserTitle.childNodes)
        .filter(node => {
          if (node.nodeType === 3) return true;
          if (node.nodeType === 1 && !node.classList.contains('teaser--icon') && !node.classList.contains('icon')) return true;
          return false;
        })
        .map(node => node.textContent.trim()).join(' ');
      if (titleText) {
        const strong = document.createElement('strong');
        strong.textContent = titleText;
        result.push(strong);
      }
    }

    // 2. Description: find all text nodes and elements not media or title or icon
    Array.from(teaser.childNodes).forEach(node => {
      if (node.nodeType === 3 && node.textContent.trim()) {
        // Text node not inside title or image
        result.push(document.createTextNode(node.textContent.trim()));
      }
      if (
        node.nodeType === 1 &&
        !node.classList.contains('teaser--image') &&
        !node.classList.contains('teaser--title') &&
        !node.classList.contains('teaser--icon') &&
        !node.classList.contains('icon') &&
        node.textContent.trim()
      ) {
        // Reference the actual element
        result.push(node);
      }
    });

    // 3. CTA: If the teaser is inside a link (and it's not duplicating the title text)
    const parentLink = teaser.closest('a.teaser');
    if (parentLink) {
      const ctaText = parentLink.textContent.trim();
      // Only add if not already present
      let found = false;
      for (let i = 0; i < result.length; i++) {
        if (result[i].textContent && result[i].textContent.trim() === ctaText) {
          found = true; break;
        }
      }
      if (!found && ctaText) {
        const cta = document.createElement('a');
        cta.href = parentLink.href;
        cta.textContent = ctaText;
        result.push(cta);
      }
    }

    // If result is empty, fallback to all text
    if (result.length === 0) {
      const fallback = teaser.textContent.trim();
      if (fallback) result.push(document.createTextNode(fallback));
    }
    // If only one element, just return that
    return result.length === 1 ? result[0] : result;
  }

  // Find all cards (teaser blocks) in both rows
  section.querySelectorAll('.row.for-column-items').forEach(row => {
    row.querySelectorAll('.page-item--teaser').forEach(teaser => {
      const media = extractMedia(teaser);
      const textCell = extractText(teaser);
      cells.push([media, textCell]);
    });
  });

  // Create the table and replace the element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
