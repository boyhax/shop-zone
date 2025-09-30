import { useEffect } from "react";
import { Link } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Separator } from "~/components/ui/separator";
import { 
  CheckCircle,
  Package,
  Truck,
  Mail,
  ArrowRight,
  Download,
  Home,
  User
} from "lucide-react";

export default function OrderConfirmation() {
  // Mock order data - in real app, get from URL params or API
  const orderData = {
    id: "ORD-12345",
    date: new Date().toISOString(),
    status: "confirmed",
    total: 1497.99,
    items: [
      { 
        id: 1, 
        name: "iPhone 15 Pro", 
        price: 999, 
        quantity: 1, 
        image: "https://picsum.photos/60/60?random=1" 
      },
      { 
        id: 2, 
        name: "AirPods Pro", 
        price: 249, 
        quantity: 1, 
        image: "https://picsum.photos/60/60?random=2" 
      }
    ],
    shipping: {
      address: "123 Main Street, New York, NY 10001",
      method: "Standard Shipping",
      estimatedDelivery: "January 20-22, 2024"
    },
    payment: {
      method: "Credit Card",
      last4: "4242"
    }
  };

  const subtotal = orderData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 15;
  const tax = subtotal * 0.08;

  // Clear cart on mount (in real app, this would happen after successful payment)
  useEffect(() => {
    // Cart would be cleared via context here
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="w-4 h-4" />
              Back to store
            </Link>
            <h1 className="text-lg font-medium text-gray-900">Order Confirmation</h1>
            <div className="w-28"></div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-gray-600 mb-4">
            Thank you for your purchase. Your order has been successfully placed.
          </p>
          <div className="inline-flex items-center gap-4 text-sm">
            <span className="text-gray-500">Order Number:</span>
            <span className="font-mono font-semibold text-lg">{orderData.id}</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderData.items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">${item.price}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Delivery Address</h4>
                  <p className="text-gray-600">{orderData.shipping.address}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Shipping Method</h4>
                  <p className="text-gray-600">{orderData.shipping.method}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Estimated Delivery</h4>
                  <p className="text-gray-600">{orderData.shipping.estimatedDelivery}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-5 bg-gray-900 rounded text-white text-xs flex items-center justify-center">
                    CARD
                  </div>
                  <span className="text-gray-600">
                    {orderData.payment.method} ending in {orderData.payment.last4}
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary & Actions */}
          <div className="space-y-6">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total</span>
                  <span>${orderData.total.toFixed(2)}</span>
                </div>

                <Badge variant="default" className="w-full justify-center py-2">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Payment Confirmed
                </Badge>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>What's Next?</CardTitle>
                <CardDescription>
                  Here's what you can do now
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Download className="mr-2 h-4 w-4" />
                  Download Receipt
                </Button>
                
                <Button variant="outline" className="w-full justify-start" asChild>
                  <Link to="/user">
                    <User className="mr-2 h-4 w-4" />
                    Track Your Order
                  </Link>
                </Button>
                
                <Button className="w-full" asChild>
                  <Link to="/">
                    Continue Shopping
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Order Status Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm">Order Confirmed</p>
                      <p className="text-xs text-gray-600">Just now</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm text-gray-500">Processing</p>
                      <p className="text-xs text-gray-400">Usually within 1-2 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm text-gray-500">Shipped</p>
                      <p className="text-xs text-gray-400">Usually within 1-2 days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <div>
                      <p className="font-medium text-sm text-gray-500">Delivered</p>
                      <p className="text-xs text-gray-400">{orderData.shipping.estimatedDelivery}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-center space-y-2">
              <h3 className="font-semibold">Need Help?</h3>
              <p className="text-sm text-gray-600">
                If you have any questions about your order, please contact our customer service team.
              </p>
              <div className="flex items-center justify-center gap-4 mt-4">
                <Button variant="outline" size="sm">
                  <Mail className="mr-2 h-4 w-4" />
                  Email Support
                </Button>
                <Button variant="outline" size="sm">
                  Chat with Us
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
