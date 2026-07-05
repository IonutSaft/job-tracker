import { describe, it, expect } from "vitest";
import {
  reorderInSameColumn,
  moveToColumn,
  buildUpdates,
} from "@/lib/kanban-sort";
import type { ApplicationRow, ApplicationStatus } from "@/lib/kanban-sort";

function makeApp(
  id: string,
  company: string,
  status: ApplicationStatus = "applied",
): ApplicationRow {
  return {
    id,
    company_name: company,
    role_title: "Engineer",
    status,
    created_at: "2026-01-01T00:00:00.000Z",
    applied_at: null,
    job_url: null,
    location: null,
    notes: null,
    salary_currency: null,
    salary_min: null,
    salary_max: null,
    work_type: "remote",
    user_id: "user-1",
    kanban_order: 0,
    resume_id: null,
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

describe("reorderInSameColumn", () => {
  const apps = [
    makeApp("1", "Apple"),
    makeApp("2", "Google"),
    makeApp("3", "Meta"),
    makeApp("4", "Netflix"),
  ];

  it("moves a card from the start to the end", () => {
    const result = reorderInSameColumn(apps, "1", "4");
    expect(result.map((a) => a.company_name)).toEqual([
      "Google",
      "Meta",
      "Netflix",
      "Apple",
    ]);
  });

  it("moves a card from the end to the start", () => {
    const result = reorderInSameColumn(apps, "4", "1");
    expect(result.map((a) => a.company_name)).toEqual([
      "Netflix",
      "Apple",
      "Google",
      "Meta",
    ]);
  });

  it("reorders a middle card to another middle position", () => {
    const result = reorderInSameColumn(apps, "3", "1");
    expect(result.map((a) => a.company_name)).toEqual([
      "Meta",
      "Apple",
      "Google",
      "Netflix",
    ]);
  });

  it("reorders a first card to the second position", () => {
    const result = reorderInSameColumn(apps, "1", "2");
    expect(result.map((a) => a.company_name)).toEqual([
      "Google",
      "Apple",
      "Meta",
      "Netflix",
    ]);
  });

  it("returns the same array when source and target are the same", () => {
    const result = reorderInSameColumn(apps, "2", "2");
    expect(result).toBe(apps);
  });

  it("returns the same array when source is not found", () => {
    const result = reorderInSameColumn(apps, "99", "2");
    expect(result).toBe(apps);
  });

  it("returns the same array when target is not found", () => {
    const result = reorderInSameColumn(apps, "2", "99");
    expect(result).toBe(apps);
  });

  it("works when source is right before target — source moves after target", () => {
    const result = reorderInSameColumn(apps, "2", "3");
    expect(result.map((a) => a.company_name)).toEqual([
      "Apple",
      "Meta",
      "Google",
      "Netflix",
    ]);
  });

  it("works when source is right after target", () => {
    const result = reorderInSameColumn(apps, "3", "2");
    expect(result.map((a) => a.company_name)).toEqual([
      "Apple",
      "Meta",
      "Google",
      "Netflix",
    ]);
  });
});

describe("moveToColumn", () => {
  const targetApps = [
    makeApp("5", "Amazon"),
    makeApp("6", "Spotify"),
    makeApp("7", "Stripe"),
  ];

  const moved = makeApp("2", "Google", "applied");

  it("appends to the end when no target app id is given", () => {
    const result = moveToColumn(targetApps, { ...moved, status: "interviewing" });
    expect(result.map((a) => a.company_name)).toEqual([
      "Amazon",
      "Spotify",
      "Stripe",
      "Google",
    ]);
  });

  it("inserts at the target card position", () => {
    const result = moveToColumn(
      targetApps,
      { ...moved, status: "interviewing" },
      "6",
    );
    expect(result.map((a) => a.company_name)).toEqual([
      "Amazon",
      "Google",
      "Spotify",
      "Stripe",
    ]);
  });

  it("appends when target card is not found", () => {
    const result = moveToColumn(
      targetApps,
      { ...moved, status: "interviewing" },
      "99",
    );
    expect(result.map((a) => a.company_name)).toEqual([
      "Amazon",
      "Spotify",
      "Stripe",
      "Google",
    ]);
  });

  it("inserts at the very start when target is the first card", () => {
    const result = moveToColumn(
      targetApps,
      { ...moved, status: "interviewing" },
      "5",
    );
    expect(result.map((a) => a.company_name)).toEqual([
      "Google",
      "Amazon",
      "Spotify",
      "Stripe",
    ]);
  });
});

describe("buildUpdates", () => {
  it("assigns sequential kanban_order starting from 0", () => {
    const apps = [
      makeApp("1", "Apple"),
      makeApp("2", "Google"),
      makeApp("3", "Meta"),
    ];
    const updates = buildUpdates(apps, "interviewing");
    expect(updates).toEqual([
      { id: "1", status: "interviewing", kanban_order: 0 },
      { id: "2", status: "interviewing", kanban_order: 1 },
      { id: "3", status: "interviewing", kanban_order: 2 },
    ]);
  });
});
