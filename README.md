# SwiftOps — Internal Ecommerce Admin Dashboard

> **7 Day Challenge | Day 1 of 7 | Internal Admin Dashboard**  
> A high-performance internal operations control center built for ecommerce store teams to monitor sales, inspect orders, track deliveries, and manage product inventory.

---

## 🎨 Theme & Aesthetic
- **Jet Black (`#08080a`, `#111217`)**: Base background, elevated surface cards, panels.
- **Hot Pink (`#ff2a85`)**: Primary CTAs, active highlights, critical low-stock alert pulses, brand logo.
- **Chartreuse Electric Yellow (`#ccff00`)**: Telemetry metrics, status indicators, live telemetry badges, revenue charts.

---

## 🚀 How to Run Locally

### 1. Prerequisites
- **Node.js** (v18 or higher recommended, tested on v22)
- **npm** (v9 or higher)

### 2. Installation
Clone the repository and install all dependencies:
```bash
git clone https://github.com/shubhamondaldh-maker/swiftops.git
cd swiftops
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 🔑 Login Credentials (Fake Authentication)
- **1-Click Quick Demo Login**: Click the **"1-Click Demo"** button on the login screen to autofill and instantly enter.
- **Manual Credentials**: Any email and password is accepted (e.g. `admin@swiftops.com` / `admin123`).
- **Protected Routes**: Unauthenticated users cannot view or access internal dashboard pages without logging in.

---

## 📋 What is Done

### 1. Authentication & Security
- [x] **Login Screen** with cyber/neo-brutalist styling (Jet Black + Hot Pink + Chartreuse).
- [x] **Protected Routes** guarding all dashboard subpages (`/`, `/orders`, `/products`).
- [x] **1-Click Demo Login** button for frictionless review.
- [x] **User Session Management** and logout functionality.

### 2. Overview Telemetry Page (`/`)
- [x] **4 Key Stat Cards**:
  - **Total Revenue**: Aggregate sum of all active/completed orders.
  - **Total Orders**: All recorded customer orders.
  - **Pending Orders**: Orders awaiting fulfillment.
  - **Low-Stock Products**: Count of products under threshold (< 10 units).
- [x] **Interactive 7-Day Chart**: Recharts area chart with custom gradients, day-by-day revenue/orders tooltips, and a switcher between **Revenue ($)** and **Orders Count**.
- [x] **Recent Orders Table**: Quick preview of the 5 most recent transactions with click-to-view modal.
- [x] **Low-Stock Watchlist**: Real-time display of products running low in warehouse.

### 3. Orders Management Page (`/orders`)
- [x] **Orders Data Table**: Order ID, Customer name & email, Date, Item count, Total amount, Status, and Actions.
- [x] **Live Search**: Instant filtering by customer name, email, or order ID (e.g., `ORD-9401`).
- [x] **Status Filter Tabs**: Filter by `All`, `Pending`, `Shipped`, `Delivered`, `Cancelled` with real-time count badges.
- [x] **Sorting Options**: Sort by newest date, oldest date, highest total, or lowest total.
- [x] **Order Details Modal**: Deep-dive inspection showing full itemized receipts, unit prices, subtotal, shipping destination address, and payment method.
- [x] **Inline Status Transitions**: Ability to mutate an order's status directly from the table or inside the details modal.

### 4. Products Inventory Page (`/products`)
- [x] **Product Catalog Table**: Name, Category, Price, Stock Level, SKU, and Actions.
- [x] **Low-Stock Highlighting (< 10 units)**:
  - Critical warning banner at the top of the inventory page.
  - Products with stock under 10 are highlighted with **Hot Pink** left border and glowing pulsing badge.
  - Quick toggle button to filter only low-stock items.
- [x] **Add New Product**: Form modal with input validation (name, category, price, stock, SKU, description).
- [x] **Edit Product**: Pre-populated modal to adjust stock, pricing, and details.
- [x] **Delete Product**: Safe confirmation modal preventing accidental item deletion.
- [x] **Category & Price/Stock Sorting**: Filter by category (Gaming, Audio, Apparel, Electronics, etc.) and sort by stock/price.

### 5. Layout & Responsiveness
- [x] High-octane sidebar with system online telemetry indicator.
- [x] Mobile drawer navigation with backdrop blur.
- [x] Verified for desktop, laptop, and mobile screens without horizontal breakages.

### 6. Bonus Features Implemented
- [x] **LocalStorage Persistence**: Added products, updated stock, deleted items, and order status changes persist across browser refreshes (`swiftops_products` & `swiftops_orders`).
- [x] **Reset Demo Data Button**: Included a 1-click "Reset Demo Data" button in the sidebar so reviewers can test edits and restore clean demo state anytime.

---

## ⏳ What is Not Done
- Real backend API integration (as specified in prompt: mock/local data only).
- Multi-currency conversion (currently standardized to USD `$`).
- Export to CSV/PDF (can be added in future iterations).

---

## 💡 One Thing That Was Harder Than Expected
Balancing the **high-contrast Neon Cyberpunk aesthetic (Jet Black, Hot Pink, and Chartreuse Electric Yellow)** with the **clean readability and usability required for an internal enterprise admin dashboard**. 
In data-heavy dashboards, overly bright neon colors can easily cause eye strain or make data hard to scan. By carefully using deep jet black surfaces (`#09090c` / `#111217`), subtle borders (`#1f212d`), and reserving Hot Pink and Chartreuse for focal points (stat trends, alerts, low-stock warnings, and CTAs), we achieved an aesthetic that feels electric and modern while remaining clear and easy to navigate.

---

## 📦 Tech Stack
- **Framework**: React 19 + Vite 8
- **Routing**: React Router DOM v7
- **Icons**: Lucide React
- **Charts**: Recharts
- **Styling**: Vanilla CSS custom design system (Tokens, Glassmorphism, Responsive Grid)

---

### Author
**Shubhadeepa Mondal**  
*SwiftOps Ecommerce Operations Dashboard — Day 1 Challenge Submission*
