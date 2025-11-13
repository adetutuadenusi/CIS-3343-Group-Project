## Overview
"Emily Bakes Cakes" is a CIS 3343 case study project - a **hybrid system** combining existing customer-facing features with a staff-only order management portal. The system consists of:

1. **Public Website** - Home, shop, custom cake builder, gallery, about, contact (7 pages BUILT)
2. **Public Order Tracking** (no login) - Auto-cycling demo page showing order progress (NEW)
3. **Staff Portal** (role-based access) - 5 unique dashboards for Sales, Baker, Decorator, Accountant, Manager (NEW)
4. **PostgreSQL Database** - Complete schema with customers, orders, staff, products

**ARCHITECTURE DECISION (Nov 13, 2025):** After codebase audit, confirmed hybrid approach - KEEP existing excellent e-commerce features (builder, shop, gallery) while ADDING staff portal for case study compliance. Total: 19 pages (7 public + 1 tracking + 11 staff).

## User Preferences
- **HOMEPAGE LOCKED**: The homepage design is finalized and stable. No major changes should be made without explicit user clarification and acceptance.
- **NAVIGATION BAR LOCKED**: The navigation bar design and functionality are finalized. No changes without explicit approval.
- **MOBILE MENU LOCKED**: The mobile menu layout, spacing, and close button are finalized. No changes without explicit approval.
- **FOOTER LOCKED**: The footer design and layout are finalized. No changes without explicit approval.

## System Architecture
The application is built with React 18.3.1, TypeScript, Vite 6.3.5, and Tailwind CSS 4.1. It utilizes Radix UI for components, Framer Motion for animations, React Hook Form for form management, and Recharts for data visualization.

### UI/UX Decisions
- **Color Palette**: "Vanilla Raspberry" (Raspberry Pink, Cream, Charcoal, Soft Gray).
- **Typography**: Playfair Display for headings, Poppins for subheadings, Open Sans for body text.
- **Responsiveness**: Fully responsive design targeting WCAG AA accessibility compliance.
- **Animations**: Smooth transitions and animations integrated using Framer Motion.
- **Theming**: Dark mode support.
- **Loading States**: Implemented with skeleton screens.
- **Design System**: Consistent border radius, shadow system, height standards, and animation timings.

### Technical Implementations
- **Public Interface**: Includes a home page, product shop, custom cake builder (with unlimited layer system and dynamic pricing), order review page, photo gallery, about page, and contact form.
- **Order Review System**: Dedicated page for displaying a comprehensive order summary before submission, with data transferred via sessionStorage.
- **Backend Order Creation**: A comprehensive admin form for manual order creation, mirroring custom builder features with added admin-specific enhancements (status, priority, management notes, payment tracking).
- **Admin Interface (Professional OMS)**: An enterprise-grade order management system featuring:
    - **Business Analytics Dashboard**
    - **Fulfillment Board** (Kanban-style)
    - **Order Management Center** (advanced filtering/sorting)
    - **Inquiry Management**
    - **Inventory Management**
    - **Customer Accounts** (CRM)
    - **Business Intelligence**
    - **System Configuration**
- **Mock Data System**: Used for development and demonstration of admin features.
- **Search Bar**: Smart search with autosuggest, keyboard navigation, and debouncing.
- **Accessibility**: Focus on ARIA labels and touch target sizes.
- **Customer Management System**: Includes server-side search, create/detail modals with validation, and backend APIs.
- **Order Cancellation System**: Allows cancellation of pending orders with reason tracking via an API endpoint.
- **Navigation Optimization**: Direct imports used for all pages. React.lazy() and Suspense cause complete application freeze in Replit's iframe environment and have been permanently disabled.
- **CRITICAL LESSON (Nov 4, 2025)**: React lazy loading BREAKS the Replit environment - causes total application freeze with no JavaScript interaction. Hero image fails to load, all clicks unresponsive, scrolling broken. NEVER attempt lazy loading again.

### System Design Choices
- **Backend & Database**: PostgreSQL (Replit Neon) with Drizzle ORM for type-safe queries. The API server is built with Express.js (TypeScript with tsx).
- **Database Schema**: Includes `customers`, `orders`, `inquiries`, `contact_messages`, `products` tables with relational foreign keys. Enhanced with payment tracking, cancellation tracking, and a `layers` JSONB field for custom cake layers. Products table supports soft-delete.
- **Data Flow**: Form submissions persist to the database. Custom Builder automatically creates/links customers.
- **Migrations**: Uses `npm run db:push` for schema changes.
- **Project Structure**: Organized into `src/components`, `src/pages` (public and admin), `src/styles`, and `src/assets`.
- **Vite Configuration**: Configured for Replit environment (port 5000, host 0.0.0.0) with HMR.

### Backend API Endpoints
- **Order Creation:** `POST /api/orders/custom`
- **Customer Management:** `GET /api/customers`, `GET /api/customers/search`, `POST /api/customers`, `GET /api/customers/:id`
- **Order Management:** `GET /api/orders`, `PATCH /api/orders/:id/status`, `POST /api/orders/:id/cancel`
- **Inquiries & Contact:** `GET /api/inquiries`, `POST /api/inquiries`, `PATCH /api/inquiries/:id/status`, `GET /api/contact`, `POST /api/contact`
- **Product Management:** `GET /api/products`, `GET /api/products/search`, `GET /api/products/:id`, `POST /api/products`, `PATCH /api/products/:id`, `DELETE /api/products/:id`

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

## Project Documentation
- **SINGLE SOURCE OF TRUTH:** `docs/FINAL_IMPLEMENTATION_PLAN.md` - Authoritative implementation plan based on codebase audit. Covers all 19 pages (7 public + 1 tracking + 11 staff), what exists vs what needs to be built, role-based permissions, 6 client reports, database schema, and complete technical specifications. Created Nov 13, 2025.
- **Critical Correction:** Baker and Decorator roles have FULL Sales permissions + specialized functions (per case study: "Bakers/Decorators can also serve as sales staff when not busy").
- **Superseded Documents:** All other planning documents (23_MASTER, EMILY-BAKES, etc.) are outdated. Use FINAL_IMPLEMENTATION_PLAN.md only.