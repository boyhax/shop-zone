import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { 
  ShoppingCart, 
  Users, 
  Package, 
  DollarSign, 
  TrendingUp, 
  Settings,
  BarChart3,
  FileText,
  Plus
} from "lucide-react";
import { Link, type LoaderFunction } from "react-router";
import type { Route } from "./+types/_index";

export const clientLoader: LoaderFunction = async () => {
  // In a real app, fetch these stats from your database
  const stats = {
    totalRevenue: 45231.89,
    totalOrders: 2350,
    totalProducts: 486,
    totalCustomers: 1547,
    recentOrders: [
      { id: "ORD-001", customer: "John Doe", amount: 89.99, status: "completed" },
      { id: "ORD-002", customer: "Jane Smith", amount: 159.50, status: "pending" },
      { id: "ORD-003", customer: "Bob Johnson", amount: 275.00, status: "processing" },
    ],
    lowStockProducts: [
      { id: "PROD-001", name: "Wireless Headphones", stock: 5 },
      { id: "PROD-002", name: "Smartphone Case", stock: 3 },
      { id: "PROD-003", name: "USB Cable", stock: 8 },
    ]
  };

  return { stats };
};

export default function AdminDashboard({
    loaderData,
}: Route.ComponentProps) {
    const { stats } = loaderData;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline">
            <Link to="/user">
              <Users className="mr-2 h-4 w-4" />
              User Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link to="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="inline h-3 w-3 mr-1" />
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCustomers}</div>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/admin/products">
            <Package className="h-6 w-6 mb-2" />
            Manage Products
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/admin/orders">
            <ShoppingCart className="h-6 w-6 mb-2" />
            View Orders
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/admin/customers">
            <Users className="h-6 w-6 mb-2" />
            Customer List
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-20 flex-col">
          <Link to="/admin/analytics">
            <BarChart3 className="h-6 w-6 mb-2" />
            Analytics
          </Link>
        </Button>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>
              You have {stats.recentOrders.length} new orders today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{order.id}</p>
                    <p className="text-xs text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">${order.amount}</span>
                    <Badge 
                      variant={
                        order.status === "completed" ? "default" :
                        order.status === "processing" ? "secondary" : "outline"
                      }
                    >
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Alert</CardTitle>
            <CardDescription>
              Products running low on inventory.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.lowStockProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.id}</p>
                  </div>
                  <Badge variant="destructive">
                    {product.stock} left
                  </Badge>
                </div>
              ))}
            </div>
            <Separator className="my-4" />
            <Button asChild variant="outline" className="w-full">
              <Link to="/admin/inventory">Manage Inventory</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Settings & Reports */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Store Settings
            </CardTitle>
            <CardDescription>
              Configure your store preferences and settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/settings/general">General Settings</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/settings/payment">Payment Methods</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/settings/shipping">Shipping Options</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Reports
            </CardTitle>
            <CardDescription>
              Generate and download business reports.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/reports/sales">Sales Report</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/reports/inventory">Inventory Report</Link>
              </Button>
              <Button asChild variant="ghost" className="w-full justify-start">
                <Link to="/admin/reports/customers">Customer Report</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
