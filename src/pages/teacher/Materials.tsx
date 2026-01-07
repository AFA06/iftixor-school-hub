import { useState } from "react";
import { PageHeader } from "@/components/common/CommonComponents";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLibraryItems } from "@/hooks/useApi";
import { FileText } from "lucide-react";

export default function TeacherMaterials() {
  const [query, setQuery] = useState("");
  const { data: items } = useLibraryItems();

  const filtered = (items || []).filter((i) =>
    [i.title, i.subject].some((field) =>
      field.toLowerCase().includes(query.toLowerCase())
    )
  );

  return (
    <div className="page-container">
      <PageHeader
        title="Teaching materials"
        description="Search through shared lesson plans, worksheets and digital resources."
      />

      <Card className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div className="flex-1">
            <p className="text-xs text-muted-foreground mb-1">Search materials</p>
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by title or subject"
            />
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="section-title mb-4">Results</h3>
        {filtered.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No materials match your search yet. Try a different keyword or clear the filter.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4 text-sm">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="border border-border rounded-lg p-3 bg-muted/40 flex flex-col gap-2"
              >
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.subject} • {item.type} • {item.size}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Uploaded by {item.uploadedBy} on {item.uploadedAt}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
