// @ts-nocheck

import { normalizeSegmentIdSeed, parseSegmentIdString } from './core';
import type { Ontology } from './core';
import { setStoredOntologyExpansion } from '../Site/shell';
import {
  ensureLayerLookup,
  getLayerByName,
  getVisibleSegments,
  mutateVisibleSegments,
} from '../Viewer/ng';
import { HOVER_PREVIEW_DEFAULT_POLICIES } from '../config';
import { getJSONStorageItem, setJSONStorageItem } from '../Utils/storage';

const HOVER_PREVIEW_STORAGE_KEY = 'hover_preview_policies';
const VALID_HOVER_PREVIEW_POLICIES = new Set(['full', 'tipOnly', 'none']);

export class OntologyUI {
constructor(ontology, ngViewer, targetLayerName, { initialSegments } = {}) {
    this.ontology = ontology;
    this.viewer = ngViewer;
    this.targetLayerName = targetLayerName;
    this.hoverPreviewPolicies = this.loadHoverPreviewPolicies();
    this.defaultHoverPreviewPolicy = 'full';
    this.infoDisplay = document.getElementById('infoDisplay');
    this.container = document.getElementById('ontologyContainer');
    this.searchInput = document.getElementById('searchInput');
    this.initialSegmentIds = Array.isArray(initialSegments)
        ? new Set(initialSegments.map((id) => String(id).replace(/,/g, '')))
        : (initialSegments instanceof Set ? new Set(Array.from(initialSegments).map((id) => String(id).replace(/,/g, ''))) : null);
    this.initialCheckboxSyncResolved = false;

    // State variables for hover logic
    this.lastHoveredSegment = null; // String ID of the segment currently shown in infoDisplay
    this.neuroglancerHoverId = null; // String ID hovered in NG view
    this.ontologyHoverId = null;    // String ID hovered in Ontology panel
    this.hoverTimeout = null; // Timeout ID for debouncing NG hover checks
    this.infoFadeTimeout = null; // Timeout ID for delaying info hide

    // --- State for Temporary Visibility Highlight ---
    this.originalVisibleSegments = null; // Stores a copy (JS Set) of the visible set during hover
    this.isHoverHighlightActive = false; // Flag to track if hover highlight is active
    this.suppressCheckboxUpdate = false; // External flows (mute toggle) can suspend checkbox refresh temporarily
    this.pendingCheckboxUpdate = false; // Track deferred checkbox refresh while suppressed

    // Flags to prevent duplicate listener attachments
    this.visibleSegmentsListenerAttached = false;
    this.layerManagerListenerAttached = false;
    this.neuroglancerHoverListenerAttached = false;
    this.layerSetupRetryTimeout = null; // Timeout ID for layer setup retries
    this.searchRAF = null; // requestAnimationFrame ID for search debounce
    this.initialCheckboxSyncAttempts = 0;
    this.maxInitialCheckboxSyncAttempts = 24;
    this.initialCheckboxSyncTimer = null;

    // Basic validation
    if (!this.ontology) console.error("[OntologyUI] Created without a valid Ontology instance!");
    if (!this.container) console.error("[OntologyUI] Ontology container element (#ontologyContainer) not found!");
    if (!this.searchInput) console.error("[OntologyUI] Search input element (#searchInput) not found!");
    if (!this.infoDisplay) console.error("[OntologyUI] Info display element (#infoDisplay) not found!");

    ensureLayerLookup(this.viewer);

    // Initialize UI components
    this.setupSearch();
    this.setupHover(); // Setup all hover listeners (including temp visibility)
    this.addLayerListeners(); // Setup listeners for checkbox updates

    // Initial checkbox sync after the viewer settles
    this.scheduleInitialCheckboxSync(350);
    console.log("[OntologyUI] Initialized.");
}

loadHoverPreviewPolicies() {
    const stored = getJSONStorageItem(HOVER_PREVIEW_STORAGE_KEY) || {};
    const map = new Map();
    try {
        if (stored && typeof stored === 'object') {
            Object.entries(stored).forEach(([rootId, policy]) => {
                if (VALID_HOVER_PREVIEW_POLICIES.has(policy)) {
                    map.set(rootId, policy);
                }
            });
        }
    } catch (error) {
        console.warn('[Hover Preview] Failed to parse stored policies:', error);
    }
    return map;
}

persistHoverPreviewPolicies() {
    try {
        const payload = {};
        this.hoverPreviewPolicies.forEach((policy, rootId) => {
            payload[rootId] = policy;
        });
        setJSONStorageItem(HOVER_PREVIEW_STORAGE_KEY, payload);
    } catch (error) {
        console.warn('[Hover Preview] Failed to persist policies:', error);
    }
}

getHoverPreviewPolicyForRoot(rootId) {
    if (!rootId) return this.defaultHoverPreviewPolicy;
    const stored = this.hoverPreviewPolicies?.get?.(rootId);
    if (stored && VALID_HOVER_PREVIEW_POLICIES.has(stored)) {
        return stored;
    }
    const fromConfig = HOVER_PREVIEW_DEFAULT_POLICIES?.[rootId];
    if (fromConfig && VALID_HOVER_PREVIEW_POLICIES.has(fromConfig)) {
        return fromConfig;
    }
    return this.defaultHoverPreviewPolicy;
}

getHoverPreviewPolicyForId(entryId) {
    if (!entryId) return this.defaultHoverPreviewPolicy;
    const rootId = this.ontology?.getRootId?.(entryId) || entryId;
    return this.getHoverPreviewPolicyForRoot(rootId);
}

setHoverPreviewPolicy(rootId, policy) {
    if (!rootId || !VALID_HOVER_PREVIEW_POLICIES.has(policy)) return;
    const current = this.getHoverPreviewPolicyForRoot(rootId);
    if (current === policy) return;
    this.hoverPreviewPolicies.set(rootId, policy);
    this.persistHoverPreviewPolicies();
}

getHoverPreviewRoots() {
    const roots = this.ontology?.getRootEntries?.() || [];
    return roots.map((root) => ({
        ...root,
        policy: this.getHoverPreviewPolicyForRoot(root.id),
    }));
}
// INSIDE OntologyUI class
updateHoverBackupState(currentVisibleSegments) {
    console.log("[OntologyUI] updateHoverBackupState called."); // Log entry

    // The act of clicking a checkbox signifies a "committed" change,
    // moving beyond a temporary hover highlight.
    // So, we should clear the hover highlight state.
    if (this.isHoverHighlightActive) {
        console.log("[OntologyUI] Checkbox click occurred during hover highlight. Resetting highlight state.");
        // We are effectively ending the temporary hover highlight because a
        // permanent choice has been made via the checkbox.
        // Restore original visibility will use this *newly updated* backup.
        this.originalVisibleSegments = new Set(); // Update the backup
        if (currentVisibleSegments) {
            for (const id of currentVisibleSegments) {
                this.originalVisibleSegments.add(id);
            }
        }
        console.log(`[OntologyUI] Hover backup updated by checkbox. New size: ${this.originalVisibleSegments.size}`);

        // --- CRITICAL CHANGE ---
        // Since a permanent checkbox change was made, the "hover highlight" is no longer purely temporary.
        // We should reset the flag so that subsequent updates to checkboxes are NOT skipped.
        this.isHoverHighlightActive = false;
        this.ontologyHoverId = null; // Also clear the specific ontology item being hovered
        console.log("[OntologyUI] isHoverHighlightActive set to FALSE due to checkbox commit.");

        // Now that the flag is false, directly call updateCheckboxes to reflect the committed change.
        // The debounce wrapper is not strictly necessary here as this is a direct response
        // to a user action that has already modified the true state.
    if (!this.suppressCheckboxUpdate) {
        console.log("[OntologyUI] Directly calling updateCheckboxes after checkbox commit.");
        this.updateCheckboxes(); // Call it directly
    } else {
        console.log('[OntologyUI] updateCheckboxes suppressed after checkbox commit.');
    }
        // --- END CRITICAL CHANGE ---

    } else {
        // If hover highlight was NOT active, a checkbox click is a normal operation.
        // The visibleSegments.changed listener will handle calling updateCheckboxes (via debounce).
        console.log("[OntologyUI] Checkbox click occurred, but hover highlight was not active. No backup/flag change needed from here.");
    }
}
// Add listeners to update checkboxes when Neuroglancer's visible segments change
// Inside OntologyUI class
addLayerListeners() {
     console.error("[OntologyUI Listener] addLayerListeners CALLED"); // Log entry to this main function

     let checkboxUpdateTimeout;
// INSIDE OntologyUI.addLayerListeners
const debouncedUpdateCheckboxes = () => {
     // console.log("[OntologyUI Listener] debouncedUpdateCheckboxes: Called. isHoverHighlightActive:", this.isHoverHighlightActive); // Check flag value
     if (this.isHoverHighlightActive) { // Check the flag *before* setting timeout
         console.log("[OntologyUI Listener] debouncedUpdateCheckboxes: SKIPPED due to isHoverHighlightActive.");
         clearTimeout(checkboxUpdateTimeout); // Clear any pending timeout if we're skipping
         return;
     }
     if (this.suppressCheckboxUpdate) {
         console.log('[OntologyUI Listener] debouncedUpdateCheckboxes: SKIPPED due to suppressCheckboxUpdate.');
         this.pendingCheckboxUpdate = true;
         clearTimeout(checkboxUpdateTimeout);
         return;
     }
     clearTimeout(checkboxUpdateTimeout);
     checkboxUpdateTimeout = setTimeout(() => {
         if (this.suppressCheckboxUpdate) {
             console.log('[OntologyUI Listener] debouncedUpdateCheckboxes: timeout skipped; updates still suppressed.');
             this.pendingCheckboxUpdate = true;
             return;
         }
         // console.log("[OntologyUI Listener] debouncedUpdateCheckboxes: TIMEOUT FIRED. isHoverHighlightActive:", this.isHoverHighlightActive);
         // No need to double-check the flag here if the outer check is sufficient.
         // If the flag could change between the initial call and the timeout, then keep it.
         // For now, let's assume the outer check is primary.
         this.updateCheckboxes();
     }, 250);
};

     const setupLayerListener = () => {
         console.log("[OntologyUI Listener] setupLayerListener: ATTEMPTING to set up listener.");
         if (this.layerSetupRetryTimeout) clearTimeout(this.layerSetupRetryTimeout);

        const entry = getLayerByName(this.viewer, this.targetLayerName);
        const managedLayer = entry?.layer ?? entry;
        const segmentationState = managedLayer?.displayState?.segmentationGroupState?.value;

        if (segmentationState?.visibleSegments?.changed) {
            console.log(`[OntologyUI Listener] setupLayerListener: Found visibleSegments.changed for layer ${this.targetLayerName}.`);
            if (!this.visibleSegmentsListenerAttached) {
               segmentationState.visibleSegments.changed.add(debouncedUpdateCheckboxes);
                this.visibleSegmentsListenerAttached = true;
                console.error(`[OntologyUI Listener] setupLayerListener: >>> LISTENER ADDED for visibleSegments.changed on layer: ${this.targetLayerName}`);
                if (!this.suppressCheckboxUpdate && !this.isHoverHighlightActive) {
                    this.updateCheckboxes();
                }
             } else {
                console.log(`[OntologyUI Listener] setupLayerListener: Listener ALREADY ATTACHED for ${this.targetLayerName}. Updating checkboxes.`);
                if (!this.suppressCheckboxUpdate && !this.isHoverHighlightActive) {
                    this.updateCheckboxes();
                }
             }
        } else {
            console.warn(`[OntologyUI Listener] setupLayerListener: Layer ${this.targetLayerName} or visibleSegments.changed signal not ready, RETRYING in 750ms... Layer found: ${!!managedLayer}, SegState found: ${!!segmentationState}, VisibleSegs found: ${!!segmentationState?.visibleSegments}`);
            this.layerSetupRetryTimeout = setTimeout(setupLayerListener, 750);
        }
    };

     if (!this.layerManagerListenerAttached) {
        this.viewer.layerManager.layersChanged.add(setupLayerListener);
        this.layerManagerListenerAttached = true;
        console.error("[OntologyUI Listener] ADDED listener for layerManager.layersChanged.");
     }
     setupLayerListener(); // Initial attempt to set up the specific layer listener
}
 
// Update checkbox states based on Neuroglancer's visible segments
scheduleInitialCheckboxSync(delay = 250) {
     if (this.initialCheckboxSyncTimer) {
         clearTimeout(this.initialCheckboxSyncTimer);
     }
     this.initialCheckboxSyncTimer = setTimeout(() => {
         this.initialCheckboxSyncTimer = null;
         this.runInitialCheckboxSync();
     }, delay);
}

runInitialCheckboxSync() {
     if (this.initialCheckboxSyncAttempts === 0 && this.initialSegmentIds && this.initialSegmentIds.size && typeof setVisibleSegmentsFromStrings === 'function') {
         try {
             setVisibleSegmentsFromStrings(this.initialSegmentIds);
         } catch (seedError) {
             console.warn('[OntologyUI] Unable to seed initial visible segments via setVisibleSegmentsFromStrings:', seedError);
         }
     }
     const success = this.updateCheckboxes();
     this.initialCheckboxSyncAttempts += 1;
     if (!success && this.initialCheckboxSyncAttempts < this.maxInitialCheckboxSyncAttempts) {
         const nextDelay = Math.min(1500, 250 * (this.initialCheckboxSyncAttempts + 1));
         this.scheduleInitialCheckboxSync(nextDelay);
     } else if (!success) {
         this.initialCheckboxSyncResolved = true;
     }
}

updateCheckboxes() {
console.error("<<<<< UPDATE CHECKBOXES CALLED >>>>>"); // Very visible log
    if (this.isHoverHighlightActive || this.suppressCheckboxUpdate) { return false; } // Skip during highlight or explicit suppression
    this.pendingCheckboxUpdate = false;
    if (!this.container) { return false; }

    const computeEntryDepth = (entry) => {
        let depth = 0;
        let current = entry?.parentElement?.closest?.('.ontology-entry[id]');
        while (current) {
            depth += 1;
            current = current.parentElement?.closest?.('.ontology-entry[id]');
        }
        return depth;
    };

    const entry = getLayerByName(this.viewer, this.targetLayerName);
    const managedLayer = entry?.layer ?? entry;
    const visibleSegments = getVisibleSegments(managedLayer);
     if (!visibleSegments) { return false; }

     const visibleSegmentIds = new Set();
     try {
         if (typeof visibleSegments.forEach === 'function') {
             visibleSegments.forEach(id => {
                 visibleSegmentIds.add(String(id).replace(/,/g, ''));
             });
         } else if (typeof visibleSegments[Symbol.iterator] === 'function') {
             for (const id of visibleSegments) {
                 visibleSegmentIds.add(String(id).replace(/,/g, ''));
             }
         }
     } catch (iterationError) {
         console.warn('[OntologyUI Checkboxes] Failed to cache visible segment IDs:', iterationError);
     }

     const checkboxes = this.container.querySelectorAll('.ontology-checkbox');
     if (!checkboxes.length) { return false; }

     let mutatedVisibleSegments = false;
     const entryStates = new Map();
     if (!this.initialCheckboxSyncResolved && this.initialSegmentIds && this.initialSegmentIds.size) {
         this.initialSegmentIds.forEach((initialId) => {
             const { id: normalized, excluded } = normalizeSegmentIdSeed(initialId);
             if (!normalized) {
                 return;
             }

             if (excluded) {
                 if (visibleSegmentIds.has(normalized)) {
                     visibleSegmentIds.delete(normalized);
                     if (typeof visibleSegments.delete === 'function') {
                         try {
                             const parsedHiddenId = parseSegmentIdString(normalized);
                             visibleSegments.delete(parsedHiddenId);
                             mutatedVisibleSegments = true;
                         } catch (hiddenParseErr) {
                             console.warn(`[OntologyUI Checkboxes] Failed to parse hidden initial segment id ${normalized}:`, hiddenParseErr);
                         }
                     }
                 }
                 return;
             }

             if (!visibleSegmentIds.has(normalized)) {
                 try {
                     const parsedId = parseSegmentIdString(normalized);
                     if (parsedId !== null && parsedId !== undefined && typeof visibleSegments.has === 'function' && !visibleSegments.has(parsedId)) {
                         visibleSegments.add(parsedId);
                         visibleSegmentIds.add(normalized);
                         mutatedVisibleSegments = true;
                     }
                 } catch (parseErr) {
                     console.warn(`[OntologyUI Checkboxes] Failed to parse initial segment id ${normalized}:`, parseErr);
                 }
             }
         });
     }

     checkboxes.forEach(checkbox => {
         const entryDiv = checkbox.closest('div[id].ontology-entry');
         if (!entryDiv?.id) { return; }
         const segmentIdStr = entryDiv.id.replace(/,/g, '');
         let shouldBeChecked = visibleSegmentIds.has(segmentIdStr);
         checkbox.indeterminate = false;

         if (!shouldBeChecked && typeof visibleSegments.has === 'function') {
             try {
                 const bigIntId = parseSegmentIdString(segmentIdStr);
                 shouldBeChecked = visibleSegments.has(bigIntId);
                 if (shouldBeChecked) {
                     visibleSegmentIds.add(segmentIdStr);
                 }
             } catch (parseError) {
                 console.error(`[OntologyUI Checkboxes] Error parsing ID '${segmentIdStr}' for checkbox update:`, parseError);
                 shouldBeChecked = false;
             }
         }

        if (checkbox.checked !== shouldBeChecked) {
            checkbox.checked = shouldBeChecked;
        }
        entryStates.set(entryDiv, { checked: checkbox.checked, indeterminate: checkbox.indeterminate });
    });
    if (mutatedVisibleSegments) {
        try { visibleSegments.changed?.dispatch(); } catch (dispatchErr) { console.warn('[OntologyUI Checkboxes] Failed to dispatch after seeding initial segments:', dispatchErr); }
    }

    const allEntries = Array.from(this.container.querySelectorAll('.ontology-entry[id]'));
    allEntries.sort((a, b) => computeEntryDepth(b) - computeEntryDepth(a));

    allEntries.forEach((entry) => {
        const checkbox = entry.querySelector(':scope > .ontology-checkbox');
        if (!checkbox) return;

        const childContainer = entry.querySelector(':scope > .ontology-child-container');
        const childEntries = childContainer ? Array.from(childContainer.querySelectorAll(':scope > .ontology-entry[id]')) : [];

        if (!childEntries.length) {
            const leafState = entryStates.get(entry) || { checked: checkbox.checked, indeterminate: checkbox.indeterminate };
            checkbox.checked = !!leafState.checked;
            checkbox.indeterminate = !!leafState.indeterminate;
            entryStates.set(entry, { checked: checkbox.checked, indeterminate: checkbox.indeterminate });
            return;
        }

        let anyChecked = false;
        let allChecked = true;
        let anyIndeterminate = false;
        childEntries.forEach((child) => {
            const childState = (() => {
                if (entryStates.has(child)) {
                    return entryStates.get(child);
                }
                const childCheckbox = child.querySelector(':scope > .ontology-checkbox');
                return childCheckbox
                    ? { checked: childCheckbox.checked, indeterminate: childCheckbox.indeterminate }
                    : { checked: false, indeterminate: false };
            })();

            if (childState.indeterminate) anyIndeterminate = true;
            if (childState.checked) {
                anyChecked = true;
            } else {
                allChecked = false;
            }
        });

        if (allChecked) {
            checkbox.checked = true;
            checkbox.indeterminate = false;
            entryStates.set(entry, { checked: true, indeterminate: false });
        } else if (anyChecked || anyIndeterminate) {
            checkbox.checked = false;
            checkbox.indeterminate = true;
            entryStates.set(entry, { checked: false, indeterminate: true });
        } else {
            checkbox.checked = false;
            checkbox.indeterminate = false;
            entryStates.set(entry, { checked: false, indeterminate: false });
        }
    });

    if (!this.initialCheckboxSyncResolved && this.initialSegmentIds && this.initialSegmentIds.size) {
        let matchesInitial = true;
        for (const rawInitialId of this.initialSegmentIds) {
            const { id: normalized, excluded } = normalizeSegmentIdSeed(rawInitialId);
            if (!normalized) {
                continue;
            }
            const currentlyVisible = visibleSegmentIds.has(normalized);
            if (excluded ? currentlyVisible : !currentlyVisible) {
                matchesInitial = false;
                break;
            }
        }
        if (matchesInitial) {
            this.initialCheckboxSyncResolved = true;
            return true;
        }
        return false;
    }
    this.initialCheckboxSyncResolved = true;
    return true;
}

flushPendingCheckboxUpdates() {
    if (!this.pendingCheckboxUpdate || this.suppressCheckboxUpdate) { return; }
    // Attempt once; if update fails we flag again for later retry
    this.pendingCheckboxUpdate = false;
    const success = this.updateCheckboxes();
    if (!success) {
        this.pendingCheckboxUpdate = true;
    }
}

// Setup search input listener
setupSearch() {
      if (!this.searchInput || !this.container) return;
      this.searchInput.addEventListener('input', () => {
          if (this.searchRAF) cancelAnimationFrame(this.searchRAF);
          this.searchRAF = requestAnimationFrame(() => this.searchOntology());
      });
}

// Filter ontology tree based on search term
searchOntology() {
     if (!this.container || !this.searchInput) return;
     const searchTerm = this.searchInput.value.toLowerCase().trim();
     const allEntryDivs = this.container.querySelectorAll('.ontology-entry[id]');

     if (searchTerm === '') {
         this.resetOntologyVisuals();
         return;
     }
     const matchingEntries = new Set();
     const ancestorsToShow = new Set();
     allEntryDivs.forEach(entry => {
         const labelSpan = entry.querySelector(':scope > span:not(.toggle-icon)');
         const entryName = labelSpan?.textContent.toLowerCase() || '';
         const entryAcronym = (entry.dataset.acronym || '').toLowerCase();
         const entryId = entry.id.toLowerCase();
         let isMatch = entryId.includes(searchTerm) ||
                       entryName.includes(searchTerm) ||
                       entryAcronym.includes(searchTerm);
         if (isMatch) {
             matchingEntries.add(entry);
             let current = entry.parentElement;
             while (current && this.container.contains(current) && current !== this.container) {
                  let ancestorEntry = current.closest('.ontology-entry[id]');
                  if (ancestorEntry && ancestorEntry !== entry) {
                      ancestorsToShow.add(ancestorEntry);
                      current = ancestorEntry.parentElement;
                  } else { break; }
             }
         }
     });
     allEntryDivs.forEach(entry => {
         const childContainer = entry.querySelector(':scope > .ontology-child-container');
         const toggleIcon = entry.querySelector(':scope > .toggle-icon');
         const hasChildren = childContainer && childContainer.children.length > 0;
         if (matchingEntries.has(entry) || ancestorsToShow.has(entry)) {
             entry.style.display = 'block';
             if (ancestorsToShow.has(entry) && hasChildren && childContainer) {
                 childContainer.style.display = 'block';
                  if (toggleIcon) toggleIcon.innerHTML = '▼';
             }
         } else {
             entry.style.display = 'none';
             if (hasChildren && childContainer) {
                  childContainer.style.display = 'none';
                  if (toggleIcon) toggleIcon.innerHTML = '▶';
             }
         }
     });
 }

// Reset ontology tree visuals (show all, collapse children)
resetOntologyVisuals() {
      if (!this.container) return;
      this.container.querySelectorAll('.ontology-entry[id]').forEach(entry => {
          entry.style.display = 'block';
          const childContainer = entry.querySelector(':scope > .ontology-child-container');
          const toggleIcon = entry.querySelector(':scope > .toggle-icon');
          if (childContainer && childContainer.children.length > 0) {
              childContainer.style.display = 'none';
              if (toggleIcon) toggleIcon.innerHTML = '▶';
          }
      });
      if (this.searchInput) this.searchInput.value = '';
 }

// ***** CENTRAL HOVER LOGIC with Temporary Visibility *****
setupHover() {
     if (!this.viewer?.layerSelectedValues?.changed || !this.container || !this.infoDisplay) {
          console.error("[Hover Setup] Cannot setup hover: Missing prerequisites."); return;
     }
     console.log("[Hover Setup] Initializing hover listeners.");

     const describeSegmentationGroup = (layerName) => {
         const entry = layerName ? getLayerByName(this.viewer, layerName) : null;
         const layer = entry?.layer ?? entry ?? null;
         const segState =
             layer?.displayState?.segmentationGroupState?.value ??
             layer?.layer?.displayState?.segmentationGroupState?.value ??
             null;
         const names = new Set();
         const addName = (val) => {
             if (val === undefined || val === null) return;
             const str = String(val).trim();
             if (str) names.add(str);
         };
         addName(segState?.name);
         addName(segState?.linkedSegmentationGroup);
         addName(layer?.linkedSegmentationGroup);
         addName(layer?.displayState?.linkedSegmentationGroup);
         addName(layer?.layer?.linkedSegmentationGroup);
         addName(layer?.layer?.displayState?.linkedSegmentationGroup);
         return { layer, segState, groupNames: Array.from(names) };
     };

     const sharesTargetSegmentation = (layerName, targetDescriptor) => {
         if (!layerName || !targetDescriptor) return false;
         const candidate = describeSegmentationGroup(layerName);
         if (!candidate.layer) return false;
         if (targetDescriptor.segState && candidate.segState && candidate.segState === targetDescriptor.segState) {
             return true;
         }
         if (targetDescriptor.groupNames?.length && candidate.groupNames?.length) {
             return candidate.groupNames.some((name) => targetDescriptor.groupNames.includes(name));
         }
         return false;
     };

     const readSelectedId = (layerValue) => {
         let candidate =
             layerValue?.value?.key ??
             layerValue?.value ??
             layerValue?.selectedValue ??
             layerValue?.key ??
             layerValue;
         if (candidate === undefined || candidate === null) return null;
         if (typeof candidate === 'object') {
             const nested =
                 candidate?.key ??
                 candidate?.value ??
                 candidate?.id ??
                 candidate?.segment ??
                 null;
             if (nested !== null && nested !== undefined) {
                 candidate = nested;
             } else if (typeof candidate.toString === 'function') {
                 const text = candidate.toString();
                 if (!text || text === '[object Object]') return null;
                 candidate = text;
             } else {
                 return null;
             }
         }
         try {
             return String(parseSegmentIdString(candidate));
         } catch (_) {
             return null;
         }
     };

     const hasKnownSegmentMetadata = (idStr, candidateLayer, targetDescriptor) => {
         if (!idStr) return false;
         const normalizedId = (() => {
             try {
                 return parseSegmentIdString(idStr);
             } catch (_) {
                 return null;
             }
         })();
         if (!normalizedId) return false;
         if (this.ontology?.dict && !this.ontology.dict[String(normalizedId)]) {
             const mapsToCheck = [];
             if (candidateLayer) {
                 mapsToCheck.push(candidateLayer.segmentPropertyMap, candidateLayer.layer?.segmentPropertyMap);
             }
             if (targetDescriptor?.layer) {
                 mapsToCheck.push(targetDescriptor.layer.segmentPropertyMap, targetDescriptor.layer.layer?.segmentPropertyMap);
             }
             for (const map of mapsToCheck) {
                 if (!map?.get) continue;
                 try {
                     if (map.has?.(normalizedId) || map.get(normalizedId)) {
                         return true;
                     }
                 } catch (_) {}
             }
             return false;
         }
         return true;
     };

     // --- 1. Listener for Neuroglancer View Hover ---
     const handleNeuroglancerHover = () => {
         if (this.isHoverHighlightActive) { this.neuroglancerHoverId = null; return; } // Ignore NG hover if panel highlight is active
         if (!this || typeof this.updateInfoDisplay !== 'function') { console.error("[NG Hover Check] Invalid 'this' context."); return; }

         const targetDescriptor = describeSegmentationGroup(this.targetLayerName);
         const changedLayers = this.viewer.layerSelectedValues.toJSON();
         let currentNeuroglancerId = null;
         let foundLayerName = null;

         const targetLayerValue = changedLayers[this.targetLayerName];
         const targetCandidate = readSelectedId(targetLayerValue);
         if (targetCandidate && hasKnownSegmentMetadata(targetCandidate, targetDescriptor.layer, targetDescriptor)) {
              currentNeuroglancerId = targetCandidate;
              foundLayerName = this.targetLayerName;
         }
         if (currentNeuroglancerId === null) {
            for (const layerName in changedLayers) {
                 if (layerName === this.targetLayerName) continue;
                 if (!sharesTargetSegmentation(layerName, targetDescriptor)) continue;
                 const layerValue = changedLayers[layerName];
                 const candidateId = readSelectedId(layerValue);
                 if (!candidateId) continue;
                 const candidateDescriptor = describeSegmentationGroup(layerName);
                 if (!hasKnownSegmentMetadata(candidateId, candidateDescriptor.layer, targetDescriptor)) continue;
                 currentNeuroglancerId = candidateId;
                 foundLayerName = layerName;
                 break;
            }
         }
         this.neuroglancerHoverId = currentNeuroglancerId;
         this.updateInfoDisplay(foundLayerName); // Update info display based ONLY on NG hover
     };

     const debouncedNeuroglancerHoverHandler = () => {
         if (this.hoverTimeout) clearTimeout(this.hoverTimeout);
         this.hoverTimeout = setTimeout(handleNeuroglancerHover, 25); // Responsive delay
     };

     if (!this.neuroglancerHoverListenerAttached) {
        this.viewer.layerSelectedValues.changed.add(debouncedNeuroglancerHoverHandler);
        this.neuroglancerHoverListenerAttached = true;
        console.log("[Hover Setup] Added listener for window.viewer.layerSelectedValues.changed");
     }

// INSIDE OntologyUI.setupHover method

// --- 2. Listeners for Ontology Panel Hover (Temporary Visibility Logic) ---
this.container.addEventListener('mouseover', (event) => {
    // *** TARGET CHECK: Only act if hovering directly over the LABEL SPAN ***
    // The label span is a direct child of '.ontology-entry' and NOT '.toggle-icon' or '.ontology-checkbox'
    const labelSpan = event.target.closest('.ontology-entry[id] > span:not(.toggle-icon):not(.ontology-checkbox)');
    const entryDiv = labelSpan ? labelSpan.closest('.ontology-entry[id]') : null;
    // --- END TARGET CHECK ---

    if (entryDiv?.id && this.container.contains(entryDiv) && labelSpan) { // Ensure labelSpan was the target
        const hoveredIdStr = entryDiv.id;
        const entry = getLayerByName(this.viewer, this.targetLayerName);
        const managedLayer = entry?.layer ?? entry;
        const visibleSegments = getVisibleSegments(managedLayer);
        if (!visibleSegments) { console.warn("[Onto Mouseover] visibleSegments state not found."); return; }
        const hoverPolicy = this.getHoverPreviewPolicyForId(hoveredIdStr);

        try {
            if (hoverPolicy === 'none') {
                if (this.isHoverHighlightActive) {
                    this.restoreOriginalVisibility();
                }
                this.ontologyHoverId = hoveredIdStr;
                this.neuroglancerHoverId = null;
                clearTimeout(this.infoFadeTimeout);
                this.updateInfoDisplay(this.targetLayerName);
                return;
            }

            // Store original state IF NOT ALREADY highlighting AND event is on label
            if (!this.isHoverHighlightActive) {
                this.originalVisibleSegments = new Set();
                try {
                    for (const id of visibleSegments) { this.originalVisibleSegments.add(id); }
                } catch (iterError) {
                    console.error("[Onto Mouseover] Failed to iterate original visibleSegments:", iterError, visibleSegments); return;
                }
                // console.log(`[Onto Mouseover] Stored ${this.originalVisibleSegments.size} original visible segments (triggered by label hover).`);
                this.isHoverHighlightActive = true;
                this.neuroglancerHoverId = null; // Clear NG hover state during panel highlight
            }

            // Calculate the set to highlight
            let idsToHighlight = new Set();
            idsToHighlight.add(hoveredIdStr);
            if (hoverPolicy === 'full' && this.ontology?.findAllChildren) {
                 this.ontology.findAllChildren(hoveredIdStr, this.ontology.data, idsToHighlight);
            }

            // Apply the temporary set
            visibleSegments.clear();
            idsToHighlight.forEach(idStr => {
                try { visibleSegments.add(parseSegmentIdString(idStr)); } catch (pErr) { /* ignore parse error */ }
            });
            visibleSegments.changed.dispatch(); // Dispatch immediately

        } catch (e) {
            console.error(`[Onto Mouseover] Error during temporary highlight for ID ${hoveredIdStr}:`, e);
            this.restoreOriginalVisibility(); // Attempt to restore if error
        }

        // Update internal state and info display
        this.ontologyHoverId = hoveredIdStr;
        clearTimeout(this.infoFadeTimeout); // Keep info display from fading if mouse moves onto it
        this.updateInfoDisplay(this.targetLayerName);
    }
}); // End mouseover

this.container.addEventListener('mouseout', (event) => {
    // *** TARGET CHECK: Only act if mouse is leaving a LABEL SPAN or the container itself ***
    const labelSpan = event.target.closest('.ontology-entry[id] > span:not(.toggle-icon):not(.ontology-checkbox)');
    const entryDiv = labelSpan ? labelSpan.closest('.ontology-entry[id]') : null;
    const isLeavingLabelOrContainer = (entryDiv && labelSpan) || (event.target === this.container);
    // --- END TARGET CHECK ---

    if (isLeavingLabelOrContainer) {
         const relatedTarget = event.relatedTarget; // Where the mouse is going
         // Check if the mouse is NOT moving to another label span within the container,
         // OR if it's leaving the container entirely,
         // OR if it's moving to the infoDisplay (which has its own hover logic).
         let isLeavingHighlightZone = true;
         if (relatedTarget) {
             const newTargetIsLabel = relatedTarget.closest && relatedTarget.closest('.ontology-entry[id] > span:not(.toggle-icon):not(.ontology-checkbox)');
             const newTargetIsInContainer = this.container.contains(relatedTarget);
             const newTargetIsInfoDisplay = this.infoDisplay.contains(relatedTarget);

             if ((newTargetIsLabel && newTargetIsInContainer) || newTargetIsInfoDisplay) {
                 isLeavingHighlightZone = false;
             }
         }
        // Also consider if relatedTarget is null (mouse left window)
        if (isLeavingHighlightZone) {
            // console.log("[Onto Mouseout] Leaving highlight zone. Related target:", relatedTarget);
            this.restoreOriginalVisibility(); // This will reset ontologyHoverId
            // No need to explicitly set this.ontologyHoverId = null; here, restoreOriginalVisibility does it.
            this.updateInfoDisplay(); // Update info (might show NG hover now, or hide)
        }
    }
}); // End mouseout

     this.container.addEventListener('mouseout', (event) => {
           const entryDiv = event.target.closest('.ontology-entry[id]');
           if (entryDiv?.id && this.container.contains(entryDiv)) {
                const relatedTarget = event.relatedTarget;
                const isLeavingOntologyAndInfo = !(relatedTarget && (this.container.contains(relatedTarget) || this.infoDisplay.contains(relatedTarget)));
                if (isLeavingOntologyAndInfo) {
                    this.restoreOriginalVisibility();
                    this.ontologyHoverId = null;
                    this.updateInfoDisplay(); // Update info (might show NG hover now)
                }
           }
      }); // End mouseout

      // --- 3. Listeners for Info Display Hover ---
      this.infoDisplay.addEventListener('mouseover', () => {
           clearTimeout(this.infoFadeTimeout);
           this.infoDisplay.style.pointerEvents = 'auto';
       });

      this.infoDisplay.addEventListener('mouseout', (event) => {
          const relatedTarget = event.relatedTarget;
          const isLeavingInfoDisplay = !(relatedTarget && this.infoDisplay.contains(relatedTarget));
          if (isLeavingInfoDisplay && this.isHoverHighlightActive) {
               console.log("[Info Mouseout] Leaving info display while hover highlight active, restoring visibility.");
               this.restoreOriginalVisibility();
               this.ontologyHoverId = null;
          }
          this.updateInfoDisplay();
      }); // End infoDisplay mouseout

      console.log("[Hover Setup] All hover listeners initialized.");
} // --- End of setupHover ---

// INSIDE OntologyUI class
// --- Helper Method to Restore Original Segment Visibility (REVISED) ---
// INSIDE OntologyUI class
// --- Helper Method to Restore Original Segment Visibility (REVISED AGAIN) ---
restoreOriginalVisibility() {
    if (!this.isHoverHighlightActive || this.originalVisibleSegments === null) {
        // console.log("[Restore Visibility] Skipped: Highlight not active or no backup state.");
        this.isHoverHighlightActive = false;
        this.originalVisibleSegments = null;
         // *** Ensure hover ID is null even if skipping ***
         this.ontologyHoverId = null;
        return;
    }

    console.log("[Restore Visibility] Attempting to restore original segments.");
    const entry = getLayerByName(this.viewer, this.targetLayerName);
    const managedLayer = entry?.layer ?? entry;
    const visibleSegments = getVisibleSegments(managedLayer);
    const segmentsToRestore = this.originalVisibleSegments;
    const originalSize = segmentsToRestore?.size ?? 0; // Use optional chaining and nullish coalescing

// --- LOG THE BACKUP ---
const backupArray = [];
if (segmentsToRestore) { for (const id of segmentsToRestore) { backupArray.push(String(id)); } }
console.log(`[Restore Visibility] segmentsToRestore (BACKUP) (size ${originalSize}):`, backupArray);
// ---
    
// --- Clear instance variables immediately BEFORE modification ---
    this.originalVisibleSegments = null;
    this.isHoverHighlightActive = false;
    // *** ADD THIS LINE: Reset the ontology hover ID ***
    this.ontologyHoverId = null;
    // *** --- ***
    console.log(`[Restore Visibility] Cleared state backup (size: ${originalSize}), reset highlight flag, and reset ontologyHoverId.`);

    if (visibleSegments) {
        try {
            visibleSegments.clear();
            segmentsToRestore.forEach((id) => {
              try {
                visibleSegments.add(id);
              } catch (addError) {
                console.warn('[Restore Visibility] Failed to re-add segment id', id, addError);
              }
            });
            console.log(`[Restore Visibility] Added ${visibleSegments.size} segments back from backup.`);
            visibleSegments.changed.dispatch?.();
            console.log("[Restore Visibility] Dispatched visibleSegments.changed (Synchronous).");

            // Update checkboxes AFTER restoration/dispatch
            this.scheduleInitialCheckboxSync(50);

            // *** Explicitly call updateInfoDisplay AFTER state is fully reset 	***
            // This ensures it re-evaluates based on potentially new NG hover
            this.updateInfoDisplay();
            console.log("[Restore Visibility] Called updateInfoDisplay after state reset.");


        } catch (e) {
            console.error("[Restore Visibility] Error during clear/add/dispatch:", e);
            this.scheduleInitialCheckboxSync(50);
            // Still try to update info display on error
            this.updateInfoDisplay();
        }
    } else {
        console.warn("[Restore Visibility] visibleSegments state not found on layer during restore attempt.");
        this.scheduleInitialCheckboxSync(50);
        // Still try to update info display
         this.updateInfoDisplay();
    }
} // --- End of revised restoreOriginalVisibility ---
// --- Central function to manage Info Display visibility and content ---
updateInfoDisplay(sourceLayerName = this.targetLayerName) {
     // Panel hover (ontologyHoverId) takes precedence if active
     const idToShow = this.ontologyHoverId || (!this.isHoverHighlightActive ? this.neuroglancerHoverId : null);
     const isHoveringInfoBox = this.infoDisplay.matches(':hover');

     if (idToShow) {
         if (idToShow !== this.lastHoveredSegment) {
             this.showInfo(idToShow, sourceLayerName);
             this.lastHoveredSegment = idToShow;
         } else {
             clearTimeout(this.infoFadeTimeout);
             this.infoDisplay.style.pointerEvents = 'auto';
         }
     } else {
         if (this.lastHoveredSegment !== null) {
             if (!isHoveringInfoBox) {
                if (!this.isHoverHighlightActive) { // Don't hide info if highlight is active
                    this.hideInfo(500);
                } else {
                    clearTimeout(this.infoFadeTimeout); // Keep info visible during highlight
                }
             } else {
                 clearTimeout(this.infoFadeTimeout);
                 this.infoDisplay.style.pointerEvents = 'auto';
             }
         }
     }
} // --- End of updateInfoDisplay ---

// Show Info Box - (Assumed to be working, no changes from prior version needed here)
showInfo(segmentIdStr, sourceLayerName = this.targetLayerName) {
     if (!this.infoDisplay) { console.error("showInfo: infoDisplay element not found."); return; }
     if (segmentIdStr === null || segmentIdStr === undefined) { this.hideInfo(0); return; }
     const idStr = String(segmentIdStr);
     if (!this.ontology || typeof this.ontology.getEntry !== 'function') { console.error("showInfo: Missing ontology instance or getEntry function!", this); this.hideInfo(0); return; }
     let entry = this.ontology.getEntry(idStr);
     let name = "Unknown Segment", acronym = "N/A", color = "#FFFFFF";
     if (entry) {
         name = entry.Name || `Segment ${idStr}`;
         acronym = entry.Acronym || 'N/A';
         color = entry.Color ? `#${entry.Color.replace('#', '')}` : '#FFFFFF';
     } else {
          const entry = getLayerByName(this.viewer, sourceLayerName);
          const layer = entry?.layer ?? entry;
          if (layer?.segmentPropertyMap || layer?.layer?.segmentPropertyMap) {
              try {
                 const bigIntId = parseSegmentIdString(idStr);
                 const propertyMap = layer.segmentPropertyMap || layer.layer?.segmentPropertyMap;
                 const properties = propertyMap?.get?.(bigIntId);
                 if (properties) { name = properties.label || `Segment ${idStr}`; acronym = properties.description || 'N/A'; }
                 else { name = `Segment ${idStr}`; }
              } catch(e) { console.error(`showInfo: Error parsing ID ${idStr} or getting properties from layer:`, e); name = `Segment ${idStr}`; }
          } else { name = `Segment ${idStr}`; }
     }
     this.infoDisplay.innerHTML = `<b>${name}</b> (${acronym})<br>ID: ${idStr}`; // Use innerHTML for formatting
     this.infoDisplay.style.backgroundColor = color;
     function colorToRgb(colorStr) { let r=128, g=128, b=128; if (!colorStr) return {r,g,b}; try { if (colorStr.startsWith('#')) { if (colorStr.length === 7) { r = parseInt(colorStr.substring(1, 3), 16); g = parseInt(colorStr.substring(3, 5), 16); b = parseInt(colorStr.substring(5, 7), 16); } else if (colorStr.length === 4) { r = parseInt(colorStr[1] + colorStr[1], 16); g = parseInt(colorStr[2] + colorStr[2], 16); b = parseInt(colorStr[3] + colorStr[3], 16); } } else if (colorStr.startsWith('rgb')) { const vals = colorStr.match(/\d+/g); if (vals && vals.length >= 3) [r, g, b] = vals.map(Number); } } catch(e){} return { r: isNaN(r)?128:r, g: isNaN(g)?128:g, b: isNaN(b)?128:b }; }
     function calculateLuminance(rgb) { const Rs=rgb.r/255, Gs=rgb.g/255, Bs=rgb.b/255; const R = Rs<=0.03928?Rs/12.92:Math.pow((Rs+0.055)/1.055, 2.4); const G = Gs<=0.03928?Gs/12.92:Math.pow((Gs+0.055)/1.055, 2.4); const B = Bs<=0.03928?Bs/12.92:Math.pow((Bs+0.055)/1.055, 2.4); return 0.2126*R + 0.7152*G + 0.0722*B; }
     const rgb = colorToRgb(this.infoDisplay.style.backgroundColor);
     const luminance = calculateLuminance(rgb);
     const darkThreshold = 0.18;
     const textColor = (luminance < darkThreshold) ? 'white' : 'black';
     this.infoDisplay.style.color = textColor;
     this.infoDisplay.style.textShadow = (textColor === 'white') ? '1px 1px 1px rgba(0,0,0,0.7)' : '1px 1px 1px rgba(255,255,255,0.4)';
     clearTimeout(this.infoFadeTimeout);
     this.infoDisplay.style.display = 'block';
     this.infoDisplay.style.pointerEvents = 'auto';
     requestAnimationFrame(() => { requestAnimationFrame(() => { this.infoDisplay.style.opacity = '0.9'; }); });
} // --- End of showInfo ---

// Hide Info Box - (Assumed to be working, no changes from prior version needed here)
hideInfo(delay = 500) {
     if (!this.infoDisplay) { return; }
     clearTimeout(this.infoFadeTimeout);
     this.infoFadeTimeout = setTimeout(() => {
         if (!this.infoDisplay) return;
         this.infoDisplay.style.opacity = '0';
         this.infoDisplay.style.pointerEvents = 'none';
         if (this.lastHoveredSegment !== null) { this.lastHoveredSegment = null; }
         const transitionDuration = parseFloat(getComputedStyle(this.infoDisplay).transitionDuration) * 1000;
         const hideDisplayDelay = isNaN(transitionDuration) ? 500 : transitionDuration;
         setTimeout(() => {
              if (this.infoDisplay && this.infoDisplay.style.opacity === '0') { this.infoDisplay.style.display = 'none'; }
         }, hideDisplayDelay + 50);
     }, delay);
} // --- End of hideInfo ---

}
