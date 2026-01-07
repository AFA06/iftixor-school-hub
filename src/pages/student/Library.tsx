import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { LibraryBig, CalendarDays } from 'lucide-react';

const mockBorrowed = [
  {
    id: 'b1',
    title: 'The Curious World of Science',
    author: 'A. Karimova',
    borrowedOn: '2024-09-02',
    dueDate: '2024-09-23',
  },
  {
    id: 'b2',
    title: 'Uzbek History – Volume 1',
    author: 'S. Abdullaev',
    borrowedOn: '2024-09-10',
    dueDate: '2024-10-01',
  },
];

const StudentLibrary = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="Library"
        description="Read-only view of books borrowed on your student account."
      />

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <LibraryBig className="h-4 w-4 text-primary" />
            Borrowed books
          </h3>
          {mockBorrowed.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Borrowed books will appear here once the librarian checks them out to your account.
            </p>
          ) : (
            <div className="space-y-3">
              {mockBorrowed.map((book) => (
                <div
                  key={book.id}
                  className="border border-border rounded-md px-3 py-2 flex items-start justify-between gap-3 bg-muted/40"
                >
                  <div>
                    <p className="font-medium">{book.title}</p>
                    <p className="text-xs text-muted-foreground mb-1">by {book.author}</p>
                    <p className="text-xs text-muted-foreground">
                      Borrowed {book.borrowedOn} • Due {book.dueDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4 flex flex-col gap-3">
          <h3 className="section-title flex items-center gap-2">
            <CalendarDays className="h-4 w-4 text-primary" />
            Library policy
          </h3>
          <p className="text-sm text-muted-foreground">
            Iftixor tracks due dates and, where enabled, can send reminders via the mobile app.
            Fines and renewals are handled by the librarian; the web panel is purely informational
            for students.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default StudentLibrary;