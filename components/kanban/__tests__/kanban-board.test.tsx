import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import type { ReactNode } from "react";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import type { ApplicationRow, ApplicationStatus } from "@/lib/kanban-sort";

type MockDragEvent = {
  canceled: boolean;
  operation: {
    source: {
      id: string;
      data: { application: ApplicationRow };
    };
    target: {
      id: string;
      data: { application: ApplicationRow };
    };
  };
};

let capturedOnDragEnd: ((event: MockDragEvent) => void) | null = null;

const mockMutate = vi.fn();

vi.mock("@/hooks/use-applications", () => ({
  useKanbanApplications: (initialData: ApplicationRow[]) => ({
    data: initialData,
  }),
  useReorderApplications: () => ({
    mutate: mockMutate,
  }),
}));

vi.mock("@dnd-kit/react", () => ({
  DragDropProvider: ({
    children,
    onDragEnd,
  }: {
    children: ReactNode;
    onDragEnd?: (event: MockDragEvent) => void;
  }) => {
    capturedOnDragEnd = onDragEnd ?? null;
    return <div data-testid="drag-provider">{children}</div>;
  },
  useDraggable: () => ({ ref: vi.fn(), isDragging: false }),
  useDroppable: () => ({ ref: vi.fn(), isDropTarget: false }),
  DragOverlay: ({ children }: { children: ReactNode | ((v: null) => null) }) =>
    typeof children === "function" ? children(null) : children,
}));

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

beforeEach(() => {
  capturedOnDragEnd = null;
  mockMutate.mockReset();
});

describe("KanbanBoard", () => {
  it("renders cards grouped by status", () => {
    const apps = [
      makeApp("1", "Apple", "applied"),
      makeApp("2", "Google", "interviewing"),
    ];

    render(<KanbanBoard applications={apps} />);

    expect(screen.getByText("Apple")).toBeDefined();
    expect(screen.getByText("Google")).toBeDefined();
  });

  it("reorders cards within the same column on drag end", () => {
    const apps = [
      makeApp("1", "Apple", "applied"),
      makeApp("2", "Google", "applied"),
    ];

    render(<KanbanBoard applications={apps} />);

    expect(capturedOnDragEnd).not.toBeNull();

    act(() => {
      capturedOnDragEnd!({
        canceled: false,
        operation: {
          source: {
            id: "1",
            data: {
              application: makeApp("1", "Apple", "applied"),
            },
          },
          target: {
            id: "sortable-2",
            data: {
              application: makeApp("2", "Google", "applied"),
            },
          },
        },
      });
    });

    expect(mockMutate).toHaveBeenCalledTimes(1);

    const updateArg = mockMutate.mock.calls[0][0];
    expect(updateArg).toEqual([
      { id: "2", status: "applied", kanban_order: 0 },
      { id: "1", status: "applied", kanban_order: 1 },
    ]);
  });

  it("moves a card between columns when dropped on a card in another column", () => {
    const apps = [
      makeApp("1", "Apple", "applied"),
      makeApp("2", "Google", "interviewing"),
    ];

    render(<KanbanBoard applications={apps} />);

    act(() => {
      capturedOnDragEnd!({
        canceled: false,
        operation: {
          source: {
            id: "1",
            data: {
              application: makeApp("1", "Apple", "applied"),
            },
          },
          target: {
            id: "sortable-2",
            data: {
              application: makeApp("2", "Google", "interviewing"),
            },
          },
        },
      });
    });

    expect(mockMutate).toHaveBeenCalledTimes(1);
    const updateArg = mockMutate.mock.calls[0][0];

    const appliedUpdates = updateArg.filter(
      (u: { status: string }) => u.status === "applied",
    );
    const interviewingUpdates = updateArg.filter(
      (u: { status: string }) => u.status === "interviewing",
    );

    expect(appliedUpdates).toHaveLength(0);
    expect(interviewingUpdates).toEqual([
      { id: "1", status: "interviewing", kanban_order: 0 },
      { id: "2", status: "interviewing", kanban_order: 1 },
    ]);
  });

  it("ignores canceled events", () => {
    const apps = [
      makeApp("1", "Apple", "applied"),
      makeApp("2", "Google", "applied"),
    ];

    render(<KanbanBoard applications={apps} />);

    act(() => {
      capturedOnDragEnd!({
        canceled: true,
        operation: {
          source: {
            id: "1",
            data: { application: makeApp("1", "Apple", "applied") },
          },
          target: {
            id: "sortable-2",
            data: { application: makeApp("2", "Google", "applied") },
          },
        },
      });
    });

    expect(mockMutate).not.toHaveBeenCalled();
  });
});
