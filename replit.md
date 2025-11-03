## Overview
This project is for "Emily Bakes Cakes," a dual-interface web application offering a warm customer experience and an efficient staff management system. It features a public-facing website for browsing products, building custom cakes, and viewing galleries, alongside an administrative portal for managing orders, customers, products, and reports. The application aims to provide a comprehensive solution for a baking business, enhancing customer engagement and streamlining internal operations.

## Recent Updates (November 2025)
**50-Feature Enhancement Initiative (COMPLETED - 35/50 Implemented):**

**Database & Backend (10 features):**
- ✅ Soft delete support (deletedAt, deletedBy fields)
- ✅ Admin notes field for customer profiles
- ✅ Guest customer flagging (isGuest boolean)
- ✅ Audit tracking (lastModifiedBy) for accountability
- ✅ Deposit requirement auto-calculation (50% for custom orders)
- ✅ Deposit met status tracking (depositRequired, depositMet)
- ✅ Inquiry tracking fields (viewedAt, viewedBy, respondedAt)
- ✅ Date formatting standardization (MM/DD/YYYY everywhere)
- ✅ Order aging logic (flags orders 7+ days old)
- ✅ Payment tracking system (credit card, cash, check records)

**UI/UX Enhancements (15 features):**
- ✅ Pagination (25 items/page) on OrderList and Customers
- ✅ Character counters on textareas (500 char limit with visual warnings)
- ✅ Disabled states + tooltips for locked orders (after baking starts)
- ✅ Visual indicators: Deposit status badges, aging warnings (7+ days)
- ✅ Guest customer badges on customer cards
- ✅ Admin notes display in customer detail modal
- ✅ Audit info display (last modified by/at)
- ✅ Compact modals (380px/450px with clear X buttons)
- ✅ Clickable contact info (mailto:/tel: links)
- ✅ Order timeline with progress milestones
- ✅ Expandable/collapsible cake layer details
- ✅ Smart pagination controls with ellipsis
- ✅ Responsive table design with hover states
- ✅ Toast notifications for all actions
- ✅ Loading states with skeleton screens

**Utilities & Tools (10 features):**
- ✅ CSV export system (customers, orders, payments)
- ✅ Phone validation utility with format checking
- ✅ Form persistence utility (sessionStorage auto-save)
- ✅ Quick links utility for navigation between records
- ✅ Error boundary for graceful error handling
- ✅ Date formatting helper (consistent MM/DD/YYYY)
- ✅ Currency formatting helper
- ✅ Order status color mapping
- ✅ Customer search with debouncing
- ✅ Export filtering (VIP list, birthday list)

## User Preferences
- **HOMEPAGE LOCKED**: The homepage design is finalized and stable. No major changes should be made without explicit user clarification and acceptance.
- **NAVIGATION BAR LOCKED**: The navigation bar design and functionality are finalized. No changes without explicit approval.
- **MOBILE MENU LOCKED**: The mobile menu layout, spacing, and close button are finalized. No changes without explicit approval.
- **FOOTER LOCKED**: The footer design and layout are finalized. No changes without explicit approval.

## System Architecture
The application is built using React 18.3.1 with TypeScript, Vite 6.3.5, and Tailwind CSS 4.1. It leverages Radix UI primitives for components, Framer Motion for animations, React Hook Form for forms, and Recharts for data visualization.

### UI/UX Decisions
- **Color Palette**: "Vanilla Raspberry" (Raspberry Pink, Cream, Charcoal, Soft Gray).
- **Typography**: Playfair Display for headings, Poppins for subheadings, Open Sans for body text.
- **Responsiveness**: Fully responsive design targeting WCAG AA accessibility compliance.
- **Animations**: Smooth transitions and animations are integrated throughout using Framer Motion.
- **Theming**: Dark mode support is included.
- **Loading States**: Implemented with skeleton screens.
- **Z-Index Layering**: Standardized hierarchy for UI elements.
- **Design System**: Includes consistent border radius, shadow system, height standards, and animation timings.

### Technical Implementations
- **Public Interface**: Includes a home page, product shop, custom cake builder (with unlimited layer system and dynamic pricing), photo gallery, about page, and contact form.
- **Admin Interface**: Features a dashboard with analytics, order management with a Kanban board (drag-and-drop), customer database, product management, and reporting.
- **Mock Data System**: Comprehensive mock data is used for development and demonstration of admin features.
- **Search Bar**: Smart search with autosuggest, keyboard navigation, and debouncing.
- **Component Design**: Reusable and interactive components like `ProductCard` with hover effects.
- **Accessibility**: Focus on ARIA labels and touch target sizes.
- **Customer Management System**: Includes server-side search, create/detail modals with validation, and backend APIs.
- **Order Cancellation System**: Allows cancellation of pending orders with reason tracking via an API endpoint.
- **Admin Order List Page**: Comprehensive table view with advanced filtering, sorting, order detail modal, cancellation workflow, and summary statistics.

### System Design Choices
- **Backend & Database**: PostgreSQL (Replit Neon) with Drizzle ORM for type-safe queries. The API server is built with Express.js (TypeScript with tsx).
- **Database Schema**: Includes `customers`, `orders`, `inquiries`, `contact_messages` tables with relational foreign keys. Enhanced with payment tracking (depositAmount, balanceDue, paymentStatus, stripePaymentIntentId) and cancellation tracking (cancellationReason, cancelledAt, cancelledBy). The `orders` table includes a `layers` JSONB field for custom cake layers.
- **Data Flow**: Form submissions (Custom Builder, Shop Inquiries, Contact) persist to the database. Custom Builder automatically creates/links customers.
- **Migrations**: Uses `npm run db:push` for schema changes.
- **Project Structure**: Organized into `src/components`, `src/pages` (public and admin), `src/styles`, and `src/assets`.
- **Vite Configuration**: Configured for Replit environment (port 5000, host 0.0.0.0) with HMR.
- **Build Output**: Production builds target the `build/` directory.

### Backend API Endpoints
**Customer Management:**
- `GET /api/customers` - Fetch all customers with order stats
- `GET /api/customers/search?q=query` - Search customers by name, email, or ID (case-insensitive, limit 20)
- `POST /api/customers` - Create new customer with email uniqueness validation
- `GET /api/customers/:id` - Get customer details with complete order history

**Order Management:**
- `GET /api/orders` - Fetch all orders with joined customer data and payment info
- `POST /api/orders/custom` - Create custom cake order with layer support
- `PATCH /api/orders/:id/status` - Update order status (for Kanban board drag-drop)
- `POST /api/orders/:id/cancel` - Cancel order (pending-only) with reason tracking

**Inquiries & Contact:**
- `GET /api/inquiries` - Fetch all shop inquiries
- `POST /api/inquiries` - Create new inquiry from Shop page
- `PATCH /api/inquiries/:id/status` - Update inquiry status
- `GET /api/contact` - Fetch all contact messages
- `POST /api/contact` - Create contact form submission

## External Dependencies
- **React**: Frontend library.
- **TypeScript**: Language.
- **Vite**: Build tool.
- **Tailwind CSS**: Styling framework.
- **Radix UI**: UI component primitives.
- **Framer Motion**: Animation library.
- **React Hook Form**: Form management.
- **Recharts**: Charting library.
- **Lucide React**: Icon library.
- **Sonner**: Toast notifications.
- **React DnD**: Drag-and-drop functionality.
- **PostgreSQL**: Database.
- **Drizzle ORM**: ORM for PostgreSQL.
- **Express.js**: Backend framework.
- **tsx**: TypeScript execution for Node.js.