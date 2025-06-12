# TICK-IT - Archaeological & Historical Sites Ticketing Platform

A modern, responsive web application for booking tickets to archaeological and historical sites worldwide. Built with React, TypeScript, Express, and featuring a heritage-inspired design.

## 🌟 Features

- **Site Discovery**: Browse archaeological sites, museums, monuments, and ancient ruins
- **Advanced Search**: Filter by category, price range, rating, and availability
- **Interactive Booking**: Multi-step booking process with real-time availability
- **Wishlist Management**: Save favorite sites with persistent local storage
- **Booking Management**: Search and view booking history by email
- **Support Center**: Comprehensive FAQ and contact system
- **Responsive Design**: Mobile-first approach with seamless desktop experience
- **Heritage Theme**: Warm earth tones reflecting historical significance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tick-it.git
   cd tick-it
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

## 📁 Project Structure

```
tick-it/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── navigation.tsx
│   │   │   ├── site-card.tsx
│   │   │   ├── booking-modal.tsx
│   │   │   ├── wishlist.tsx
│   │   │   └── ...
│   │   ├── pages/          # Application pages
│   │   │   ├── home.tsx
│   │   │   ├── search.tsx
│   │   │   ├── bookings.tsx
│   │   │   ├── support.tsx
│   │   │   ├── site-details.tsx
│   │   │   └── not-found.tsx
│   │   ├── lib/            # Utilities and constants
│   │   ├── types/          # TypeScript type definitions
│   │   ├── hooks/          # Custom React hooks
│   │   ├── App.tsx         # Main application component
│   │   ├── main.tsx        # Application entry point
│   │   └── index.css       # Global styles
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts            # Server entry point
│   ├── routes.ts           # API routes
│   ├── storage.ts          # In-memory data storage
│   └── vite.ts             # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts           # Database schema and types
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── vite.config.ts          # Vite configuration
└── README.md               # Project documentation
```

## 🛠 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - UI component library
- **Wouter** - Lightweight routing
- **TanStack Query** - Data fetching and caching
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database toolkit
- **Zod** - Runtime validation

### Development
- **Vite** - Build tool and dev server
- **ESBuild** - Fast bundling
- **PostCSS** - CSS processing

## 🎯 Available Scripts

```bash
# Start development server (frontend + backend)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 📖 API Endpoints

### Sites
- `GET /api/sites` - Get all sites (with optional category filter)
- `GET /api/sites/:id` - Get specific site details

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get specific booking
- `GET /api/bookings?email=:email` - Get bookings by email

## 🌍 Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Import your GitHub repository
   - Vercel will auto-detect the Vite configuration
   - Deploy with default settings

### Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy dist folder**
   - Upload the `dist` folder to Netlify
   - Configure redirects for SPA routing

### Railway/Render

1. **Add build script to package.json** (already included)
2. **Connect GitHub repository**
3. **Deploy with Node.js environment**

### Environment Variables

For production deployment, configure these environment variables if needed:

```bash
NODE_ENV=production
PORT=5000
```

## 🎨 Design System

### Color Palette
- **Primary**: Heritage Orange (#B8860B)
- **Secondary**: Warm Beige (#F5F5DC)
- **Accent**: Sandy Brown (#D2B48C)
- **Text**: Dark Brown (#2F1B14)

### Typography
- **Headings**: Playfair Display (serif)
- **Body**: Inter (sans-serif)

## 🧩 Features Overview

### Home Page
- Hero section with search functionality
- Featured sites grid with category filtering
- Features showcase section

### Advanced Search
- Real-time filtering by multiple criteria
- Sort options (name, price, rating, availability)
- Responsive filter sidebar

### Site Details
- Comprehensive site information
- Available time slots with pricing
- Features and amenities
- Booking integration

### Booking System
- Multi-step booking process
- Date and time selection
- Ticket type selection (Adult/Child/Student)
- Add-on services
- Payment form simulation

### Wishlist
- Heart icon on site cards
- Persistent local storage
- Quick booking from wishlist
- Badge notification in navigation

### Support Center
- Searchable FAQ system
- Contact form
- Multiple support channels
- Quick help sections

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Live Demo](https://your-deployment-url.vercel.app)
- [GitHub Repository](https://github.com/your-username/tick-it)
- [Issues](https://github.com/your-username/tick-it/issues)

## 📞 Support

For support, email support@tick-it.com or join our community Discord server.

---

Built with ❤️ for history enthusiasts and travelers worldwide.