import { PageHeader } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { toast } from 'sonner';

export const AdminSettings = () => {
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('School settings saved');
    }, 600);
  };

  return (
    <div className="page-container">
      <PageHeader
        title="School Settings"
        description="Configure basic information and academic settings for Iftixor School"
      />

      <div className="grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1.2fr)] gap-6">
        <Card className="p-6 space-y-4">
          <h3 className="font-semibold mb-2">School Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="school-name">School name</Label>
              <Input id="school-name" defaultValue="Iftixor School" placeholder="Enter school name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="school-phone">Phone</Label>
              <Input id="school-phone" defaultValue="+998 90 123 45 67" placeholder="Enter phone" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="school-address">Address</Label>
            <Input id="school-address" defaultValue="Tashkent, Uzbekistan" placeholder="Enter address" />
          </div>
          <div className="flex justify-end pt-2">
            <Button onClick={handleSave} disabled={saving} className="btn-gradient">
              {saving ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="p-6 space-y-4">
            <h3 className="font-semibold">Academic Year</h3>
            <div className="space-y-2">
              <Label>Current year</Label>
              <Select defaultValue="2024-2025">
                <SelectTrigger>
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2023-2024">2023 / 2024</SelectItem>
                  <SelectItem value="2024-2025">2024 / 2025</SelectItem>
                  <SelectItem value="2025-2026">2025 / 2026</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Current term</Label>
              <Select defaultValue="term2">
                <SelectTrigger>
                  <SelectValue placeholder="Select term" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="term1">Term 1</SelectItem>
                  <SelectItem value="term2">Term 2</SelectItem>
                  <SelectItem value="term3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
