/* global WebImporter */
export default function parse(element, { document }) {
  const headerRow = ['Cards (cardsNoImages28)'];
  const cells = [headerRow];

  // All card elements are immediate children
  const appointments = element.querySelectorAll(':scope > .upcoming-appointment');

  appointments.forEach((appt) => {
    const cardContent = document.createElement('div');

    // Compose the visual date (big number + month year)
    const dateDiv = appt.querySelector(':scope > .upcoming-appointment--date');
    if (dateDiv) {
      const day = dateDiv.querySelector('.upcoming-appointment--date-day');
      const monthYear = dateDiv.querySelector('.upcoming-appointment--date-month-year');
      if (day && monthYear) {
        // Visual arrangement: day + monthYear (not a heading, just visual)
        const dateLine = document.createElement('div');
        dateLine.append(document.createTextNode(day.textContent.trim() + ' ' + monthYear.textContent.trim()));
        cardContent.appendChild(dateLine);
      }
    }

    // Title as bold/strong
    const titleDiv = appt.querySelector(':scope > .upcoming-appointment--title');
    if (titleDiv) {
      const strong = document.createElement('strong');
      strong.textContent = titleDiv.textContent.trim();
      cardContent.appendChild(strong);
      cardContent.appendChild(document.createElement('br'));
    }
    // Full date (small text underneath)
    const fullDateDiv = appt.querySelector(':scope > .upcoming-appointment--full-date > span');
    if (fullDateDiv) {
      const fullDateText = document.createElement('div');
      fullDateText.textContent = fullDateDiv.textContent.trim();
      cardContent.appendChild(fullDateText);
    }
    // Actions (CTAs)
    const actionsDiv = appt.querySelector(':scope > .upcoming-appointment--actions');
    if (actionsDiv) {
      // Only references to existing <a> elements, and removes icon elements
      const actionLinks = Array.from(actionsDiv.querySelectorAll(':scope > a'));
      if (actionLinks.length) {
        const actionRow = document.createElement('div');
        actionRow.style.marginTop = '8px';
        actionLinks.forEach(link => {
          // Remove any icon divs inside link
          Array.from(link.querySelectorAll('div.icon')).forEach(icon => icon.remove());
          actionRow.appendChild(link);
        });
        cardContent.appendChild(actionRow);
      }
    }
    cells.push([cardContent]);
  });
  // Replace element
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
