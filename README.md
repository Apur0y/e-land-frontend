# Eland – AI-Powered Land Intelligence & Investment Platform

> Intelligent land discovery and investment analysis for Bangladesh. Powered by advanced AI algorithms and market analytics.

[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-blue?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)

## 📋 Overview

Eland is a modern real estate technology platform that combines AI-powered analysis with intuitive design to help investors discover, analyze, and invest in land properties across Bangladesh. Our platform provides intelligent insights including price predictions, risk analysis, rental yield calculations, and comparative property analysis.

## ✨ Key Features

### AI-Powered Analysis
- **Price Prediction** – Forecast property values using machine learning models
- **Risk Analysis** – Assess investment risk based on location and market data
- **Rental Yield Calculation** – Estimate rental income potential
- **Property Comparison** – Compare multiple properties side-by-side with AI insights
- **Construction ROI Analysis** – Evaluate return on investment for construction projects

### Core Platform Features
- 🏘️ **Advanced Listings Search** – Filter properties by location, price, size, and more
- 📊 **Market Analytics Dashboard** – Real-time market trends and statistics
- 💳 **Secure Payments** – Integrated Stripe payment processing
- 👥 **User Profiles** – Personalized dashboards and saved listings
- 🔐 **Authentication** – Secure login and registration system
- 📱 **Responsive Design** – Mobile-first, works on all devices
- 🌙 **Dark Mode Support** – Theme switching with next-themes

### Admin Features
- 📈 **Analytics Dashboard** – Monitor platform metrics and user activity
- 📋 **Listings Management** – Approve, edit, or remove property listings
- 👤 **User Management** – Manage user accounts and permissions
- 💬 **Inquiry Management** – Track and respond to user inquiries
- 📊 **Reports & Analytics** – Generate business intelligence reports

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14.2 (React 18)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3 + PostCSS
- **State Management:** Zustand
- **Form Handling:** React Hook Form + Zod validation
- **UI Components:** Radix UI
- **HTTP Client:** Axios
- **Data Fetching:** TanStack React Query
- **Charts:** Recharts
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Payment:** Stripe
- **Date Handling:** date-fns
- **Toast Notifications:** react-hot-toast

### Development
- ESLint + TypeScript ESLint Plugin
- Next.js built-in optimization

## 📁 Project Structure

```
src/
├── app/                  # Next.js App Router pages
│   ├── admin/           # Admin dashboard and management pages
│   ├── ai/              # AI analysis tools (price prediction, risk analysis, etc.)
│   ├── dashboard/       # User dashboard
│   ├── listings/        # Property listings pages
│   ├── auth/            # Login, registration, password recovery
│   └── market/          # Market analytics pages
├── components/          # Reusable React components
│   ├── admin/           # Admin-specific components
│   ├── ai/              # AI tool components
│   ├── auth/            # Authentication forms
│   ├── dashboard/       # Dashboard components
│   ├── home/            # Homepage sections
│   ├── land/            # Property/listing components
│   ├── layout/          # Layout components (navbar, footer, etc.)
│   ├── market/          # Market analysis components
│   ├── payment/         # Payment components
│   └── shared/          # Shared utilities and components
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions and API client
├── store/               # Zustand state management
└── types/               # TypeScript type definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/e-land-frontend.git
cd e-land-frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:
```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Eland

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key

# Authentication
NEXT_PUBLIC_AUTH_URL=http://localhost:3000/api/auth
```

4. **Run the development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📜 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## 🔐 Authentication

The platform uses secure authentication with the following features:
- User registration and login
- Password recovery flow
- JWT token management
- Protected routes and API endpoints
- User session management with Zustand

## 💳 Payment Integration

Stripe integration is implemented for:
- Subscription management
- Premium feature access
- Payment processing and status tracking

Ensure your Stripe keys are configured in environment variables for payment functionality.

## 🎨 Customization

### Theme & Styling
- Colors and styling are configured in `tailwind.config.js`
- Dark mode support via `next-themes`
- Global styles in `src/app/globals.css`

### API Configuration
Update `src/lib/api.ts` to modify API endpoints and request/response handling.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (below 768px)

## 🐳 Docker Support

A Dockerfile is included for containerized deployment:

```bash
# Build Docker image
docker build -t eland-frontend .

# Run container
docker run -p 3000:3000 eland-frontend
```

## 📈 Performance Optimization

- Next.js Image Optimization
- Code splitting and lazy loading
- CSS-in-JS with Tailwind
- React Query caching for API calls
- Framer Motion for smooth animations

## 🌐 Deployment

### Vercel (Recommended)
The project includes `vercel.json` configuration. Deploy directly to Vercel:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms
- **AWS:** Configure environment variables and deploy with CI/CD
- **Docker:** Use provided Dockerfile for containerized deployment
- **Traditional Hosting:** Build and run with `npm run build && npm start`

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/amazing-feature`)
2. Commit your changes (`git commit -m 'Add amazing feature'`)
3. Push to the branch (`git push origin feature/amazing-feature`)
4. Open a Pull Request

## 📚 Documentation

For more detailed documentation, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Stripe Documentation](https://stripe.com/docs)

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries, please contact:
- Email: support@eland.com
- Website: https://eland.com

---

**Made with ❤️ by the Eland Team**
