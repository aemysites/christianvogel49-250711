/* global WebImporter */
export default function parse(element, { document }) {
  // Find all logo columns
  const columns = element.querySelectorAll(':scope .page-item--column');
  const content = [];
  columns.forEach((col, idx) => {
    // Find the image (should only be one per logo block)
    const img = col.querySelector('img');
    if (img) content.push(img);
    // Try to find visible text directly related to this logo (including descendants)
    // Gather all text content in the column, except from script/style
    let text = '';
    col.querySelectorAll('*').forEach((el) => {
      Array.from(el.childNodes).forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() && !['SCRIPT', 'STYLE'].includes(el.nodeName)) {
          text += (text ? ' ' : '') + node.textContent.trim();
        }
      });
    });
    if (text) {
      // Insert text after the image if present
      content.push(document.createTextNode(text));
    }
    // Add the external link underneath
    const imgLink = col.querySelector('a[href]');
    if (imgLink) {
      content.push(document.createElement('br'));
      const link = document.createElement('a');
      link.href = imgLink.href;
      link.textContent = imgLink.href;
      content.push(link);
    }
    // Add spacing between each logo block (except after the last)
    if (idx < columns.length - 1) {
      content.push(document.createElement('br'));
      content.push(document.createElement('br'));
    }
  });
  // Header row as shown in the markdown example
  const headerRow = ['Embed'];
  const contentRow = [content];
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);
  element.replaceWith(table);
}
