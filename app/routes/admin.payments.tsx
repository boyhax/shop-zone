import { useState } from "react";
import { useLoaderData, type LoaderFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";
import { 
  CreditCard,
  DollarSign,
  CheckCircle,
  XCircle,
  Settings,
  Shield,
  Zap,
  Smartphone,
  Banknote,
  Globe,
  Save
} from "lucide-react";

export const clientLoader: LoaderFunction = async () => {
  const paymentMethods = [
    {
      id: "stripe",
      name: "Stripe",
      description: "Accept credit cards, debit cards, and digital wallets",
      icon: "💳",
      enabled: true,
      fees: "2.9% + $0.30",
      currencies: ["USD", "EUR", "GBP"],
      features: ["Credit Cards", "Digital Wallets", "Bank Transfers"],
      status: "connected"
    },
    {
      id: "paypal",
      name: "PayPal",
      description: "PayPal and PayPal Credit payments",
      icon: "🅿️",
      enabled: true,
      fees: "2.9% + $0.30",
      currencies: ["USD", "EUR", "GBP", "CAD"],
      features: ["PayPal Account", "PayPal Credit", "Pay in 4"],
      status: "connected"
    },
    {
      id: "apple_pay",
      name: "Apple Pay",
      description: "Quick checkout with Touch ID or Face ID",
      icon: "🍎",
      enabled: false,
      fees: "2.9% + $0.30",
      currencies: ["USD", "EUR", "GBP"],
      features: ["Touch ID", "Face ID", "Quick Checkout"],
      status: "not_configured"
    },
    {
      id: "google_pay",
      name: "Google Pay",
      description: "Fast and secure payments with Google",
      icon: "🔴",
      enabled: false,
      fees: "2.9% + $0.30",
      currencies: ["USD", "EUR", "GBP"],
      features: ["Quick Checkout", "Android Integration"],
      status: "not_configured"
    },
    {
      id: "bank_transfer",
      name: "Bank Transfer",
      description: "Direct bank-to-bank transfers",
      icon: "🏦",
      enabled: true,
      fees: "1.0%",
      currencies: ["USD"],
      features: ["ACH", "Wire Transfer", "Low Fees"],
      status: "connected"
    },
    {
      id: "cash_on_delivery",
      name: "Cash on Delivery",
      description: "Pay with cash when order is delivered",
      icon: "💵",
      enabled: false,
      fees: "Free",
      currencies: ["USD"],
      features: ["No upfront payment", "Local delivery only"],
      status: "not_configured"
    }
  ];

  const transactions = [
    {
      id: "TXN-001",
      orderId: "ORD-001",
      method: "Stripe",
      amount: 89.99,
      fee: 2.91,
      status: "completed",
      date: "2024-01-15"
    },
    {
      id: "TXN-002",
      orderId: "ORD-002", 
      method: "PayPal",
      amount: 159.50,
      fee: 4.93,
      status: "pending",
      date: "2024-01-14"
    },
    {
      id: "TXN-003",
      orderId: "ORD-003",
      method: "Bank Transfer",
      amount: 275.00,
      fee: 2.75,
      status: "completed",
      date: "2024-01-13"
    }
  ];

  const stats = {
    totalMethods: paymentMethods.length,
    enabledMethods: paymentMethods.filter(m => m.enabled).length,
    totalTransactions: transactions.length,
    totalFees: transactions.reduce((sum, txn) => sum + txn.fee, 0)
  };

  return { paymentMethods, transactions, stats };
};

export default function AdminPayments({ loaderData }: any) {
  const { paymentMethods, transactions, stats } = loaderData;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "connected":
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" />Connected</Badge>;
      case "not_configured":
        return <Badge variant="secondary"><XCircle className="w-3 h-3 mr-1" />Not Configured</Badge>;
      case "pending":
        return <Badge variant="outline">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getTransactionStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Configure payment methods and view transaction history
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Payment Methods</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalMethods}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Enabled</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.enabledMethods}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTransactions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Fees</CardTitle>
            <DollarSign className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalFees.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="methods" className="space-y-6">
        <TabsList>
          <TabsTrigger value="methods">Payment Methods</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="methods">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paymentMethods.map((method: any) => (
              <Card key={method.id} className="relative">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{method.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{method.name}</CardTitle>
                        <CardDescription className="text-sm">
                          {method.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Switch checked={method.enabled} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Status</span>
                      {getStatusBadge(method.status)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Fees</span>
                      <span className="text-sm font-medium">{method.fees}</span>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Currencies</div>
                      <div className="flex gap-1 flex-wrap">
                        {method.currencies.map((currency: string) => (
                          <Badge key={currency} variant="outline" className="text-xs">
                            {currency}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Features</div>
                      <div className="flex gap-1 flex-wrap">
                        {method.features.map((feature: string) => (
                          <Badge key={feature} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button 
                      variant={method.status === "connected" ? "outline" : "default"} 
                      className="w-full"
                      size="sm"
                    >
                      {method.status === "connected" ? "Configure" : "Setup"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>
                Latest payment transactions and their status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction: any) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">{transaction.id}</TableCell>
                      <TableCell>{transaction.orderId}</TableCell>
                      <TableCell>{transaction.method}</TableCell>
                      <TableCell>${transaction.amount}</TableCell>
                      <TableCell>${transaction.fee}</TableCell>
                      <TableCell>{getTransactionStatusBadge(transaction.status)}</TableCell>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
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
                  General Settings
                </CardTitle>
                <CardDescription>
                  Configure payment processing preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Input id="currency" defaultValue="USD" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minAmount">Minimum Order Amount ($)</Label>
                    <Input id="minAmount" type="number" defaultValue="1.00" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Auto-capture Payments</Label>
                    <p className="text-sm text-muted-foreground">Automatically capture authorized payments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Save Payment Methods</Label>
                    <p className="text-sm text-muted-foreground">Allow customers to save cards for future use</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Configure security and fraud prevention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>3D Secure Authentication</Label>
                    <p className="text-sm text-muted-foreground">Require additional authentication for cards</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label>Fraud Detection</Label>
                    <p className="text-sm text-muted-foreground">Enable automatic fraud screening</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAmount">Maximum Transaction Limit ($)</Label>
                  <Input id="maxAmount" type="number" defaultValue="10000" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
