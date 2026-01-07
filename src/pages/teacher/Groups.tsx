import { useState } from "react";
import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";

const mockGroups = [
  {
    id: "g1",
    name: "Math Olympiad",
    students: 12,
    description: "After-school enrichment group for advanced mathematics.",
  },
  {
    id: "g2",
    name: "Debate Club",
    students: 18,
    description: "Weekly debate sessions preparing students for competitions.",
  },
  {
    id: "g3",
    name: "Robotics Lab",
    students: 10,
    description: "Project-based learning with robotics kits and coding.",
  },
];

export default function TeacherGroups() {
  const [query, setQuery] = useState("");

  const filtered = mockGroups.filter((g) =>
    g.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Teacher groups"
        description="View and search the student groups and clubs you supervise."
      />

      <Card className="p-4 mb-6">
        <div className="grid sm:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)] gap-4 items-center">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Search groups</p>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type to filter by group name"
            />
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((group) => (
          <Card key={group.id} className="p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <p className="font-medium">{group.name}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {group.students} students
              </span>
            </div>
            <p className="text-xs text-muted-foreground">{group.description}</p>
          </Card>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No groups match this search.
          </p>
        )}
      </div>
    </div>
  );
}
