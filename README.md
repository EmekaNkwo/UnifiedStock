# UnifiedStock - Offline-First Inventory Management PWA

A modern, offline-first Progressive Web Application for comprehensive inventory management. Built with Next.js and NestJS, UnifiedStock provides robust inventory control with seamless offline capabilities.

## ✨ Features

### 📦 Core Inventory

- Real-time stock tracking
- Low stock alerts and notifications
- Barcode/QR code scanning support
- Batch and serial number tracking
- Multi-location inventory management

### 💼 Business Operations

- Purchase order management
- Sales and invoicing
- Returns and refunds processing
- Stock adjustment and transfers
- Inventory valuation

### 📊 Analytics & Reporting

- Interactive sales dashboards
- Stock movement history
- Financial reporting
- Customer purchase insights
- Exportable reports (PDF, Excel)

### 🔒 Security & Access

- Role-based access control
- Multi-tenant architecture
- User activity logs
- Secure authentication (JWT)
- Data encryption at rest

## 🚀 Tech Stack

### Frontend

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **UI Components**: Shadcn/ui
- **Offline**: IndexedDB

### Backend

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT, Passport
- **Real-time**: WebSockets
- **API**: RESTful & GraphQL

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm
- PostgreSQL 14+
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone
   cd unifiedstock
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   ```
   ```bash
   cd frontend
   pnpm install
   ```
   ```bash
   cd ../backend
   pnpm install
   ```
3. **Run the development server**
   ```bash
   # Frontend (from project root)
   cd frontend
   pnpm dev
   ```
   ```bash
   # Backend (in a new terminal)
   cd backend
   pnpm start:dev
   ```
