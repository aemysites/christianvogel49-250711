/* global WebImporter */
export default function parse(element, { document }) {
  // Find the <ul class="anchor-nav"> containing the tab links
  const anchorNav = element.querySelector('ul.anchor-nav');
  if (!anchorNav) return;
  // Get all tab <a> links
  const tabLinks = Array.from(anchorNav.querySelectorAll('li.anchor-nav--item > a.anchor-nav--link'));
  // Build the table: header, then each tab label/content row
  const cells = [['Tabs (tabs44)']];
  tabLinks.forEach((link) => {
    // Reference the existing <a> element for the tab label
    const tabLabel = link;
    // There is no tab content shown in this navigation block, so cell 2 is left blank
    cells.push([tabLabel, '']);
  });
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
