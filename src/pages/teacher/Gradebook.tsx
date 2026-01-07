import { useMemo, useState } from "react";
import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useGrades, useClasses } from "@/hooks/useApi";

export default function TeacherGradebook() {
  const { data: classes } = useClasses();
  const [selectedClassId, setSelectedClassId] = useState<string | undefined>();
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | undefined>();

  const activeClass = useMemo(
    () => classes?.find((c) => !selectedClassId || c.id === selectedClassId),
    [classes, selectedClassId]
  );

  const { data: grades } = useGrades(activeClass?.id, selectedSubjectId);

  const subjects = useMemo(
    () => activeClass?.subjects || [],
    [activeClass]
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Gradebook"
        description="Read and review grades recorded for your classes. Editing here is local-only for demo."
      />

      <div className="grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1.3fr)] gap-6 mb-6">
        <Card className="p-4 flex flex-col gap-3">
          <h3 className="section-title mb-1">Filters</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Class</p>
              <Select value={activeClass?.id} onValueChange={(id) => setSelectedClassId(id)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select class" />
                </SelectTrigger>
                <SelectContent>
                  {classes?.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Subject</p>
              <Select value={selectedSubjectId} onValueChange={(id) => setSelectedSubjectId(id)}>
                <SelectTrigger>
                  <SelectValue placeholder="All subjects" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All subjects</SelectItem>
                  {subjects.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="section-title mb-4">Grades</h3>
        {!grades || grades.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Select a class and subject to view the gradebook entries.
          </p>
        ) : (
          <div className="overflow-x-auto text-sm">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="py-2 pr-4 text-left font-medium">Student</th>
                  <th className="py-2 pr-4 text-left font-medium">Assessment</th>
                  <th className="py-2 pr-4 text-left font-medium">Date</th>
                  <th className="py-2 text-right font-medium">Grade</th>
                </tr>
              </thead>
              <tbody>
                {grades.slice(0, 25).map((g) => (
                  <tr key={g.id} className="border-b border-border/60 last:border-0">
                    <td className="py-2 pr-4">{g.studentName}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{g.type}</td>
                    <td className="py-2 pr-4 text-muted-foreground">{g.date}</td>
                    <td className="py-2 text-right font-medium">
                      {g.grade}/{g.maxGrade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
