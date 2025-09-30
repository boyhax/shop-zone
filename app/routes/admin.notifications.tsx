import { useState } from "react";
import { useLoaderData, type LoaderFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";
import { 
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  Settings,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  Send,
  Users,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye
} from "lucide-react";

export const clientLoader: LoaderFunction = async () => {
  const notifications = [
    {
      id: "NOTIF-001",
      title: "Order Confirmation",
      type: "email",
      recipient: "customer",
      subject: "Your order has been confirmed",
      content: "Thank you for your order. We'll send you tracking information soon.",
      status: "active",
      lastSent: "2024-01-15T10:30:00Z",
      sentCount: 1245
    },
    {
      id: "NOTIF-002",
      title: "Low Stock Alert",
      type: "email",
      recipient: "admin",
      subject: "Product running low on stock",
      content: "The following products are running low on inventory and need restocking.",
      status: "active",
      lastSent: "2024-01-14T15:45:00Z",
      sentCount: 23
    },
    {
      id: "NOTIF-003",
      title: "Welcome Message",
      type: "email",
      recipient: "customer",
      subject: "Welcome to our store!",
      content: "Welcome to ShopZone! Here's everything you need to know to get started.",
      status: "draft",
      lastSent: null,
      sentCount: 0
    },
    {
      id: "NOTIF-004",
      title: "Order Shipped",
      type: "sms",
      recipient: "customer",
      subject: "Your order is on its way",
      content: "Your order #{{order_id}} has been shipped and is on its way to you.",
      status: "active",
      lastSent: "2024-01-13T09:15:00Z",
      sentCount: 892
    },
    {
      id: "NOTIF-005",
      title: "Payment Failed",
      type: "push",
      recipient: "customer",
      subject: "Payment could not be processed",
      content: "We couldn't process your payment. Please update your payment method.",
      status: "active",
      lastSent: "2024-01-12T14:20:00Z",
      sentCount: 45
    }
  ];

  const templates = [
    {
      id: "TEMP-001",
      name: "Order Confirmation",
      category: "Orders",
      type: "email",
      usage: 1245
    },
    {
      id: "TEMP-002",
      name: "Shipping Notification",
      category: "Shipping",
      type: "email",
      usage: 892
    },
    {
      id: "TEMP-003",
      name: "Welcome Email",
      category: "Marketing",
      type: "email",
      usage: 567
    }
  ];

  const settings = {
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: true,
    orderUpdates: true,
    stockAlerts: true,
    customerRegistrations: true
  };

  const stats = {
    totalNotifications: notifications.length,
    activeNotifications: notifications.filter(n => n.status === "active").length,
    totalSent: notifications.reduce((sum, n) => sum + n.sentCount, 0),
    templates: templates.length
  };

  return { notifications, templates, settings, stats };
};

export default function AdminNotifications({ loaderData }: any) {
  const { notifications, templates, settings, stats } = loaderData;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedRecipient, setSelectedRecipient] = useState("all");

  const filteredNotifications = notifications.filter((notification: any) => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === "all" || notification.type === selectedType;
    const matchesRecipient = selectedRecipient === "all" || notification.recipient === selectedRecipient;
    
    return matchesSearch && matchesType && matchesRecipient;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="default"><CheckCircle className="w-3 h-3 mr-1" />Active</Badge>;
      case "draft":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" />Draft</Badge>;
      case "paused":
        return <Badge variant="outline">Paused</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email":
        return <Mail className="h-4 w-4" />;
      case "sms":
        return <MessageSquare className="h-4 w-4" />;
      case "push":
        return <Smartphone className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            Manage customer communications and admin alerts
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Notification
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalNotifications}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeNotifications}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sent</CardTitle>
            <Send className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalSent.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Templates</CardTitle>
            <Mail className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.templates}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <CardTitle>All Notifications</CardTitle>
                <div className="flex flex-col gap-4 md:flex-row md:items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={selectedRecipient} onValueChange={setSelectedRecipient}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Recipient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Recipients</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Sent Count</TableHead>
                    <TableHead>Last Sent</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredNotifications.map((notification: any) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{notification.title}</div>
                          <div className="text-sm text-muted-foreground truncate max-w-xs">
                            {notification.subject}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(notification.type)}
                          <span className="capitalize">{notification.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          <Users className="w-3 h-3 mr-1" />
                          {notification.recipient}
                        </Badge>
                      </TableCell>
                      <TableCell>{getStatusBadge(notification.status)}</TableCell>
                      <TableCell>{notification.sentCount.toLocaleString()}</TableCell>
                      <TableCell>
                        {notification.lastSent 
                          ? new Date(notification.lastSent).toLocaleDateString()
                          : "Never"
                        }
                      </TableCell>
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
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="mr-2 h-4 w-4" />
                              Send Test
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

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Reusable templates for common communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Usage Count</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template: any) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{template.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(template.type)}
                          <span className="capitalize">{template.type}</span>
                        </div>
                      </TableCell>
                      <TableCell>{template.usage.toLocaleString()}</TableCell>
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
                              Edit Template
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
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
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Notification Settings
                </CardTitle>
                <CardDescription>
                  Configure which notifications to send and when
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email</p>
                  </div>
                  <Switch defaultChecked={settings.emailNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS</p>
                  </div>
                  <Switch defaultChecked={settings.smsNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile apps</p>
                  </div>
                  <Switch defaultChecked={settings.pushNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Order Updates</Label>
                    <p className="text-sm text-muted-foreground">Notify customers of order status changes</p>
                  </div>
                  <Switch defaultChecked={settings.orderUpdates} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">Alert admins when inventory is low</p>
                  </div>
                  <Switch defaultChecked={settings.stockAlerts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">Send promotional emails to customers</p>
                  </div>
                  <Switch defaultChecked={settings.marketingEmails} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMTP Configuration</CardTitle>
                <CardDescription>
                  Configure email server settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpHost">SMTP Host</Label>
                    <Input id="smtpHost" placeholder="smtp.gmail.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">Port</Label>
                    <Input id="smtpPort" placeholder="587" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUser">Username</Label>
                    <Input id="smtpUser" placeholder="your-email@domain.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtpPass">Password</Label>
                    <Input id="smtpPass" type="password" />
                  </div>
                </div>

                <Button>Test Connection</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
