export interface OntologyEntry {
  ID: string;
  Name: string;
  Acronym?: string;
  Color?: string;
  [key: string]: unknown;
}

export interface OntologyNode {
  _self: OntologyEntry;
  _children?: Record<string, OntologyNode>;
  [key: string]: unknown;
}

export type OntologyTree = Record<string, OntologyNode>;

export type OntologyDict = Record<string, OntologyEntry>;

export type SegmentColorMap = Record<string, string>;

export type SegmentPropertyRecord = Record<string, unknown>;

export type SegmentPropertyMap = Record<string, SegmentPropertyRecord>;
