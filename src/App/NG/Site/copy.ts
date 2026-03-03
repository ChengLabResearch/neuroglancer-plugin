
// @ts-nocheck
// Set overlay copy safely without renaming existing elements or breaking wiring.

const COPY = {
  heroTitle: 'Whole-animal neural architecture from a 3D digital octopus',
  heroSub:
    'Interactive companion to “Whole-animal Characterization of Distributed Neural Architecture from a 3D Digital Octopus.” Explore a submicron-voxel histotomography volume of a centimeter-scale octopus with a color-coded segmentation ontology, figure-aligned presets, and shareable Neuroglancer states.',

  oneSentenceLabel: 'One-sentence summary',
  oneSentenceText:
    'MicroCT-derived digital replicas of centimeter-scale organisms enable quantitative mapping of widely distributed organ systems.',

  quickStartTitle: 'Quick start',
  quickStartBullets: [
    'Toggle the Ontology drawer (bottom-left) to browse labels and lock visibility.',
    'Hover figure cards on the left to preview; click “Load preset” to open the view.',
    'Right-click a layer tab to select it; use the Tools gear for Rotate, Home/Reset, Share, and Points↔Lines (for annotations).',
    'Scroll to zoom, drag to rotate; Shift + drag to pan.',
    'Press Ctrl + Space to mute/unmute non-image layers.',
    'Use “Open preset by ID” to paste a saved state (the viewer also reads `?j=` in the URL).',
  ],

  highlightsTitle: 'Highlights from the manuscript',
  highlightsBullets: [
    'Digital whole animal reconstructed by synchrotron microCT histotomography (submicron voxels).',
    '3D mapping of long-range sucker-to-brain chemotactile pathways.',
    'Continuity of the intermediate longitudinal tract (iLT) along each arm into central circuits.',
    'Arm-to-arm U-tracts within the nerve ring supporting peripheral communication.',
    'Subdivisions of the nerve ring and contextual views of organ systems in situ.',
    'Integrated segmentation ontology, annotations, and figure-aligned Neuroglancer presets.',
  ],

  whatTitle: 'What is this?',
  whatBody:
    'This viewer accompanies the OCTOPUS histotomography manuscript and streams the reconstructed volume alongside a color-coded segmentation ontology. The overlay adds rotation controls, shareable presets aligned to figures, and quick tools on top of Neuroglancer. It is meant for exploration; the manuscript is the definitive record of methods and results.',

  dataTitle: 'Data & code availability',
  dataBody:
    'All raw and annotated volumes (~2.6 TB) and interactive viewing links are provided with the manuscript (see Table S1). Data are CloudVolume-ready; segmentation and annotations can be downloaded. Contact the corresponding authors for additional code or data transfer details.',

  cardCopy: {
    panelA: { label: 'Rendered overview (external asset)', alt: 'Rendered overview of the digital octopus' },
    panelB: { label: 'Long-range suckers→brain chemotactile connections', alt: 'Preview of long-range suckers-to-brain connections' },
    panelC: { label: 'Intermediate Longitudinal Tract (iLT) along arm into brain', alt: 'Preview of intermediate longitudinal tract (iLT)' },
    panelD: { label: 'Nerve ring subdivisions and arm-to-arm U-tracts', alt: 'Preview of nerve ring subdivisions and U-tracts' },
    panelE: { label: 'Whole-organism context: organ systems in situ', alt: 'Preview of whole-organism organ-system context' },
  },
};

function setText(el, text) {
  if (!el || !text) return;
  el.textContent = text;
}

function setHTML(el, html) {
  if (!el || !html) return;
  el.innerHTML = html;
}

function findHeadingByText(root, text) {
  const query = (sel) => Array.from(root.querySelectorAll(sel));
  const candidates = [...query('h1'), ...query('h2'), ...query('h3'), ...query('.section-title')];
  const lookup = (text || '').toLowerCase();
  return candidates.find((c) => (c.textContent || '').trim().toLowerCase() === lookup) || null;
}

export function initOverlayCopy() {
  const shell = document.getElementById('siteShell');
  if (!shell) return;

  const heroH1 = shell.querySelector('h1');
  const heroLead = heroH1?.nextElementSibling;
  setText(heroH1, COPY.heroTitle);
  if (heroLead) setText(heroLead, COPY.heroSub);

  let oneSentenceHeading =
    findHeadingByText(shell, 'one-sentence summary') || findHeadingByText(shell, 'one sentence summary');
  if (!oneSentenceHeading) {
    const heroCard = heroH1?.closest('.card') || shell;
    const block = document.createElement('div');
    block.className = 'one-line-summary';
    block.innerHTML = `
      <div class="summary-label">${COPY.oneSentenceLabel}</div>
      <div class="summary-text">${COPY.oneSentenceText}</div>
    `;
    heroCard?.appendChild(block);
  } else {
    const sibling = oneSentenceHeading.nextElementSibling;
    if (sibling) setText(sibling, COPY.oneSentenceText);
  }

  const qsHeading = findHeadingByText(shell, 'quick start');
  const qsList = qsHeading?.parentElement?.querySelector('ul');
  setText(qsHeading, COPY.quickStartTitle);
  if (qsList) {
    setHTML(
      qsList,
      COPY.quickStartBullets.map((item) => `<li>${item}</li>`).join('')
    );
  }

  const rightColCard = qsHeading?.closest('.card');
  if (rightColCard && !rightColCard.querySelector('#highlights')) {
    const wrap = document.createElement('div');
    wrap.id = 'highlights';
    wrap.innerHTML = `
      <h3>${COPY.highlightsTitle}</h3>
      <ul>${COPY.highlightsBullets.map((b) => `<li>${b}</li>`).join('')}</ul>
    `;
    rightColCard.appendChild(wrap);
  }

  const whatHeading = findHeadingByText(shell, 'what is this?') || findHeadingByText(shell, 'what is this');
  if (whatHeading) {
    const body = whatHeading.parentElement?.querySelector('p') || whatHeading.nextElementSibling;
    setText(whatHeading, COPY.whatTitle);
    if (body) setText(body, COPY.whatBody);
  }

  let dataHeading =
    findHeadingByText(shell, 'data & code availability') ||
    findHeadingByText(shell, 'data & code') ||
    findHeadingByText(shell, 'data and code');
  if (!dataHeading && whatHeading?.parentElement) {
    const block = document.createElement('div');
    block.innerHTML = `<h3>${COPY.dataTitle}</h3><p>${COPY.dataBody}</p>`;
    whatHeading.parentElement.appendChild(block);
  } else if (dataHeading) {
    const body = dataHeading.parentElement?.querySelector('p') || dataHeading.nextElementSibling;
    setText(dataHeading, COPY.dataTitle);
    if (body) setText(body, COPY.dataBody);
  }

  const cards = Array.from(shell.querySelectorAll('.preset-card'));
  cards.forEach((card) => {
    const key = (card.getAttribute('data-preview-key') || '').toLowerCase();
    const imgEl = card.querySelector('.preset-card-thumb img') || card.querySelector('img');
    const desc = card.querySelector('.preset-desc, .subtle, small, .desc, .figure-panel-description');

    let copy = null;
    if (key.includes('panel_a')) copy = COPY.cardCopy.panelA;
    else if (key.includes('panel_b')) copy = COPY.cardCopy.panelB;
    else if (key.includes('panel_c')) copy = COPY.cardCopy.panelC;
    else if (key.includes('panel_d')) copy = COPY.cardCopy.panelD;
    else if (key.includes('panel_e')) copy = COPY.cardCopy.panelE;

    if (desc && copy?.label) setText(desc, copy.label);
    if (imgEl && copy?.alt) imgEl.alt = copy.alt;
  });
}
