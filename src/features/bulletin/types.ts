export type RawOutcome = {
  ID: string;
  O: string;
  N: string;
  MBS: string;
  G: string;
  OD: number;
  IMF: boolean;
};

export type RawOutcomeGroup = {
  ID: string;
  N: string;
  MBS: string;
  SO: number;
  OC: Record<string, RawOutcome>;
};

export type RawEvent = {
  C: string;
  N: string;
  TYPE: string;
  NID: string;
  D: string;
  T: string;
  DAY: string;
  S: string;
  LN: string;
  IMF: boolean;
  OCG: Record<string, RawOutcomeGroup>;
  HEC: boolean;
};

export type Outcome = {
  groupId: string;
  outcomeId: string;
  label: string;
  odd: number;
  mbs: number;
};

export type BulletinEvent = {
  code: string;
  name: string;
  date: string;
  time: string;
  day: string;
  league: string;
  mbs: number;
  cells: Map<string, Outcome>;
};

export type BulletinStatus = "idle" | "loading" | "success" | "error";

export type BulletinState = {
  status: BulletinStatus;
  events: BulletinEvent[];
  error: string | null;
};
