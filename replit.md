## Overview
"Emily Bakes Cakes" is a web application designed for a baking business, featuring a dual interface: a public-facing website for customer engagement and an administrative portal for efficient staff management. The public site allows customers to browse products, design custom cakes, and view galleries, while the admin portal provides tools for managing orders, customers, products, and reports. The project aims to streamline operations and enhance the customer experience, offering a comprehensive solution for a modern baking enterprise.

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
- **Navigation Optimization**: Implemented React lazy loading and Suspense for all public and admin pages, significantly reducing bundle size and improving navigation responsiveness.

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