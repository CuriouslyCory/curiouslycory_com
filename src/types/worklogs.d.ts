export type FetchWorkLogsMetadata = {
  count: number;
  offset: number;
  limit: number;
};

export type Worklog = {
  self: string;
  tempoWorklogId: number;
  issue: Issue;
  timeSpentSeconds: number;
  billableSeconds: number;
  startDate: string;
  startTime: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
  attributes: Attributes;
};

export type Issue = {
  self: string;
  id: number;
};

export type Author = {
  self: string;
  accountId: string;
};

export type Attributes = {
  self: string;
  values: any[];
};

type FetchWorklogsResponse = {
  metadata: FetchWorkLogsMetadata;
  results: Array<Worklog>;
  self: string;
};
