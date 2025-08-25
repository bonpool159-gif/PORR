'use client';

import { useAuth } from '@/components/providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Store, 
  ShoppingCart, 
  Truck, 
  CreditCard, 
  Users, 
  BarChart3,
  Bell,
  Settings,
  PlusCircle,
  ArrowUpRight,
  ArrowDownRight,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  activeOrders: number;
  totalCustomers: number;
  orderGrowth: number;
  revenueGrowth: number;
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    activeOrders: 0,
    totalCustomers: 0,
    orderGrowth: 0,
    revenueGrowth: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats');
        if (response.ok) {
          const data = await response.json();
          setStats(data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      change: stats.orderGrowth,
      icon: ShoppingCart,
      color: "text-blue-600"
    },
    {
      title: "Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueGrowth,
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Active Orders",
      value: stats.activeOrders,
      icon: Clock,
      color: "text-orange-600"
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: Users,
      color: "text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Store className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Link href="/dashboard/orders/new">
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.name}!
          </h2>
          <p className="text-gray-600">
            Here's what's happening with your restaurant today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                {stat.change !== undefined && (
                  <p className={`text-xs flex items-center ${
                    stat.change >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.change >= 0 ? (
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(stat.change)}% from last month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common tasks and shortcuts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/dashboard/orders">
                    <Button variant="outline" className="w-full justify-start">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      View Orders
                    </Button>
                  </Link>
                  <Link href="/dashboard/menu">
                    <Button variant="outline" className="w-full justify-start">
                      <Store className="h-4 w-4 mr-2" />
                      Manage Menu
                    </Button>
                  </Link>
                  <Link href="/dashboard/deliveries">
                    <Button variant="outline" className="w-full justify-start">
                      <Truck className="h-4 w-4 mr-2" />
                      Delivery Management
                    </Button>
                  </Link>
                  <Link href="/dashboard/pos">
                    <Button variant="outline" className="w-full justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      POS System
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest updates and notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New order received</p>
                        <p className="text-xs text-gray-500">Order #ORD-001 - $25.99</p>
                      </div>
                      <span className="text-xs text-gray-500">2m ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Order delivered</p>
                        <p className="text-xs text-gray-500">Order #ORD-002 delivered successfully</p>
                      </div>
                      <span className="text-xs text-gray-500">15m ago</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">Low stock alert</p>
                        <p className="text-xs text-gray-500">Margherita Pizza running low</p>
                      </div>
                      <span className="text-xs text-gray-500">1h ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest orders from your restaurant</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <ShoppingCart className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No orders yet. Orders will appear here once customers start placing them.</p>
                  <Link href="/dashboard/menu" className="inline-block mt-4">
                    <Button>Set up your menu first</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu">
            <Card>
              <CardHeader>
                <CardTitle>Menu Management</CardTitle>
                <CardDescription>Manage your restaurant's menu and products</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Store className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Start building your digital menu to accept online orders.</p>
                  <Link href="/dashboard/menu/categories" className="inline-block mt-4">
                    <Button>Create Menu Categories</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customers">
            <Card>
              <CardHeader>
                <CardTitle>Customer Management</CardTitle>
                <CardDescription>View and manage your customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Customer data will appear here as they place orders.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
                <CardDescription>Business insights and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12 text-gray-500">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Detailed analytics will be available once you have order data.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}