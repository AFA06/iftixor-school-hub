import { useState } from 'react';
import { Plus, Search, MapPin, Bus, Users, Phone, Eye, Pencil, Trash2, Navigation } from 'lucide-react';
import { PageHeader, DataTableSkeleton, EmptyState, StatusBadge, StatsCard } from '@/components/common/CommonComponents';
import { useBusRoutes, useStudents } from '@/hooks/useApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { BusRoute } from '@/api/mock';

// Mock live trips
const mockTrips = [
  { id: '1', busNumber: '01-A-123', route: 'Route A - City Center', driver: 'Akmal Rahimov', status: 'in_transit', lastUpdate: '08:45 AM', progress: 75 },
  { id: '2', busNumber: '01-A-124', route: 'Route B - Residential Area', driver: 'Bobir Toshev', status: 'at_stop', lastUpdate: '08:42 AM', progress: 50 },
  { id: '3', busNumber: '01-A-125', route: 'Route C - Suburb', driver: 'Dilshod Karimov', status: 'completed', lastUpdate: '08:30 AM', progress: 100 },
];

export default function BusPage() {
  const [activeTab, setActiveTab] = useState('routes');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [isViewRouteOpen, setIsViewRouteOpen] = useState(false);
  const [isAssignStudentsOpen, setIsAssignStudentsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<BusRoute | null>(null);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);

  const { data: routes, isLoading } = useBusRoutes();
  const { data: students } = useStudents();

  const filteredRoutes = routes?.filter(route =>
    route.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    route.busNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddRoute = () => {
    toast.success('Route created successfully');
    setIsAddRouteOpen(false);
  };

  const handleViewRoute = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsViewRouteOpen(true);
  };

  const handleAssignStudents = (route: BusRoute) => {
    setSelectedRoute(route);
    setSelectedStudents([]);
    setIsAssignStudentsOpen(true);
  };

  const handleSaveStudentAssignment = () => {
    toast.success(`${selectedStudents.length} students assigned to ${selectedRoute?.name}`);
    setIsAssignStudentsOpen(false);
    setSelectedStudents([]);
  };

  const handleDeleteRoute = (route: BusRoute) => {
    setSelectedRoute(route);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast.success(`${selectedRoute?.name} deleted successfully`);
    setIsDeleteDialogOpen(false);
    setSelectedRoute(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'bg-blue-100 text-blue-800';
      case 'at_stop':
        return 'bg-amber-100 text-amber-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'in_transit':
        return 'In Transit';
      case 'at_stop':
        return 'At Stop';
      case 'completed':
        return 'Completed';
      default:
        return status;
    }
  };

  if (isLoading) {
    return (
      <div className="page-container">
        <PageHeader title="Bus & Routes" description="Manage school bus routes and tracking" />
        <DataTableSkeleton />
      </div>
    );
  }

  return (
    <div className="page-container">
      <PageHeader 
        title="Bus & Routes" 
        description="Manage school bus routes and live tracking"
      >
        <Button onClick={() => setIsAddRouteOpen(true)} className="btn-gradient">
          <Plus className="h-4 w-4 mr-2" />
          Add Route
        </Button>
      </PageHeader>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          title="Total Routes"
          value={routes?.length || 0}
          icon={MapPin}
          description="Active routes"
        />
        <StatsCard
          title="Total Buses"
          value={routes?.length || 0}
          icon={Bus}
          description="In service"
        />
        <StatsCard
          title="Students"
          value={routes?.reduce((sum, r) => sum + r.studentCount, 0) || 0}
          icon={Users}
          description="Using bus service"
        />
        <StatsCard
          title="Active Trips"
          value={mockTrips.filter(t => t.status !== 'completed').length}
          icon={Navigation}
          description="Currently running"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="routes">Routes</TabsTrigger>
          <TabsTrigger value="live">Live Trips</TabsTrigger>
          <TabsTrigger value="students">Student Assignment</TabsTrigger>
        </TabsList>

        {/* Routes Tab */}
        <TabsContent value="routes">
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search routes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {filteredRoutes?.length === 0 ? (
            <EmptyState
              title="No routes found"
              description="Create your first bus route to get started."
            />
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRoutes?.map((route) => (
                <div key={route.id} className="card-elevated p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Bus className="h-6 w-6 text-primary" />
                    </div>
                    <span className="px-2 py-1 rounded-full bg-muted text-xs font-medium">
                      {route.busNumber}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{route.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{route.studentCount} students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{route.stops.length} stops</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{route.driver}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewRoute(route)}>
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleAssignStudents(route)}>
                      <Users className="h-3 w-3 mr-1" />
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Live Trips Tab */}
        <TabsContent value="live">
          {/* Map Placeholder */}
          <div className="card-elevated p-6 mb-6">
            <h3 className="font-semibold mb-4">Live Map</h3>
            <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <MapPin className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p>Map integration coming soon</p>
                <p className="text-sm">Real-time bus tracking will be displayed here</p>
              </div>
            </div>
          </div>

          {/* Trips Table */}
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Bus</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Route</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Driver</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Progress</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTrips.map((trip) => (
                    <tr key={trip.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Bus className="h-4 w-4 text-primary" />
                          </div>
                          <span className="font-medium">{trip.busNumber}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm">{trip.route}</td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{trip.driver}</td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                          {getStatusLabel(trip.status)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${trip.progress}%` }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{trip.progress}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-muted-foreground">{trip.lastUpdate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        {/* Student Assignment Tab */}
        <TabsContent value="students">
          <div className="card-elevated overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Student</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Class</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase">Assigned Route</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, idx) => {
                    const assignedRoute = idx % 3 === 0 ? routes?.[0]?.name : idx % 3 === 1 ? routes?.[1]?.name : null;
                    return (
                      <tr key={student.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-semibold text-primary">
                                {student.name.charAt(0)}
                              </span>
                            </div>
                            <span className="font-medium">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm">{student.class}</td>
                        <td className="px-4 py-4">
                          {assignedRoute ? (
                            <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                              {assignedRoute}
                            </span>
                          ) : (
                            <span className="text-sm text-muted-foreground">Not assigned</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-right">
                          <Select>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Assign route" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="none">No Route</SelectItem>
                              {routes?.map(route => (
                                <SelectItem key={route.id} value={route.id}>{route.name}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Route Modal */}
      <Dialog open={isAddRouteOpen} onOpenChange={setIsAddRouteOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Route</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Route Name</Label>
              <Input placeholder="e.g., Route A - City Center" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Bus Number</Label>
                <Input placeholder="e.g., 01-A-123" />
              </div>
              <div className="grid gap-2">
                <Label>Schedule</Label>
                <Input placeholder="e.g., 07:30 AM" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Driver Name</Label>
              <Input placeholder="Enter driver name" />
            </div>
            <div className="grid gap-2">
              <Label>Driver Phone</Label>
              <Input placeholder="+998901234567" />
            </div>
            <div className="grid gap-2">
              <Label>Stops (comma separated)</Label>
              <Input placeholder="Stop 1, Stop 2, Stop 3, School" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddRouteOpen(false)}>Cancel</Button>
            <Button onClick={handleAddRoute} className="btn-gradient">Create Route</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Route Drawer */}
      <Sheet open={isViewRouteOpen} onOpenChange={setIsViewRouteOpen}>
        <SheetContent className="sm:max-w-[400px]">
          <SheetHeader>
            <SheetTitle>Route Details</SheetTitle>
          </SheetHeader>
          {selectedRoute && (
            <div className="mt-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Bus className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">{selectedRoute.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedRoute.busNumber}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Driver</span>
                  <span className="font-medium">{selectedRoute.driver}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Phone</span>
                  <span className="font-medium">{selectedRoute.driverPhone}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Students</span>
                  <span className="font-medium">{selectedRoute.studentCount}</span>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-3">Stops ({selectedRoute.stops.length})</h4>
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{idx + 1}</span>
                      </div>
                      <span className="text-sm">{stop}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1">
                  <Pencil className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button variant="destructive" className="flex-1" onClick={() => { setIsViewRouteOpen(false); handleDeleteRoute(selectedRoute); }}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      {/* Assign Students Modal */}
      <Dialog open={isAssignStudentsOpen} onOpenChange={setIsAssignStudentsOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Assign Students to {selectedRoute?.name}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search students..." className="pl-10" />
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {students?.map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                  <Checkbox 
                    checked={selectedStudents.includes(student.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedStudents([...selectedStudents, student.id]);
                      } else {
                        setSelectedStudents(selectedStudents.filter(id => id !== student.id));
                      }
                    }}
                  />
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {student.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-sm">{student.name}</p>
                    <p className="text-xs text-muted-foreground">{student.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center justify-between w-full">
              <span className="text-sm text-muted-foreground">{selectedStudents.length} selected</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setIsAssignStudentsOpen(false)}>Cancel</Button>
                <Button onClick={handleSaveStudentAssignment} className="btn-gradient">Assign Students</Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Route</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedRoute?.name}"? This will unassign all students from this route.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
