import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Store, 
  Smartphone, 
  Truck, 
  CreditCard, 
  BarChart3, 
  Users, 
  MessageSquare, 
  ShoppingBag,
  Star,
  CheckCircle
} from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  const features = [
    {
      icon: Store,
      title: "Digital Menu & QR Ordering",
      description: "Auto-generated web menus with QR codes for contactless ordering"
    },
    {
      icon: Smartphone,
      title: "Multi-Channel Orders",
      description: "Orders from web, QR codes, WhatsApp, and in-store POS"
    },
    {
      icon: Truck,
      title: "Delivery Management",
      description: "Real-time tracking, courier assignment, and delivery zones"
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description: "Online payments, cash on delivery, and POS transactions"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Sales reports, customer insights, and performance metrics"
    },
    {
      icon: Users,
      title: "Customer Loyalty",
      description: "CRM, segmentation, loyalty points, and retention campaigns"
    },
    {
      icon: MessageSquare,
      title: "AI Marketing",
      description: "WhatsApp campaigns, chatbot, and automated messaging"
    },
    {
      icon: ShoppingBag,
      title: "Multi-Tenant",
      description: "Multiple stores, role-based access, and centralized management"
    }
  ];

  const benefits = [
    "Increase online orders by 40%",
    "Reduce order processing time by 60%",
    "Improve customer retention by 25%",
    "Streamline delivery operations",
    "Boost revenue with targeted marketing"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Store className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">OlaClick</span>
          </div>
          <nav className="flex items-center space-x-6">
            <Link href="/auth/login" className="text-gray-600 hover:text-blue-600">
              Login
            </Link>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Complete Restaurant Management System
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Digital menus, online ordering, delivery management, POS system, 
            customer loyalty, and AI marketing - all in one powerful platform.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Free Trial</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12">Why Choose OlaClick?</h2>
          <div className="grid md:grid-cols-5 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center justify-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-300" />
                <span className="font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Everything You Need to Run Your Restaurant
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From digital menus to delivery tracking, payment processing to customer loyalty - 
              OlaClick provides all the tools modern restaurants need to succeed.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Maria Rodriguez",
                restaurant: "Taco Libre",
                quote: "OlaClick helped us increase online orders by 50% in just 2 months. The QR menu system is a game-changer!",
                rating: 5
              },
              {
                name: "Ahmed Hassan", 
                restaurant: "Spice Garden",
                quote: "The delivery management and real-time tracking features streamlined our operations completely.",
                rating: 5
              },
              {
                name: "Jennifer Kim",
                restaurant: "Seoul Kitchen",
                quote: "Customer loyalty features helped us retain more customers. The analytics are incredibly detailed.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-0">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4">"{testimonial.quote}"</p>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">{testimonial.restaurant}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Restaurant?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of restaurants already using OlaClick to grow their business.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/auth/register">Start Your Free Trial</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Store className="h-6 w-6" />
                <span className="text-xl font-bold">OlaClick</span>
              </div>
              <p className="text-gray-400">
                Complete restaurant management system for the modern food business.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Features</Link></li>
                <li><Link href="#" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">Documentation</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Help Center</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white">About</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 OlaClick. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}