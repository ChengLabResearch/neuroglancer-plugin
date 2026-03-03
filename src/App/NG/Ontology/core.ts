// @ts-nocheck

import type {
  OntologyTree,
  OntologyDict,
  SegmentColorMap,
  SegmentPropertyMap
} from './types';

export function parseCSV(content: string): Array<Record<string, string>> {
  const rows = content.split('\n');
  if (!rows.length) return [];
  const headers = rows[0].split(',').map((header) => header.trim());
  const data: Array<Record<string, string>> = [];

  for (let i = 1; i < rows.length; i += 1) {
    const rowContent = rows[i];
    if (!rowContent?.trim()) continue;

    const rowValues: string[] = [];
    let col = '';
    let inQuotes = false;
    let currentPos = 0;

    while (currentPos < rowContent.length) {
      const char = rowContent[currentPos];
      if (!inQuotes && char === '"') {
        inQuotes = true;
        currentPos += 1;
      } else if (inQuotes && char === '"') {
        if (currentPos + 1 < rowContent.length && rowContent[currentPos + 1] === '"') {
          col += '"';
          currentPos += 2;
        } else {
          inQuotes = false;
          currentPos += 1;
        }
      } else if (!inQuotes && char === ',') {
        rowValues.push(col.trim());
        col = '';
        currentPos += 1;
      } else {
        col += char;
        currentPos += 1;
      }
    }
    rowValues.push(col.trim());

    if (rowValues.length === headers.length && rowValues.some((val) => val !== '')) {
      const entry: Record<string, string> = {};
      for (let j = 0; j < headers.length; j += 1) {
        const header = headers[j];
        if (header) entry[header] = rowValues[j];
      }
      if (entry['ID'] && entry['Name'] && entry['Color'] !== undefined && entry['Color'] !== '') {
        data.push(entry);
      } else {
        console.warn('Skipping CSV row due to missing ID, Name, or Color:', rowContent);
      }
    } else if (rowValues.length > 1 || (rowValues.length === 1 && rowValues[0] !== '')) {
      console.warn(
        `Skipping CSV row ${i + 1}: Header/column mismatch or invalid content. Expected ${headers.length}, got ${rowValues.length}. Row:`,
        rowContent
      );
    }
  }
  return data;
}

export function normalizeSegmentIdSeed(rawId: unknown): { id: string | null; excluded: boolean } {
  if (rawId === null || rawId === undefined) {
    return { id: null, excluded: false };
  }
  let str = String(rawId).trim();
  if (!str) {
    return { id: null, excluded: false };
  }
  str = str.replace(/,/g, '');

  let excluded = false;
  while (str.startsWith('!')) {
    excluded = true;
    str = str.slice(1).trim();
  }
  if (!str) {
    return { id: null, excluded };
  }
  if (str.endsWith('n') && /^\d+n$/i.test(str)) {
    str = str.slice(0, -1);
  }
  return { id: str, excluded };
}

export function parseSegmentIdString(idString: unknown): bigint {
  if (typeof idString === 'bigint') {
    return idString;
  }
  if (idString && typeof idString === 'object') {
    const candidate =
      (idString as any).key ??
      (idString as any).value ??
      (idString as any).id ??
      (idString as any).segment ??
      null;
    if (candidate !== null && candidate !== undefined) {
      return parseSegmentIdString(candidate);
    }
  }
  const raw = typeof idString === 'string' ? idString : String(idString);
  try {
    const cleaned = raw.trim().replace(/,/g, '');
    return BigInt(cleaned);
  } catch (error) {
    console.error(`Failed to parse segment ID string "${raw}" to BigInt:`, error);
    throw error;
  }
}

export function buildStructureUsingParentId(
  parentId: string,
  data: Array<Record<string, string>>
): OntologyTree {
  const subset = data.filter((item) => item && String(item['Parent ID']) === String(parentId));
  const result: OntologyTree = {};
  subset.forEach((row) => {
    if (row && row['ID'] && row['Name'] && row['Color'] !== undefined && row['Color'] !== '') {
      result[row['ID']] = {
        _self: {
          Name: row['Name'],
          ID: row['ID'],
          Acronym: row['Acronym'] || '',
          Color: row['Color'],
        },
        _children: buildStructureUsingParentId(row['ID'], data),
      };
    } else {
      console.warn('Skipping node build in buildStructureUsingParentId due to missing data:', row);
    }
  });
  return result;
}

export async function buildOntologyFromCSV(
  content: string
): Promise<[OntologyTree, OntologyDict, SegmentColorMap, SegmentPropertyMap]> {
  const data = parseCSV(content);
  const ontologyDict: OntologyDict = {};
  const segmentColors: SegmentColorMap = {};
  const segmentProperties: SegmentPropertyMap = {
    '@type': 'neuroglancer_segment_properties',
  } as SegmentPropertyMap;
  const idList: string[] = [];
  const fullNameList: string[] = [];
  const acronymList: string[] = [];

  data.forEach((row) => {
    if (!row || !row['ID'] || !row['Name'] || row['Color'] === undefined || row['Color'] === '') {
      console.warn('Skipping CSV entry processing in buildOntologyFromCSV:', row);
      return;
    }
    ontologyDict[row['ID']] = row as any;
    segmentColors[row['ID']] = `#${row['Color']}`;
    idList.push(row['ID']);
    fullNameList.push(row['Name']);
    acronymList.push(row['Acronym'] || '');
  });

  (segmentProperties as any).inline = {
    ids: idList,
    properties: [
      { id: 'label', type: 'label', values: fullNameList },
      { id: 'description', type: 'description', values: acronymList },
    ],
  };

  const rootNodes = data.filter((item) => {
    const parentId = item ? item['Parent ID'] : undefined;
    return parentId === '[]' || parentId === '' || parentId === null || parentId === undefined;
  });

  const ontologyJson: OntologyTree = {};
  rootNodes.forEach((rootNode) => {
    if (rootNode && rootNode['ID'] && rootNode['Name'] && rootNode['Color'] !== undefined && rootNode['Color'] !== '') {
      ontologyJson[rootNode['ID']] = {
        _self: {
          Name: rootNode['Name'],
          ID: rootNode['ID'],
          Acronym: rootNode['Acronym'] || '',
          Color: rootNode['Color'],
        },
        _children: buildStructureUsingParentId(rootNode['ID'], data),
      };
    } else {
      console.warn('Skipping root node build due to missing data:', rootNode);
    }
  });

  console.log(`Built ontology JSON with ${Object.keys(ontologyJson).length} root nodes.`);
  console.log('info file below, copy object to update info file if new segments are added to CSV:');
  console.log(segmentProperties);

  return [ontologyJson, ontologyDict, segmentColors, segmentProperties];
}

export class Ontology {
  constructor(
    public data: OntologyTree,
    public dict: OntologyDict,
    public colors: SegmentColorMap,
    public segmentProperties: SegmentPropertyMap
  ) {
    this.rootIdByEntry = new Map<string, string>();
    this.rootEntries = [];
    this.indexRoots();
    console.log(
      'Ontology instance created. Data keys:',
      Object.keys(this.data || {}).length,
      'Dict size:',
      Object.keys(this.dict || {}).length
    );
    if (!this.data || Object.keys(this.data).length === 0) console.warn('Ontology data appears empty!');
    if (!this.dict || Object.keys(this.dict).length === 0) console.warn('Ontology dictionary appears empty!');
  }

  getEntry(id: string | number): any {
    if (!this.dict) {
      console.error('Ontology dictionary (dict) is not initialized!');
      return undefined;
    }
    const stringId = String(id);
    return this.dict[stringId];
  }

  private indexRoots(): void {
    try {
      const roots = Object.keys(this.data || {}).filter((key) => key !== '_self');
      roots.forEach((rootId) => {
        this.rootIdByEntry.set(rootId, rootId);
        const label = this.dict?.[rootId]?.Name || rootId;
        this.rootEntries.push({ id: rootId, name: label });
        const children = (this.data as any)?.[rootId]?._children;
        if (children && typeof children === 'object') {
          this.walkAndAssignRoot(children as OntologyTree, rootId);
        }
      });
    } catch (error) {
      console.warn('[Ontology] Failed to index root mapping:', error);
    }
  }

  private walkAndAssignRoot(level: OntologyTree, rootId: string): void {
    if (!level || typeof level !== 'object') return;
    for (const id in level) {
      if (id === '_self' || !level[id]) continue;
      this.rootIdByEntry.set(id, rootId);
      const children = (level as any)[id]?._children;
      if (children && typeof children === 'object') {
        this.walkAndAssignRoot(children as OntologyTree, rootId);
      }
    }
  }

  getRootId(id: string | number): string | null {
    if (!id) return null;
    return this.rootIdByEntry.get(String(id)) || null;
  }

  getRootEntries(): Array<{ id: string; name: string }> {
    return Array.isArray(this.rootEntries) ? [...this.rootEntries] : [];
  }

  findAllChildren(startId: string | number, level: OntologyTree, resultSet: Set<string>): void {
    if (!level || typeof level !== 'object') return;
    for (const currentId in level) {
      if (currentId === '_self' || !level[currentId]) continue;
      const node: any = level[currentId];
      if (currentId === String(startId)) {
        this.collectAllChildren(currentId, level, resultSet);
        return;
      } else if (node['_children'] && typeof node['_children'] === 'object') {
        this.findAllChildren(startId, node['_children'] as OntologyTree, resultSet);
      }
    }
  }

  private collectAllChildren(currentId: string, level: OntologyTree, resultSet: Set<string>): void {
    const node: any = level[currentId];
    if (!node) return;
    resultSet.add(currentId);
    const children = node['_children'];
    if (children && typeof children === 'object') {
      for (const childId in children) {
        if (childId === '_self') continue;
        this.collectAllChildren(childId, children as OntologyTree, resultSet);
      }
    }
  }

  buildDivs(level: OntologyTree, depth = 0): HTMLDivElement {
    const parentDiv = document.createElement('div');
    if (!level || typeof level !== 'object') return parentDiv;

    for (const id in level) {
      if (id === '_self' || !level[id] || !level[id]['_self']) continue;

      const entry = (level as any)[id]['_self'];
      const children = (level as any)[id]['_children'];

      if (!entry.ID || !entry.Name || entry.Color === undefined || entry.Color === '') {
        console.warn('Skipping rendering node due to missing data in _self:', entry);
        continue;
      }

      const entryDiv = document.createElement('div');
      entryDiv.id = entry.ID;
      entryDiv.dataset.acronym = entry.Acronym || '';
      entryDiv.style.color = `#${entry.Color}`;
      entryDiv.classList.add('ontology-entry');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'ontology-checkbox';
      checkbox.id = `checkbox-${entry.ID}`;
      checkbox.title = `Toggle visibility for ${entry.Name} and children`;

      const hasChildren = children && Object.keys(children).length > 0;
      const toggleIcon = document.createElement('span');
      toggleIcon.className = 'toggle-icon';
      toggleIcon.innerHTML = hasChildren ? '▶' : ' ';
      toggleIcon.title = hasChildren ? 'Expand/Collapse children' : '';

      const labelSpan = document.createElement('span');
      labelSpan.textContent = ` (${entry.Acronym || 'N/A'}) ${entry.Name}`;

      const childDiv = this.buildDivs((children || {}) as OntologyTree, depth + 1);
      childDiv.classList.add('ontology-child-container');

      entryDiv.appendChild(checkbox);
      entryDiv.appendChild(toggleIcon);
      entryDiv.appendChild(labelSpan);
      entryDiv.appendChild(childDiv);

      entryDiv.addEventListener('click', (event) => {
        const target = event.target as HTMLElement | null;

        if (target === checkbox) {
          event.stopPropagation();
          try {
            const layer = window.viewer?.layerManager?.getLayerByName?.(window.ontologyUI?.targetLayerName || '');
            const currentLayer = layer?.layer || layer;
            const visibleSegments = currentLayer?.displayState?.segmentationGroupState?.value?.visibleSegments;
            if (!visibleSegments) {
              console.warn('[Ontology Checkbox] Segmentation visibleSegments not available.');
              return;
            }

            const idsToToggle = new Set<string>();
            this.findAllChildren(entry.ID, this.data, idsToToggle);
            idsToToggle.add(entry.ID);

            idsToToggle.forEach((segmentIdStr) => {
              try {
                const bigIntId = parseSegmentIdString(segmentIdStr);
                if (checkbox.checked) {
                  visibleSegments.add(bigIntId);
                } else {
                  visibleSegments.delete(bigIntId);
                }
              } catch (error) {
                console.error('[Ontology Checkbox] Failed toggling segment id', segmentIdStr, error);
              }
            });

            visibleSegments.changed?.dispatch?.();

            if (window.ontologyUI?.updateHoverBackupState) {
              try {
                window.ontologyUI.updateHoverBackupState(visibleSegments);
              } catch (error) {
                console.warn('[Ontology Checkbox] Failed updating hover backup state', error);
              }
            }
          } catch (error) {
            console.error('[Ontology Checkbox] Failed during checkbox handler:', error);
          }
        } else if (target === toggleIcon && hasChildren) {
          event.stopPropagation();
          const isCurrentlyHidden = childDiv.style.display === 'none' || !childDiv.style.display;
          const shouldExpand = isCurrentlyHidden;
          childDiv.style.display = shouldExpand ? 'block' : 'none';
          toggleIcon.innerHTML = shouldExpand ? '▼' : '▶';
          try {
            setStoredOntologyExpansion(entry.ID, shouldExpand);
          } catch (error) {
            console.warn('[Ontology Expansion] Failed to persist toggle state for', entry.ID, error);
          }
        }
      });

      parentDiv.appendChild(entryDiv);
    }
    return parentDiv;
  }

  render(container: HTMLElement): void {
    const searchInput = container.querySelector('#searchInput');
    while (container.lastChild && container.lastChild !== searchInput) {
      container.removeChild(container.lastChild);
    }
    const treeRootDiv = this.buildDivs(this.data);
    container.appendChild(treeRootDiv);
    console.log('Ontology rendered in container.');
  }
}
