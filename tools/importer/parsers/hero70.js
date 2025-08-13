/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row: block name exactly as in the example
  const headerRow = ['Hero (hero70)'];

  // 2. Second row: the image (with caption)
  let imageRowContent = null;
  const imageItem = element.querySelector('.page-item--image');
  if (imageItem) {
    imageRowContent = imageItem;
  } else {
    imageRowContent = '';
  }

  // 3. Third row: title, text, and cta (all content block, no splitting)
  //   Should include the headline (h2), and the entire text block
  const blockContent = [];
  // Headline (h2)
  const headlineItem = element.querySelector('.page-item--headline');
  if (headlineItem) {
    // Use the h2 directly, if present
    const h2 = headlineItem.querySelector('h2');
    if (h2) blockContent.push(h2);
  }
  // Text (all paragraphs, strong, links, etc.)
  const textItem = element.querySelector('.page-item--text');
  if (textItem) {
    // Append all child nodes of the text block in order (preserves <p>, <strong>, <a>, etc)
    const textBlock = textItem.querySelector('.text-block');
    if (textBlock) {
      Array.from(textBlock.childNodes).forEach((node) => {
        blockContent.push(node);
      });
    } else {
      // fallback: add the textItem itself
      blockContent.push(textItem);
    }
  }

  // If no content, ensure the row is at least an empty string
  const contentRow = [blockContent.length ? blockContent : ''];

  // Compose the block table
  const cells = [
    headerRow,
    [imageRowContent],
    contentRow,
  ];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(block);
}
