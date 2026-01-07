import { useState } from "react";
import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useHomework } from "@/hooks/useApi";
import { Plus, Calendar } from "lucide-react";

export default function TeacherHomework() {
  const { data: homework } = useHomework();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selected = homework?.find((h) => h.id === selectedId) || homework?.[0];

  return (
    <div className="page-container">
      <PageHeader
        title="Homework"
        description="Overview of homework you have assigned. Draft creation is demo-only here."
        action={
          <Button size="sm" variant="outline" disabled>
            <Plus className="h-4 w-4 mr-1" />
            New homework (demo)
          </Button>
        }
      />

      <div className="grid lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1.2fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-3">Homework list</h3>
          {!homework || homework.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Homework you create in the teacher module will appear here.
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              {homework.map((task) => (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => setSelectedId(task.id)}
                  className={`w-full text-left border rounded-md px-3 py-2 bg-muted/40 hover:bg-muted transition ${
                    selected?.id === task.id ? "border-primary/40" : "border-border"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium">{task.title}</p>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="h-3 w-3" /> {task.dueDate}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {task.className}  b7 {task.subjectName}
                  </p>
                </button>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="section-title mb-3">Details</h3>
          {!selected ? (
            <p className="text-sm text-muted-foreground">
              Select a homework on the left to view its details.
            </p>
          ) : (
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Title</p>
                <p className="font-medium text-foreground">{selected.title}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Class</p>
                  <p className="text-foreground">{selected.className}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Subject</p>
                  <p className="text-foreground">{selected.subjectName}</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Assigned</p>
                  <p className="text-foreground">{selected.createdAt || ""}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Due</p>
                  <p className="text-foreground">{selected.dueDate}</p>
                </div>
              </div>
              {selected.description && (
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Description</p>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {selected.description}
                  </p>
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
