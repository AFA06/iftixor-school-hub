import { PageHeader, StatusBadge } from '@/components/common/CommonComponents';
import { Card } from '@/components/ui/card';
import { BusFront, MapPin, Clock } from 'lucide-react';

const mockRoutes = [
  {
    id: 'route-1',
    routeName: 'Route A – North district',
    pickupPoint: '12B Mirzo Ulugbek street',
    pickupTime: '07:30',
    dropoffTime: '16:10',
    driverName: 'J. Karimov',
    busNumber: 'IF-12',
    status: 'On time',
  },
];

const ParentBus = () => {
  return (
    <div className="page-container">
      <PageHeader
        title="School bus"
        description="Read-only overview of your child's bus route and pickup details."
      />

      <div className="grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1.1fr)] gap-6">
        <Card className="p-4">
          <h3 className="section-title mb-4 flex items-center gap-2">
            <BusFront className="h-4 w-4 text-primary" />
            Assigned route
          </h3>
          {mockRoutes.map((route) => (
            <div
              key={route.id}
              className="border border-border rounded-lg p-4 flex flex-col gap-3 bg-muted/40"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold">{route.routeName}</p>
                  <p className="text-xs text-muted-foreground">
                    Bus {route.busNumber} • Driver {route.driverName}
                  </p>
                </div>
                <StatusBadge status={route.status} variant="success" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Pickup point</p>
                    <p className="text-muted-foreground">{route.pickupPoint}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Times</p>
                    <p className="text-muted-foreground">
                      Pickup {route.pickupTime} • Drop-off {route.dropoffTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <p className="text-xs text-muted-foreground mt-4">
            Any temporary changes to pickup location or person responsible are managed via the
            mobile app or by contacting the school office directly.
          </p>
        </Card>

        <Card className="p-4">
          <h3 className="section-title mb-2">Safety & notifications</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The mobile app sends push notifications when your child boards or leaves the bus, where
            supported by GPS and NFC devices.
          </p>
          <p className="text-sm text-muted-foreground">
            The web panel focuses on a clear overview of the regular route, pickup point and
            schedule. For live tracking, please use the Iftixor mobile app.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default ParentBus;