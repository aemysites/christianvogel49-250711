import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

// media query match that indicates mobile/tablet width
const isDesktop = window.matchMedia('(min-width: 900px)');

function closeOnEscape(e) {
  if (e.code === 'Escape') {
    const nav = document.getElementById('nav');
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections);
      navSectionExpanded.focus();
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections);
      nav.querySelector('button').focus();
    }
  }
}

function closeOnFocusLost(e) {
  const nav = e.currentTarget;
  if (!nav.contains(e.relatedTarget)) {
    const navSections = nav.querySelector('.nav-sections');
    const navSectionExpanded = navSections.querySelector('[aria-expanded="true"]');
    if (navSectionExpanded && isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleAllNavSections(navSections, false);
    } else if (!isDesktop.matches) {
      // eslint-disable-next-line no-use-before-define
      toggleMenu(nav, navSections, false);
    }
  }
}

function openOnKeydown(e) {
  const focused = document.activeElement;
  const isNavDrop = focused.className === 'nav-drop';
  if (isNavDrop && (e.code === 'Enter' || e.code === 'Space')) {
    const dropExpanded = focused.getAttribute('aria-expanded') === 'true';
    // eslint-disable-next-line no-use-before-define
    toggleAllNavSections(focused.closest('.nav-sections'));
    focused.setAttribute('aria-expanded', dropExpanded ? 'false' : 'true');
  }
}

function focusNavSection() {
  document.activeElement.addEventListener('keydown', openOnKeydown);
}

/**
 * Toggles all nav sections
 * @param {Element} sections The container element
 * @param {Boolean} expanded Whether the element should be expanded or collapsed
 */
function toggleAllNavSections(sections, expanded = false) {
  if (!sections) return;
  
  const navItems = sections.querySelectorAll('ul > li');
  navItems.forEach((section) => {
    section.setAttribute('aria-expanded', expanded);
  });
}

/**
 * Toggles the entire nav
 * @param {Element} nav The container element
 * @param {Element} navSections The nav sections within the container element
 * @param {*} forceExpanded Optional param to force nav expand behavior when not null
 */
function toggleMenu(nav, navSections, forceExpanded = null) {
  const expanded = forceExpanded !== null ? !forceExpanded : nav.getAttribute('aria-expanded') === 'true';
  const button = nav.querySelector('.nav-hamburger button');
  
  if (button) {
    document.body.style.overflowY = (expanded || isDesktop.matches) ? '' : 'hidden';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    
    if (navSections) {
      toggleAllNavSections(navSections, expanded || isDesktop.matches ? 'false' : 'true');
    }
    
    button.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    
    // enable nav dropdown keyboard accessibility
    if (navSections) {
      const navDrops = navSections.querySelectorAll('.nav-drop');
      if (isDesktop.matches) {
        navDrops.forEach((drop) => {
          if (!drop.hasAttribute('tabindex')) {
            drop.setAttribute('tabindex', 0);
            drop.addEventListener('focus', focusNavSection);
          }
        });
      } else {
        navDrops.forEach((drop) => {
          drop.removeAttribute('tabindex');
          drop.removeEventListener('focus', focusNavSection);
        });
      }
    }

    // enable menu collapse on escape keypress
    if (!expanded || isDesktop.matches) {
      // collapse menu on escape press
      window.addEventListener('keydown', closeOnEscape);
      // collapse menu on focus lost
      nav.addEventListener('focusout', closeOnFocusLost);
    } else {
      window.removeEventListener('keydown', closeOnEscape);
      nav.removeEventListener('focusout', closeOnFocusLost);
    }
  }
}

/**
 * loads and decorates the header, mainly the nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  // Create the full Volkswagen Group navigation
  block.innerHTML = `
    <div class="nav-wrapper">
      <nav id="nav">
        <div class="nav-hamburger">
          <button type="button" aria-controls="nav" aria-label="Open navigation">
            <span class="nav-hamburger-icon"></span>
          </button>
        </div>
        
        <div class="nav-brand">
          <a href="/">
            <img src="./media_120d17a494997c66b44e7453eeacb80ab6d04fe13.png" 
                 alt="Volkswagen Group Logo" 
                 width="332" 
                 height="18">
          </a>
        </div>
        
        <div class="nav-sections">
          <ul>
            <li class="nav-drop" aria-expanded="false">
              <a href="/de/unternehmen-15765" class="nav-link">Unternehmen</a>
              <ul class="nav-dropdown">
                <li><a href="/de/ueber-uns-16013">Über Uns</a></li>
                <li><a href="/de/the-group-strategy-15955">The Group Strategy</a></li>
                <li><a href="/de/marken-und-markengruppen-15811">Marken & Markengruppen</a></li>
                <li><a href="/de/engagement-15956">Engagement</a></li>
                <li><a href="/de/ethik-risikomanagement-und-compliance-15952">Ethik, Risikomanagement & Compliance</a></li>
                <li><a href="/de/volkswagen-group-technology-16016">Volkswagen Group Technology</a></li>
                <li><a href="/de/info-hub-e-mobilitaet-18823">Info-Hub E-Mobilität</a></li>
              </ul>
            </li>
            
            <li class="nav-drop" aria-expanded="false">
              <a href="/de/medien-15771" class="nav-link">Medien</a>
              <ul class="nav-dropdown">
                <li><a href="/de/pressemitteilungen">Pressemitteilungen</a></li>
                <li><a href="/de/livestream-videos-16023">Livestream | Videos</a></li>
                <li><a href="/de/event-highlights-18120">Event Highlights</a></li>
                <li><a href="/de/medienkontakte-15997">Medienkontakte</a></li>
                <li><a href="/de/registrierung">E-Mail-Service</a></li>
              </ul>
            </li>
            
            <li class="nav-drop" aria-expanded="false">
              <a href="/de/investoren-15766" class="nav-link">Investoren</a>
              <ul class="nav-dropdown">
                <li><a href="/de/warum-in-die-volkswagen-group-investieren-18603">Warum in die Volkswagen Group investieren?</a></li>
                <li><a href="/de/aktien-15791">Aktien</a></li>
                <li><a href="/de/fremdkapital-und-ratings-16034">Fremdkapital & Ratings</a></li>
                <li><a href="/de/finanzberichte-und-publikationen-16121">Finanzberichte & Publikationen</a></li>
                <li><a href="/de/finanzmitteilungen-16031">Finanzmitteilungen</a></li>
                <li><a href="/de/hauptversammlung-2025-18801">Hauptversammlung</a></li>
                <li><a href="/de/corporate-governance-15789">Corporate Governance</a></li>
              </ul>
            </li>
            
            <li class="nav-drop" aria-expanded="false">
              <a href="/de/nachhaltigkeit-15772" class="nav-link">Nachhaltigkeit</a>
              <ul class="nav-dropdown">
                <li><a href="/de/nachhaltigkeitsstrategie-18157">Nachhaltigkeitsstrategie</a></li>
                <li><a href="/de/esg-performance-und-reporting-16040">ESG-Performance & Reporting</a></li>
                <li><a href="/de/stakeholderbeziehungen-17319">Stakeholderbeziehungen</a></li>
              </ul>
            </li>
            
            <li class="nav-drop" aria-expanded="false">
              <a href="/de/karriere-16057" class="nav-link">Karriere</a>
              <ul class="nav-dropdown">
                <li><a href="https://www.volkswagen-group.com/de/jobs-im-konzern-16105">Jobs</a></li>
              </ul>
            </li>
          </ul>
        </div>
        
        <div class="nav-tools">
          <div class="nav-languages">
            <span class="nav-lang">Deutsch</span>
            <span class="nav-lang">Englisch</span>
          </div>
        </div>
      </nav>
    </div>
  `;
  
  // Get the nav element and nav sections
  const nav = block.querySelector('#nav');
  const navSections = block.querySelector('.nav-sections');
  
  // Add event listeners for dropdowns
  const navDrops = block.querySelectorAll('.nav-drop');
  navDrops.forEach(drop => {
    const link = drop.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
      if (isDesktop.matches) {
        e.preventDefault();
        const expanded = drop.getAttribute('aria-expanded') === 'true';
        
        // Close all other dropdowns
        navDrops.forEach(otherDrop => {
          if (otherDrop !== drop) {
            otherDrop.setAttribute('aria-expanded', 'false');
          }
        });
        
        // Toggle current dropdown
        drop.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      }
    });
  });
  
  // Add hamburger menu functionality
  const hamburger = block.querySelector('.nav-hamburger button');
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    
    // Update button label
    hamburger.setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
    
    // Toggle body scroll
    document.body.style.overflowY = expanded ? '' : 'hidden';
  });
  
  // Set initial state
  nav.setAttribute('aria-expanded', 'false');
  
  // Handle desktop vs mobile behavior
  const handleResize = () => {
    if (isDesktop.matches) {
      // On desktop, ensure navigation is visible
      navSections.style.display = 'block';
      navSections.style.visibility = 'visible';
    } else {
      // On mobile, navigation visibility controlled by aria-expanded
      navSections.style.display = nav.getAttribute('aria-expanded') === 'true' ? 'block' : 'none';
    }
  };
  
  // Set initial state and listen for resize
  handleResize();
  isDesktop.addEventListener('change', handleResize);
}
