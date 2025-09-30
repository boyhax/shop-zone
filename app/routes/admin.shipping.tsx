import { useState } from "react";
import { Link, useLoaderData, type LoaderFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Truck,
  MapPin,
  Clock,
  DollarSign,
  Settings,
  Globe
} from "lucide-react";

export const clientLoader: LoaderFunction = async () => {
  const shippingRates = [
    {
      id: "RATE-001",
      name: "Standard Shipping",
      description: "3-5 business days",
      rate: 9.99,
      freeThreshold: 100,
      zones: ["Domestic"],
      status: "active",
      estimatedDays: "3-5"
    },
    {
      id: "RATE-002", 
      name: "Express Shipping",
      description: "1-2 business days",
      rate: 19.99,
      freeThreshold: 200,
      zones: ["Domestic"],
      status: "active",
      estimatedDays: "1-2"
    },
    {
      id: "RATE-003",
      name: "International Standard",
      description: "7-14 business days",
      rate: 24.99,
      freeThreshold: 150,
      zones: ["International"],
      status: "active",
      estimatedDays: "7-14"
    },
    {
      id: "RATE-004",
      name: "Next Day Delivery",
      description: "Next business day",
      rate: 29.99,
      freeThreshold: 300,
      zones: ["Metro Areas"],
      status: "draft",
      estimatedDays: "1"
    }
  ];

  const shippingZones = [
    {
      id: "ZONE-001",
      name: "Domestic",
      countries: ["United States"],
      regions: ["All States"],
      status: "active"
    },
    {
      id: "ZONE-002",
      name: "International",
      countries: ["Canada", "Mexico", "United Kingdom", "Australia"],
      regions: ["North America", "Europe", "Oceania"],
      status: "active"
    },
    {
      id: "ZONE-003",
      name: "Metro Areas",
      countries: ["United States"],
      regions: ["New York", "Los Angeles", "Chicago", "Houston"],
      status: "active"
    }
  ];

  const stats = {
    totalRates: shippingRates.length,
    activeRates: shippingRates.filter(r => r.status === "active").length,
    totalZones: shippingZones.length,
    avgShippingCost: shippingRates.reduce((sum, rate) => sum + rate.rate, 0) / shippingRates.length
  };

  return { shippingRates, shippingZones, stats };
};

export default function AdminShipping({ loaderData }: any) {
  const { shippingRates, shippingZones, stats } = loaderData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState("all");

  const filteredRates = shippingRates.filter((rate: any) => {
    const matchesSearch = rate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rate.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === "all" || rate.zones.includes(selectedZone);
    
    return matchesSearch && matchesZone;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default">Active</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Shipping</h1>
          <p className="text-muted-foreground">
            Manage shipping rates, zones, and delivery options
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Shipping Rate
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Rates</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRates}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rates</CardTitle>
            <Truck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeRates}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Shipping Zones</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalZones}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rate</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.avgShippingCost.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="rates">Shipping Rates</TabsTrigger>
          <TabsTrigger value="zones">Shipping Zones</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="rates">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>Shipping Rates</CardTitle>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search rates..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={selectedZone} onValueChange={setSelectedZone}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Zone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Zones</SelectItem>
                      <SelectItem value="Domestic">Domestic</SelectItem>
                      <SelectItem value="International">International</SelectItem>
                      <SelectItem value="Metro Areas">Metro Areas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Rate</TableHead>
                    <TableHead>Free Threshold</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>Zones</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRates.map((rate: any) => (
                    <TableRow key={rate.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{rate.name}</div>
                          <div className="text-sm text-muted-foreground">{rate.description}</div>
                        </div>
                      </TableCell>
                      <TableCell>${rate.rate}</TableCell>
                      <TableCell>${rate.freeThreshold}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          {rate.estimatedDays} days
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          {rate.zones.map((zone: string) => (
                            <Badge key={zone} variant="outline" className="text-xs">
                              {zone}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(rate.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Rate
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="zones">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>
                Define geographical areas for shipping calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zone Name</TableHead>
                    <TableHead>Countries</TableHead>
                    <TableHead>Regions</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shippingZones.map((zone: any) => (
                    <TableRow key={zone.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{zone.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {zone.countries.slice(0, 2).join(", ")}
                          {zone.countries.length > 2 && ` +${zone.countries.length - 2} more`}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          {zone.regions.slice(0, 2).join(", ")}
                          {zone.regions.length > 2 && ` +${zone.regions.length - 2} more`}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(zone.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Zone
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure general shipping preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Enable Free Shipping</Label>
                    <p className="text-sm text-muted-foreground">Offer free shipping above threshold</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="defaultRate">Default Shipping Rate ($)</Label>
                    <Input id="defaultRate" type="number" defaultValue="9.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="freeThreshold">Free Shipping Threshold ($)</Label>
                    <Input id="freeThreshold" type="number" defaultValue="100" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Calculate Shipping by Weight</Label>
                    <p className="text-sm text-muted-foreground">Use product weight for calculations</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
