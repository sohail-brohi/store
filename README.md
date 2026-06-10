# Luxee Store

A premium fashion e-commerce platform built with Next.js, Tailwind CSS, Firebase, and MongoDB — inspired by [Luxee Store](https://luxee-store.vercel.app/).

## Features

### Storefront
- Hero landing page with featured collections
- Product catalog with filtering, sorting, and search
- Category pages (Men, Women, Accessories, Shoes, Kids)
- New Arrivals & Sale pages
- Product detail pages with size/color selection
- Shopping cart & checkout (COD + Card)
- Wishlist
- User authentication (Firebase Auth)
- Order history
- Blog with articles
- FAQ, About, Contact, Careers
- Shipping, Returns, Size Guide, Privacy, Terms
- Dark/Light theme toggle
- Fully responsive design

### Admin Dashboard
- Dashboard with revenue & order stats
- Product management
- Order management with status updates
- Review moderation
- Contact messages
- Discount codes
- Blog, FAQ, Jobs management
- User list

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS 4
- **Database:** MongoDB with Mongoose
- **Auth:** Firebase Authentication
- **Language:** TypeScript
- **Icons:** Lucide React
- **Notifications:** React Hot Toast

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Firebase project ([Firebase Console](https://console.firebase.google.com))

### Setup

1. **Clone and install dependencies:**

```bash
npm install
```

2. **Configure environment variables:**

```bash
cp .env.example .env.local
```

Fill in your MongoDB URI and Firebase credentials in `.env.local`.

3. **Start MongoDB** (if running locally):

```bash
mongod
```

4. **Seed the database:**

```bash
npm run dev
# Then in another terminal:
curl -X POST http://localhost:3000/api/seed
```

5. **Open the app:**

- Storefront: [http://localhost:3000](http://localhost:3000)
- Admin: [http://localhost:3000/admin](http://localhost:3000/admin)

## Firebase Setup

1. Create a project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** authentication under Authentication > Sign-in method
3. Copy web app config to `NEXT_PUBLIC_FIREBASE_*` env vars
4. Generate a service account key (Project Settings > Service Accounts) for admin SDK

## MongoDB Setup

**Local:**
```
MONGODB_URI=mongodb://localhost:27017/luxee-store
```

**Atlas:**
1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Get connection string and set `MONGODB_URI`

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── (store)/          # Storefront pages
│   ├── admin/            # Admin dashboard
│   └── api/              # API routes
├── components/
│   ├── layout/           # Header, Footer
│   ├── products/         # Product components
│   └── ui/               # UI primitives
├── contexts/             # React contexts (Cart, Auth, etc.)
├── lib/                  # Utilities, DB, Firebase
├── models/               # Mongoose models
└── types/                # TypeScript types
```

## Deployment

Deploy to [Vercel](https://vercel.com):

1. Push to GitHub
2. Import project on Vercel
3. Add all environment variables from `.env.example`
4. Deploy

After deployment, seed the database:
```bash
curl -X POST https://your-app.vercel.app/api/seed
```

## License

MIT
