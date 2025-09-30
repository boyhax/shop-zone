import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  Lock,
  Check,
  Package
} from "lucide-react";
import { useCart } from "../contexts/CartContext";

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getTotalPrice();
  const shipping = 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { id: 1, name: "Shipping", icon: Truck },
    { id: 2, name: "Payment", icon: CreditCard },
    { id: 3, name: "Review", icon: Check }
  ];

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    clearCart(); // Clear cart after successful order
    navigate('/order-confirmation');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue shopping
            </Link>
            <h1 className="text-lg font-medium text-gray-900">Checkout</h1>
            <div className="w-28"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12">
          {/* Main Checkout Form */}
          <div className="lg:col-span-7">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  const isActive = currentStep === step.id;
                  const isCompleted = currentStep > step.id;
                  
                  return (
                    <div key={step.id} className="flex items-center">
                      <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        isCompleted 
                          ? 'bg-gray-900 border-gray-900 text-white' 
                          : isActive 
                          ? 'border-gray-900 text-gray-900 bg-white' 
                          : 'border-gray-300 text-gray-300 bg-white'
                      }`}>
                        {isCompleted ? (
                          <Check className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <span className={`ml-2 text-sm font-medium ${
                        isActive || isCompleted ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {step.name}
                      </span>
                      {index < steps.length - 1 && (
                        <div className={`mx-6 flex-1 h-0.5 ${
                          isCompleted ? 'bg-gray-900' : 'bg-gray-300'
                        }`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 1: Shipping Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                  <CardDescription>
                    Where should we deliver your order?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="email" type="email" placeholder="john@example.com" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input id="phone" placeholder="+1 (555) 123-4567" className="pl-10" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street address</Label>
                    <Input id="address" placeholder="123 Main Street" />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button onClick={() => setCurrentStep(2)} className="w-full bg-gray-900 hover:bg-gray-800">
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Payment Information */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Information
                  </CardTitle>
                  <CardDescription>
                    Choose your payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="card" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="card">Credit Card</TabsTrigger>
                      <TabsTrigger value="paypal">PayPal</TabsTrigger>
                      <TabsTrigger value="apple">Apple Pay</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="card" className="space-y-4 mt-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card number</Label>
                        <div className="relative">
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="pl-10" />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </TabsContent>

                    <TabsContent value="paypal" className="mt-6">
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="text-4xl mb-4">🅿️</div>
                        <p className="text-gray-600 mb-4">You'll be redirected to PayPal to complete your payment</p>
                        <Button variant="outline">Continue with PayPal</Button>
                      </div>
                    </TabsContent>

                    <TabsContent value="apple" className="mt-6">
                      <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
                        <div className="text-4xl mb-4">🍎</div>
                        <p className="text-gray-600 mb-4">Pay securely with Touch ID or Face ID</p>
                        <Button variant="outline">Pay with Apple Pay</Button>
                      </div>
                    </TabsContent>
                  </Tabs>

                  <div className="flex gap-3 pt-6">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={() => setCurrentStep(3)} className="flex-1 bg-gray-900 hover:bg-gray-800">
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Order Review */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Check className="w-5 h-5" />
                    Review Your Order
                  </CardTitle>
                  <CardDescription>
                    Please review your order details before placing it
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div>
                    <h3 className="font-medium mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-medium">${item.price}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div>
                    <h3 className="font-medium mb-3">Shipping Address</h3>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <p className="font-medium">John Doe</p>
                      <p>123 Main Street</p>
                      <p>New York, NY 10001</p>
                      <p>john@example.com</p>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div>
                    <h3 className="font-medium mb-3">Payment Method</h3>
                    <div className="p-3 bg-gray-50 rounded-lg text-sm">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        <span>•••• •••• •••• 3456</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} className="flex-1">
                      Back
                    </Button>
                    <Button 
                      onClick={handlePlaceOrder} 
                      className="flex-1 bg-gray-900 hover:bg-gray-800"
                      disabled={isLoading}
                    >
                      {isLoading ? "Placing Order..." : "Place Order"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5 mt-8 lg:mt-0">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium">${item.price}</p>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pricing */}
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

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-lg">
                  <Lock className="w-4 h-4" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
