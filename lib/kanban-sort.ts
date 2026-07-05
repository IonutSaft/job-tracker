import type { Database } from "@/lib/database.types";

export type ApplicationStatus =
  Database["public"]["Enums"]["application_status"];
export type ApplicationRow =
  Database["public"]["Tables"]["applications"]["Row"];
export type Grouped = Partial<Record<ApplicationStatus, ApplicationRow[]>>;

export interface UpdateRecord {
  id: string;
  status: ApplicationStatus;
  kanban_order: number;
}

export function reorderInSameColumn(
  apps: ApplicationRow[],
  sourceId: string,
  targetId: string,
): ApplicationRow[] {
  const sourceIdx = apps.findIndex((a) => a.id === sourceId);
  const targetIdx = apps.findIndex((a) => a.id === targetId);

  if (sourceIdx === -1 || targetIdx === -1) return apps;
  if (sourceIdx === targetIdx) return apps;

  const filtered = apps.filter((a) => a.id !== sourceId);
  const item = apps[sourceIdx];
  filtered.splice(targetIdx, 0, item);
  return filtered;
}

export function moveToColumn(
  targetApps: ApplicationRow[],
  updatedApp: ApplicationRow,
  targetAppId?: string,
): ApplicationRow[] {
  if (!targetAppId) return [...targetApps, updatedApp];

  const insertAt = targetApps.findIndex((a) => a.id === targetAppId);
  if (insertAt === -1) return [...targetApps, updatedApp];

  const result = [...targetApps];
  result.splice(insertAt, 0, updatedApp);
  return result;
}

export function groupByStatus(
  apps: ApplicationRow[],
): Grouped {
  const grouped: Grouped = {};
  for (const app of apps) {
    const status = app.status as ApplicationStatus;
    if (!grouped[status]) grouped[status] = [];
    grouped[status]!.push(app);
  }
  return grouped;
}

export function buildUpdates(
  apps: ApplicationRow[],
  status: ApplicationStatus,
): UpdateRecord[] {
  return apps.map((a, i) => ({
    id: a.id,
    status,
    kanban_order: i,
  }));
}
