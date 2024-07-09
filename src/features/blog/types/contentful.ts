import { TopLevelBlock } from "@contentful/rich-text-types";

export interface ContentfulResponse<T> {
  sys: ContentfulResponseSys;
  total: number;
  skip: number;
  limit: number;
  items: T[];
  includes: Includes;
}

export interface ContentfulResponseSys {
  type: string;
}

export interface BlogPostEntry {
  metadata: Metadata;
  sys: BlogPostSys;
  fields: BlogPost;
}

export interface BlogPost {
  title: string;
  slug: string;
  body: Body;
  createdAt: string;
  author: string;
  description: string;
  featuredImage?: Asset;
}

export interface Body {
  data: BodyData;
  content: TopLevelBlock[];
  nodeType: BLOCKS.DOCUMENT;
}

export interface BodyContent {
  data: PurpleData;
  content: ContentContent[];
  nodeType: string;
}

export interface ContentContent {
  data: BodyData;
  marks: any[];
  value: string;
  nodeType: string;
}

export interface BodyData {}

export interface PurpleData {
  target?: ContentType;
}

export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  id: string;
  type: string;
  linkType: string;
}

export interface Metadata {
  tags: any[];
}

export interface BlogPostSys {
  space: ContentType;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: ContentType;
  revision: number;
  contentType: ContentType;
  locale: string;
}

export interface Includes {
  Asset: Asset[];
}

export interface Asset {
  metadata: Metadata;
  sys: AssetSys;
  fields: AssetFields;
}

export interface AssetFields {
  title: string;
  description: string;
  file: File;
}

export interface File {
  url: string;
  details: Details;
  fileName: string;
  contentType: string;
}

export interface Details {
  size: number;
  image: Image;
}

export interface Image {
  width: number;
  height: number;
}

export interface Metadata {
  tags: any[];
}

export interface AssetSys {
  space: ContentType;
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: ContentType;
  revision: number;
  locale: string;
  contentType?: ContentType;
}
export interface ContentType {
  sys: ContentTypeSys;
}

export interface ContentTypeSys {
  id: string;
  type: string;
  linkType: string;
}
export declare enum BLOCKS {
  DOCUMENT = "document",
  PARAGRAPH = "paragraph",
  HEADING_1 = "heading-1",
  HEADING_2 = "heading-2",
  HEADING_3 = "heading-3",
  HEADING_4 = "heading-4",
  HEADING_5 = "heading-5",
  HEADING_6 = "heading-6",
  OL_LIST = "ordered-list",
  UL_LIST = "unordered-list",
  LIST_ITEM = "list-item",
  HR = "hr",
  QUOTE = "blockquote",
  EMBEDDED_ENTRY = "embedded-entry-block",
  EMBEDDED_ASSET = "embedded-asset-block",
  TABLE = "table",
  TABLE_ROW = "table-row",
  TABLE_CELL = "table-cell",
  TABLE_HEADER_CELL = "table-header-cell",
}
