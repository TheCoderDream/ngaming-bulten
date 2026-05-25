export type ColumnKind = "meta" | "placeholder" | "odd";

export type ColumnDef = {
  id: string;
  header: string;
  kind: ColumnKind;
  groupId?: string;
  label?: string;
  width: string;
};

export const META_COLUMNS: ColumnDef[] = [
  { id: "meta", header: "Maç", kind: "meta", width: "minmax(200px, 1.4fr)" },
  { id: "yorumlar", header: "Yorumlar", kind: "placeholder", width: "56px" },
  { id: "mbs", header: "MBS", kind: "placeholder", width: "40px" },
];

export const ODD_COLUMNS: ColumnDef[] = [
  { id: "1:1", header: "1", kind: "odd", groupId: "1", label: "1", width: "48px" },
  { id: "1:X", header: "x", kind: "odd", groupId: "1", label: "X", width: "48px" },
  { id: "1:2", header: "2", kind: "odd", groupId: "1", label: "2", width: "48px" },
  { id: "5:Alt", header: "Alt", kind: "odd", groupId: "5", label: "Alt", width: "48px" },
  { id: "5:Üst", header: "Üst", kind: "odd", groupId: "5", label: "Üst", width: "48px" },
  { id: "h1", header: "H1", kind: "placeholder", width: "40px" },
  { id: "3:1", header: "1", kind: "odd", groupId: "3", label: "1", width: "48px" },
  { id: "3:X", header: "x", kind: "odd", groupId: "3", label: "X", width: "48px" },
  { id: "3:2", header: "2", kind: "odd", groupId: "3", label: "2", width: "48px" },
  { id: "h2", header: "H2", kind: "placeholder", width: "40px" },
  { id: "2:1-X", header: "1-X", kind: "odd", groupId: "2", label: "1-X", width: "52px" },
  { id: "2:1-2", header: "1-2", kind: "odd", groupId: "2", label: "1-2", width: "52px" },
  { id: "2:X-2", header: "X-2", kind: "odd", groupId: "2", label: "X-2", width: "52px" },
  { id: "4:Var", header: "Var", kind: "odd", groupId: "4", label: "Var", width: "48px" },
  { id: "4:Yok", header: "Yok", kind: "odd", groupId: "4", label: "Yok", width: "48px" },
  { id: "more", header: "+99", kind: "placeholder", width: "40px" },
];

export const ALL_COLUMNS: ColumnDef[] = [...META_COLUMNS, ...ODD_COLUMNS];

export const GRID_TEMPLATE = ALL_COLUMNS.map((c) => c.width).join(" ");

export function cellKey(groupId: string, label: string): string {
  return `${groupId}:${label}`;
}
