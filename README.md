# OlaClick - Multi-Tenant Restaurant SaaS

A complete restaurant management system similar to OlaClick, built with Next.js, TypeScript, Prisma, and PostgreSQL.

## Features

### 🍕 Digital Menu & QR Ordering
- Auto-generated web menus with QR codes
- PWA support for customers
- Real-time menu updates
- Product variants and modifiers

### 📱 Multi-Channel Ordering
- Web ordering
- QR code scanning
- WhatsApp integration
- In-store POS system

### 🚚 Delivery Management
- Real-time order tracking
- Courier assignment
- Delivery zones and fees
- ETA calculations

### 💳 Payment Processing
- Online payments (Stripe/PayPal ready)
- Cash on Delivery
- Pay at Store
- Multi-currency support

### 📊 Analytics Dashboard
- Sales reports
- Customer insights
- Performance metrics
- Order analytics

### 👥 Customer Management
- CRM system
- Customer segmentation
- Loyalty programs
- Order history

### 🤖 AI Marketing
- WhatsApp campaigns
- Customer segmentation
- Automated messaging
- Performance tracking

### 🏢 Multi-Tenant Architecture
- Multiple restaurants
- Role-based access control
- Store-specific settings
- Centralized management

## Tech Stack

- **Frontend**: Next.js 13, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Cache**: Redis
- **Real-time**: WebSockets (Socket.io)
- **Authentication**: JWT with secure cookies
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Docker support

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Redis (optional, for production)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd olaclick-saas
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Set up the database
```bash
npx prisma db push
npx prisma generate
npm run db:seed
```

5. Run the development server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Demo Accounts

After running the seed script, you can use these demo accounts:

- **Owner**: owner@demo.com / password
- **Cashier**: cashier@demo.com / password
- **Courier**: courier@demo.com / password

## Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up -d
```

This will start:
- Next.js application on port 3000
- PostgreSQL database on port 5432
- Redis on port 6379
- WebSocket server on port 3001

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Stores
- `GET /api/stores` - List stores
- `POST /api/stores` - Create store
- `GET /api/stores/:id` - Get store details
- `PUT /api/stores/:id` - Update store

### Menu Management
- `GET /api/menus/:storeId` - Get menu
- `POST /api/categories` - Create category
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - List orders
- `GET /api/orders/:id` - Get order details
- `PUT /api/orders/:id/status` - Update order status

### Payments
- `POST /api/payments/intent` - Create payment intent
- `POST /api/payments/webhook` - Payment webhooks

## WebSocket Events

### Real-time Updates
- `store:{storeId}:orders` - New orders for store
- `order:{orderId}` - Order status updates
- `courier:{courierId}` - Delivery assignments

## Database Schema

The application uses a comprehensive database schema with the following main entities:

- **Users** - System users with role-based access
- **Stores** - Multi-tenant restaurant data
- **Categories & Products** - Menu management
- **Orders & OrderItems** - Order processing
- **Deliveries** - Delivery tracking
- **Payments** - Payment processing
- **Customers** - Customer management
- **Campaigns** - Marketing campaigns

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please create an issue in the repository.