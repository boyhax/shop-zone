import { useState } from "react";
import { useLoaderData, type LoaderFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Switch } from "~/components/ui/switch";
import { Separator } from "~/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { 
  Settings, 
  Store, 
  CreditCard, 
  Truck, 
  Mail, 
  Shield,
  Palette,
  Globe,
  Save
} from "lucide-react";

export const clientLoader: LoaderFunction = async () => {
  const settings = {
    store: {
      name: "ShopZone",
      description: "Your premium online store",
      email: "support@shopzone.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business St, City, State 12345",
      currency: "USD",
      timezone: "America/New_York"
    },
    notifications: {
      orderEmails: true,
      marketingEmails: false,
      lowStockAlerts: true,
      customerRegistrations: true
    },
    payments: {
      stripeEnabled: true,
      paypalEnabled: true,
      codEnabled: false
    },
    shipping: {
      freeShippingThreshold: 100,
      standardRate: 9.99,
      expressRate: 19.99
    }
  };

  return { settings };
};

export default function AdminSettings({ loaderData }: any) {
  const { settings } = loaderData;
  const [storeSettings, setStoreSettings] = useState(settings.store);
  const [notifications, setNotifications] = useState(settings.notifications);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your store configuration and preferences
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Store className="h-5 w-5" />
                Store Information
              </CardTitle>
              <CardDescription>
                Basic information about your store
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    value={storeSettings.name}
                    onChange={(e) => setStoreSettings({...storeSettings, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    type="email"
                    value={storeSettings.email}
                    onChange={(e) => setStoreSettings({...storeSettings, email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={storeSettings.description}
                  onChange={(e) => setStoreSettings({...storeSettings, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="storePhone">Phone Number</Label>
                  <Input
                    id="storePhone"
                    value={storeSettings.phone}
                    onChange={(e) => setStoreSettings({...storeSettings, phone: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="storeCurrency">Currency</Label>
                  <Input
                    id="storeCurrency"
                    value={storeSettings.currency}
                    onChange={(e) => setStoreSettings({...storeSettings, currency: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <Textarea
                  id="storeAddress"
                  value={storeSettings.address}
                  onChange={(e) => setStoreSettings({...storeSettings, address: e.target.value})}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
              <CardDescription>
                Configure available payment options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Stripe</Label>
                  <p className="text-sm text-muted-foreground">Accept credit and debit cards</p>
                </div>
                <Switch defaultChecked={settings.payments.stripeEnabled} />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>PayPal</Label>
                  <p className="text-sm text-muted-foreground">Accept PayPal payments</p>
                </div>
                <Switch defaultChecked={settings.payments.paypalEnabled} />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Cash on Delivery</Label>
                  <p className="text-sm text-muted-foreground">Accept cash payments on delivery</p>
                </div>
                <Switch defaultChecked={settings.payments.codEnabled} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Shipping Options
              </CardTitle>
              <CardDescription>
                Configure shipping rates and options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="freeShipping">Free Shipping Threshold ($)</Label>
                <Input
                  id="freeShipping"
                  type="number"
                  defaultValue={settings.shipping.freeShippingThreshold}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="standardRate">Standard Shipping Rate ($)</Label>
                  <Input
                    id="standardRate"
                    type="number"
                    step="0.01"
                    defaultValue={settings.shipping.standardRate}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expressRate">Express Shipping Rate ($)</Label>
                  <Input
                    id="expressRate"
                    type="number"
                    step="0.01"
                    defaultValue={settings.shipping.expressRate}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Notification Settings
              </CardTitle>
              <CardDescription>
                Manage email notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Order Confirmations</Label>
                  <p className="text-sm text-muted-foreground">Send email when orders are placed</p>
                </div>
                <Switch
                  checked={notifications.orderEmails}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, orderEmails: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Send promotional emails to customers</p>
                </div>
                <Switch
                  checked={notifications.marketingEmails}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, marketingEmails: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Low Stock Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
                </div>
                <Switch
                  checked={notifications.lowStockAlerts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, lowStockAlerts: checked})
                  }
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Customer Registrations</Label>
                  <p className="text-sm text-muted-foreground">Get notified when new customers register</p>
                </div>
                <Switch
                  checked={notifications.customerRegistrations}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, customerRegistrations: checked})
                  }
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Manage security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button className="mt-4">Update Password</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
