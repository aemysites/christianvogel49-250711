/*
 * Copyright 2024 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */
/* global WebImporter */
/* eslint-disable no-console */
import columns6Parser from './parsers/columns6.js';
import columns8Parser from './parsers/columns8.js';
import hero4Parser from './parsers/hero4.js';
import columns5Parser from './parsers/columns5.js';
import columns9Parser from './parsers/columns9.js';
import hero12Parser from './parsers/hero12.js';
import columns15Parser from './parsers/columns15.js';
import columns2Parser from './parsers/columns2.js';
import hero17Parser from './parsers/hero17.js';
import cards11Parser from './parsers/cards11.js';
import columns1Parser from './parsers/columns1.js';
import cards21Parser from './parsers/cards21.js';
import accordion7Parser from './parsers/accordion7.js';
import columns23Parser from './parsers/columns23.js';
import cardsNoImages28Parser from './parsers/cardsNoImages28.js';
import cards3Parser from './parsers/cards3.js';
import cards29Parser from './parsers/cards29.js';
import hero31Parser from './parsers/hero31.js';
import cards20Parser from './parsers/cards20.js';
import hero32Parser from './parsers/hero32.js';
import embedVideo19Parser from './parsers/embedVideo19.js';
import cards35Parser from './parsers/cards35.js';
import cards26Parser from './parsers/cards26.js';
import columns36Parser from './parsers/columns36.js';
import cards34Parser from './parsers/cards34.js';
import columns33Parser from './parsers/columns33.js';
import accordion38Parser from './parsers/accordion38.js';
import columns16Parser from './parsers/columns16.js';
import hero42Parser from './parsers/hero42.js';
import columns41Parser from './parsers/columns41.js';
import columns45Parser from './parsers/columns45.js';
import search25Parser from './parsers/search25.js';
import columns37Parser from './parsers/columns37.js';
import columns48Parser from './parsers/columns48.js';
import cards18Parser from './parsers/cards18.js';
import columns43Parser from './parsers/columns43.js';
import hero52Parser from './parsers/hero52.js';
import columns53Parser from './parsers/columns53.js';
import columns55Parser from './parsers/columns55.js';
import columns57Parser from './parsers/columns57.js';
import cards54Parser from './parsers/cards54.js';
import cards59Parser from './parsers/cards59.js';
import cards27Parser from './parsers/cards27.js';
import cards51Parser from './parsers/cards51.js';
import columns61Parser from './parsers/columns61.js';
import tabs44Parser from './parsers/tabs44.js';
import columns62Parser from './parsers/columns62.js';
import columns24Parser from './parsers/columns24.js';
import cards63Parser from './parsers/cards63.js';
import cards65Parser from './parsers/cards65.js';
import hero66Parser from './parsers/hero66.js';
import columns68Parser from './parsers/columns68.js';
import cardsNoImages67Parser from './parsers/cardsNoImages67.js';
import hero70Parser from './parsers/hero70.js';
import columns74Parser from './parsers/columns74.js';
import columns60Parser from './parsers/columns60.js';
import tabs30Parser from './parsers/tabs30.js';
import columns58Parser from './parsers/columns58.js';
import columns75Parser from './parsers/columns75.js';
import columns79Parser from './parsers/columns79.js';
import cardsNoImages76Parser from './parsers/cardsNoImages76.js';
import columns77Parser from './parsers/columns77.js';
import columns81Parser from './parsers/columns81.js';
import columns80Parser from './parsers/columns80.js';
import hero85Parser from './parsers/hero85.js';
import hero87Parser from './parsers/hero87.js';
import columns88Parser from './parsers/columns88.js';
import cards82Parser from './parsers/cards82.js';
import cards83Parser from './parsers/cards83.js';
import columns90Parser from './parsers/columns90.js';
import tabs47Parser from './parsers/tabs47.js';
import cards92Parser from './parsers/cards92.js';
import cards94Parser from './parsers/cards94.js';
import cards91Parser from './parsers/cards91.js';
import columns97Parser from './parsers/columns97.js';
import cards71Parser from './parsers/cards71.js';
import columns93Parser from './parsers/columns93.js';
import columns95Parser from './parsers/columns95.js';
import columns98Parser from './parsers/columns98.js';
import columns101Parser from './parsers/columns101.js';
import cards99Parser from './parsers/cards99.js';
import columns102Parser from './parsers/columns102.js';
import cards103Parser from './parsers/cards103.js';
import hero100Parser from './parsers/hero100.js';
import columns107Parser from './parsers/columns107.js';
import cardsNoImages109Parser from './parsers/cardsNoImages109.js';
import columns105Parser from './parsers/columns105.js';
import columns110Parser from './parsers/columns110.js';
import cards111Parser from './parsers/cards111.js';
import cards114Parser from './parsers/cards114.js';
import cards69Parser from './parsers/cards69.js';
import columns117Parser from './parsers/columns117.js';
import cards106Parser from './parsers/cards106.js';
import columns115Parser from './parsers/columns115.js';
import hero46Parser from './parsers/hero46.js';
import cardsNoImages119Parser from './parsers/cardsNoImages119.js';
import cards120Parser from './parsers/cards120.js';
import columns122Parser from './parsers/columns122.js';
import hero123Parser from './parsers/hero123.js';
import columns121Parser from './parsers/columns121.js';
import columns112Parser from './parsers/columns112.js';
import cards86Parser from './parsers/cards86.js';
import columns125Parser from './parsers/columns125.js';
import cards126Parser from './parsers/cards126.js';
import columns127Parser from './parsers/columns127.js';
import columns129Parser from './parsers/columns129.js';
import cards130Parser from './parsers/cards130.js';
import columns131Parser from './parsers/columns131.js';
import cards132Parser from './parsers/cards132.js';
import cards89Parser from './parsers/cards89.js';
import columns124Parser from './parsers/columns124.js';
import cards136Parser from './parsers/cards136.js';
import hero141Parser from './parsers/hero141.js';
import tableStripedBordered138Parser from './parsers/tableStripedBordered138.js';
import hero142Parser from './parsers/hero142.js';
import cards128Parser from './parsers/cards128.js';
import cards113Parser from './parsers/cards113.js';
import columns133Parser from './parsers/columns133.js';
import columns146Parser from './parsers/columns146.js';
import columns148Parser from './parsers/columns148.js';
import columns147Parser from './parsers/columns147.js';
import columns149Parser from './parsers/columns149.js';
import columns150Parser from './parsers/columns150.js';
import columns152Parser from './parsers/columns152.js';
import columns139Parser from './parsers/columns139.js';
import columns151Parser from './parsers/columns151.js';
import columns153Parser from './parsers/columns153.js';
import columns144Parser from './parsers/columns144.js';
import columns143Parser from './parsers/columns143.js';
import cards156Parser from './parsers/cards156.js';
import columns154Parser from './parsers/columns154.js';
import columns118Parser from './parsers/columns118.js';
import cards56Parser from './parsers/cards56.js';
import cards145Parser from './parsers/cards145.js';
import headerParser from './parsers/header.js';
import metadataParser from './parsers/metadata.js';
import cleanupTransformer from './transformers/cleanup.js';
import imageTransformer from './transformers/images.js';
import linkTransformer from './transformers/links.js';
import sectionsTransformer from './transformers/sections.js';
import { TransformHook } from './transformers/transform.js';
import { customParsers, customTransformers, customElements } from './import.custom.js';
import {
  generateDocumentPath,
  handleOnLoad,
  mergeInventory,
} from './import.utils.js';

const parsers = {
  metadata: metadataParser,
  columns6: columns6Parser,
  columns8: columns8Parser,
  hero4: hero4Parser,
  columns5: columns5Parser,
  columns9: columns9Parser,
  hero12: hero12Parser,
  columns15: columns15Parser,
  columns2: columns2Parser,
  hero17: hero17Parser,
  cards11: cards11Parser,
  columns1: columns1Parser,
  cards21: cards21Parser,
  accordion7: accordion7Parser,
  columns23: columns23Parser,
  cardsNoImages28: cardsNoImages28Parser,
  cards3: cards3Parser,
  cards29: cards29Parser,
  hero31: hero31Parser,
  cards20: cards20Parser,
  hero32: hero32Parser,
  embedVideo19: embedVideo19Parser,
  cards35: cards35Parser,
  cards26: cards26Parser,
  columns36: columns36Parser,
  cards34: cards34Parser,
  columns33: columns33Parser,
  accordion38: accordion38Parser,
  columns16: columns16Parser,
  hero42: hero42Parser,
  columns41: columns41Parser,
  columns45: columns45Parser,
  search25: search25Parser,
  columns37: columns37Parser,
  columns48: columns48Parser,
  cards18: cards18Parser,
  columns43: columns43Parser,
  hero52: hero52Parser,
  columns53: columns53Parser,
  columns55: columns55Parser,
  columns57: columns57Parser,
  cards54: cards54Parser,
  cards59: cards59Parser,
  cards27: cards27Parser,
  cards51: cards51Parser,
  columns61: columns61Parser,
  tabs44: tabs44Parser,
  columns62: columns62Parser,
  columns24: columns24Parser,
  cards63: cards63Parser,
  cards65: cards65Parser,
  hero66: hero66Parser,
  columns68: columns68Parser,
  cardsNoImages67: cardsNoImages67Parser,
  hero70: hero70Parser,
  columns74: columns74Parser,
  columns60: columns60Parser,
  tabs30: tabs30Parser,
  columns58: columns58Parser,
  columns75: columns75Parser,
  columns79: columns79Parser,
  cardsNoImages76: cardsNoImages76Parser,
  columns77: columns77Parser,
  columns81: columns81Parser,
  columns80: columns80Parser,
  hero85: hero85Parser,
  hero87: hero87Parser,
  columns88: columns88Parser,
  cards82: cards82Parser,
  cards83: cards83Parser,
  columns90: columns90Parser,
  tabs47: tabs47Parser,
  cards92: cards92Parser,
  cards94: cards94Parser,
  cards91: cards91Parser,
  columns97: columns97Parser,
  cards71: cards71Parser,
  columns93: columns93Parser,
  columns95: columns95Parser,
  columns98: columns98Parser,
  columns101: columns101Parser,
  cards99: cards99Parser,
  columns102: columns102Parser,
  cards103: cards103Parser,
  hero100: hero100Parser,
  columns107: columns107Parser,
  cardsNoImages109: cardsNoImages109Parser,
  columns105: columns105Parser,
  columns110: columns110Parser,
  cards111: cards111Parser,
  cards114: cards114Parser,
  cards69: cards69Parser,
  columns117: columns117Parser,
  cards106: cards106Parser,
  columns115: columns115Parser,
  hero46: hero46Parser,
  cardsNoImages119: cardsNoImages119Parser,
  cards120: cards120Parser,
  columns122: columns122Parser,
  hero123: hero123Parser,
  columns121: columns121Parser,
  columns112: columns112Parser,
  cards86: cards86Parser,
  columns125: columns125Parser,
  cards126: cards126Parser,
  columns127: columns127Parser,
  columns129: columns129Parser,
  cards130: cards130Parser,
  columns131: columns131Parser,
  cards132: cards132Parser,
  cards89: cards89Parser,
  columns124: columns124Parser,
  cards136: cards136Parser,
  hero141: hero141Parser,
  tableStripedBordered138: tableStripedBordered138Parser,
  hero142: hero142Parser,
  cards128: cards128Parser,
  cards113: cards113Parser,
  columns133: columns133Parser,
  columns146: columns146Parser,
  columns148: columns148Parser,
  columns147: columns147Parser,
  columns149: columns149Parser,
  columns150: columns150Parser,
  columns152: columns152Parser,
  columns139: columns139Parser,
  columns151: columns151Parser,
  columns153: columns153Parser,
  columns144: columns144Parser,
  columns143: columns143Parser,
  cards156: cards156Parser,
  columns154: columns154Parser,
  columns118: columns118Parser,
  cards56: cards56Parser,
  cards145: cards145Parser,
  ...customParsers,
};

const transformers = {
  cleanup: cleanupTransformer,
  images: imageTransformer,
  links: linkTransformer,
  sections: sectionsTransformer,
  ...customTransformers,
};

// Additional page elements to parse that are not included in the inventory
const pageElements = [{ name: 'metadata' }, ...customElements];

WebImporter.Import = {
  findSiteUrl: (instance, siteUrls) => (
    siteUrls.find(({ id }) => id === instance.urlHash)
  ),
  transform: (hookName, element, payload) => {
    // perform any additional transformations to the page
    Object.values(transformers).forEach((transformerFn) => (
      transformerFn.call(this, hookName, element, payload)
    ));
  },
  getParserName: ({ name, key }) => key || name,
  getElementByXPath: (document, xpath) => {
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null,
    );
    return result.singleNodeValue;
  },
  getFragmentXPaths: (
    { urls = [], fragments = [] },
    sourceUrl = '',
  ) => (fragments.flatMap(({ instances = [] }) => instances)
    .filter((instance) => {
      // find url in urls array
      const siteUrl = WebImporter.Import.findSiteUrl(instance, urls);
      if (!siteUrl) {
        return false;
      }
      return siteUrl.url === sourceUrl;
    })
    .map(({ xpath }) => xpath)),
};

/**
* Page transformation function
*/
function transformPage(main, { inventory, ...source }) {
  const { urls = [], blocks: inventoryBlocks = [] } = inventory;
  const { document, params: { originalURL } } = source;

  // get fragment elements from the current page
  const fragmentElements = WebImporter.Import.getFragmentXPaths(inventory, originalURL)
    .map((xpath) => WebImporter.Import.getElementByXPath(document, xpath))
    .filter((el) => el);

  // get dom elements for each block on the current page
  const blockElements = inventoryBlocks
    .flatMap((block) => block.instances
      .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
      .map((instance) => ({
        ...block,
        uuid: instance.uuid,
        section: instance.section,
        element: WebImporter.Import.getElementByXPath(document, instance.xpath),
      })))
    .filter((block) => block.element);

  const defaultContentElements = inventory.outliers
    .filter((instance) => WebImporter.Import.findSiteUrl(instance, urls)?.url === originalURL)
    .map((instance) => ({
      ...instance,
      element: WebImporter.Import.getElementByXPath(document, instance.xpath),
    }));

  // remove fragment elements from the current page
  fragmentElements.forEach((element) => {
    if (element) {
      element.remove();
    }
  });

  // before page transform hook
  WebImporter.Import.transform(TransformHook.beforePageTransform, main, { ...source });

  // transform all elements using parsers
  [...defaultContentElements, ...blockElements, ...pageElements]
    // sort elements by order in the page
    .sort((a, b) => (a.uuid ? parseInt(a.uuid.split('-')[1], 10) - parseInt(b.uuid.split('-')[1], 10) : 999))
    // filter out fragment elements
    .filter((item) => !fragmentElements.includes(item.element))
    .forEach((item, idx, arr) => {
      const { element = main, ...pageBlock } = item;
      const parserName = WebImporter.Import.getParserName(pageBlock);
      const parserFn = parsers[parserName];
      try {
        let parserElement = element;
        if (typeof parserElement === 'string') {
          parserElement = main.querySelector(parserElement);
        }
        // before parse hook
        WebImporter.Import.transform(
          TransformHook.beforeParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
            nextEl: arr[idx + 1],
          },
        );
        // parse the element
        if (parserFn) {
          parserFn.call(this, parserElement, { ...source });
        }
        // after parse hook
        WebImporter.Import.transform(
          TransformHook.afterParse,
          parserElement,
          {
            ...source,
            ...pageBlock,
          },
        );
      } catch (e) {
        console.warn(`Failed to parse block: ${parserName}`, e);
      }
    });
}

/**
* Fragment transformation function
*/
function transformFragment(main, { fragment, inventory, ...source }) {
  const { document, params: { originalURL } } = source;

  if (fragment.name === 'nav') {
    const navEl = document.createElement('div');

    // get number of blocks in the nav fragment
    const navBlocks = Math.floor(fragment.instances.length / fragment.instances.filter((ins) => ins.uuid.includes('-00-')).length);
    console.log('navBlocks', navBlocks);

    for (let i = 0; i < navBlocks; i += 1) {
      const { xpath } = fragment.instances[i];
      const el = WebImporter.Import.getElementByXPath(document, xpath);
      if (!el) {
        console.warn(`Failed to get element for xpath: ${xpath}`);
      } else {
        navEl.append(el);
      }
    }

    // body width
    const bodyWidthAttr = document.body.getAttribute('data-hlx-imp-body-width');
    const bodyWidth = bodyWidthAttr ? parseInt(bodyWidthAttr, 10) : 1000;

    try {
      const headerBlock = headerParser(navEl, {
        ...source, document, fragment, bodyWidth,
      });
      main.append(headerBlock);
    } catch (e) {
      console.warn('Failed to parse header block', e);
    }
  } else {
    (fragment.instances || [])
      .filter((instance) => {
        const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
        if (!siteUrl) {
          return false;
        }
        return `${siteUrl.url}#${fragment.name}` === originalURL;
      })
      .map(({ xpath }) => ({
        xpath,
        element: WebImporter.Import.getElementByXPath(document, xpath),
      }))
      .filter(({ element }) => element)
      .forEach(({ xpath, element }) => {
        main.append(element);

        const fragmentBlock = inventory.blocks
          .find(({ instances }) => instances.find((instance) => {
            const siteUrl = WebImporter.Import.findSiteUrl(instance, inventory.urls);
            return `${siteUrl.url}#${fragment.name}` === originalURL && instance.xpath === xpath;
          }));

        if (!fragmentBlock) return;
        const parserName = WebImporter.Import.getParserName(fragmentBlock);
        const parserFn = parsers[parserName];
        if (!parserFn) return;
        try {
          parserFn.call(this, element, source);
        } catch (e) {
          console.warn(`Failed to parse block: ${fragmentBlock.key}, with xpath: ${xpath}`, e);
        }
      });
  }
}

export default {
  onLoad: async (payload) => {
    await handleOnLoad(payload);
  },

  transform: async (source) => {
    const { document, params: { originalURL } } = source;

    /* eslint-disable-next-line prefer-const */
    let publishUrl = window.location.origin;
    // $$publishUrl = '{{{publishUrl}}}';

    let inventory = null;
    // $$inventory = {{{inventory}}};
    if (!inventory) {
      const siteUrlsUrl = new URL('/tools/importer/site-urls.json', publishUrl);
      const inventoryUrl = new URL('/tools/importer/inventory.json', publishUrl);
      try {
        // fetch and merge site-urls and inventory
        const siteUrlsResp = await fetch(siteUrlsUrl.href);
        const inventoryResp = await fetch(inventoryUrl.href);
        const siteUrls = await siteUrlsResp.json();
        inventory = await inventoryResp.json();
        inventory = mergeInventory(siteUrls, inventory, publishUrl);
      } catch (e) {
        console.error('Failed to merge site-urls and inventory');
      }
      if (!inventory) {
        return [];
      }
    }

    let main = document.body;

    // before transform hook
    WebImporter.Import.transform(TransformHook.beforeTransform, main, { ...source, inventory });

    // perform the transformation
    let path = null;
    const sourceUrl = new URL(originalURL);
    const fragName = sourceUrl.hash ? sourceUrl.hash.substring(1) : '';
    if (fragName) {
      // fragment transformation
      const fragment = inventory.fragments.find(({ name }) => name === fragName);
      if (!fragment) {
        return [];
      }
      main = document.createElement('div');
      transformFragment(main, { ...source, fragment, inventory });
      path = fragment.path;
    } else {
      // page transformation
      transformPage(main, { ...source, inventory });
      path = generateDocumentPath(source, inventory);
    }

    // after transform hook
    WebImporter.Import.transform(TransformHook.afterTransform, main, { ...source, inventory });

    return [{
      element: main,
      path,
    }];
  },
};
