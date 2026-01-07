import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';

const mockDocuments = [
  {
    id: 'd1',
    name: 'Enrollment contract 2024/2025',
    type: 'Contract',
    date: '2024-08-15',
    size: '420 KB',
  },
  {
    id: 'd2',
    name: 'Term 1 progress report',
    type: 'Report',
    date: '2024-11-05',
    size: '310 KB',
  },
];

const ParentDocuments = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Documents"
        description="Read-only list of important school documents shared with your family."
      />

      <Card className="p-4">
        <h3 className="section-title mb-4 flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          Shared documents
        </h3>
        {mockDocuments.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Contracts, progress reports and other PDF documents will be listed here once shared by
            the school.
          </p>
        ) : (
          <div className="space-y-3">
            {mockDocuments.map((doc) => (
              <div
                key={doc.id}
                className="border border-border rounded-md px-3 py-2 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {doc.type} • {doc.date} • {doc.size}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                  disabled
                >
                  <Download className="h-3 w-3" />
                  Download (mobile only)
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          Downloads are available in the mobile app, which handles secure document storage and
          offline access. The web panel focuses on visibility and quick reference.
        </p>
      </Card>
    </div>
  );
};

export default ParentDocuments;