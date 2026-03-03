export const CSV_URL = '';
export const DEFAULT_STATE_URL = './assets/empty_state.json';
export const TARGET_LAYER_NAME = 'Segmentation Labels';
export const NEUROGLANCER_SCRIPT_URLS = [
  './assets/js/822.f53317e7d19e4212.js',
  './assets/js/213.e4e7d7e2081b694d.js',
  './assets/js/205.6aca511f175e6a71.js',
  './assets/js/51.34ccb8152bac0c2a.js',
  './assets/js/main.e5a9481658d9aca6.js'
];

/**
 * Default hover preview policies for ontology roots.
 * Keys are root IDs (Parent ID === "[]"). Values:
 *  - "full": show hovered branch + all descendants (current behavior)
 *  - "tipOnly": only show the hovered entry
 *  - "none": do not alter visibility on hover (info card still updates)
export const HOVER_PREVIEW_DEFAULT_POLICIES: Record<string, 'full' | 'tipOnly' | 'none'> = {};
 */
export const HOVER_PREVIEW_DEFAULT_POLICIES = {};
