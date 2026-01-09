# Ecommerce Next.js Application

A fully-featured **Ecommerce web application** built with **Next.js**, **Tailwind CSS**, **Prisma**, **Stripe**, and **React Email**.  
This platform allows users to browse, purchase, and download digital products while enabling admins to manage products and orders efficiently.

---

## 🚀 Features

### User Features
- Browse products with images, descriptions, and prices.
- Secure checkout powered by **Stripe**.
- Automated order confirmation emails using **React Email**.
- Download purchased products with expiring verification links.
- View order history via email and user dashboard.

### Admin Features
- Add, edit, and delete products.
- View and manage orders and user activity.
- Admin dashboard with analytics and product management.

### Technical Features
- **Next.js (App Router)** for server-side rendering and API routes.
- **Tailwind CSS** for modern, responsive styling.
- **Prisma ORM** for database access (PostgreSQL / SQLite / MySQL).
- **Stripe API** for secure payment processing.
- **React Email** for professional transactional emails using Resend.
- Fully typed with **TypeScript**.
- Environment variables to manage secrets securely.

---

## 📦 Tech Stack

| Layer             | Technology                  |
|------------------|-----------------------------|
| Frontend & SSR     | Next.js                     |
| Styling           | Tailwind CSS                |
| Database & ORM    | Prisma + PostgreSQL/SQLite  |
| Payments          | Stripe                      |
| Emails            | React Email + Resend        |
| Language          | TypeScript                  |

---

## 🔧 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/ecommerce-nextjs.git
cd ecommerce-nextjs
```

2. **Install dependencies**
npm install

3. **Setup environment variables**

Create a .env file in the project root and add:
```
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME=admin
HASHED_ADMIN_PASSWORD=sQnzu7wkTrgkQZF+0G1hi5AI3Qmzvv0bXgc5THBqi7mAsdd4Xll27ASbRt9fEyavWi6m0QP9B8lThf+rDKy8hg==
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=your_stripe_public_key
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
RESEND_API_KEY=your_resend_api_key
SENDER_EMAIL=onboarding@resend.dev
```

Replace the placeholders with your actual keys.

⚡ Running Locally
Start the development server
npm run dev


Visit http://localhost:3000
 to see the site.

Admin dashboard available at /admin.

Stripe webhooks (for local testing)
stripe login
stripe listen --forward-to localhost:3000/webhooks/stripe


All Stripe events (like payments) will be forwarded to your local webhook handler.

Ensure STRIPE_WEBHOOK_SECRET matches your Stripe webhook.
