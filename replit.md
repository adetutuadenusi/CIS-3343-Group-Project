## Overview
This project is for "Emily Bakes Cakes," a dual-interface web application designed to offer a warm and inviting customer experience alongside an efficient staff management system. It features a public-facing website for customers to browse products, build custom cakes, and view galleries, and an administrative portal for staff to manage orders, customers, products, and reports. The application aims to provide a comprehensive solution for a baking business, enhancing customer engagement and streamlining internal operations.

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

### Technical Implementations
- **Public Interface**: Includes a home page, product shop, custom cake builder (with unlimited layer system and dynamic pricing), photo gallery, about page, and contact form.
- **Admin Interface**: Features a dashboard with analytics, order management with a Kanban board (drag-and-drop), customer database, product management, and reporting.
- **Mock Data System**: Comprehensive mock data is used for development and demonstration of admin features.
- **Search Bar**: Smart search with autosuggest, keyboard navigation, and debouncing.
- **Component Design**: Reusable and interactive components like `ProductCard` with hover effects.
- **Accessibility**: Focus on ARIA labels and touch target sizes.

### System Design Choices
- **Backend & Database**: PostgreSQL (Replit Neon) with Drizzle ORM for type-safe queries. The API server is built with Express.js (TypeScript with tsx).
- **Database Schema**: Includes `customers`, `orders`, `inquiries`, `contact_messages` tables with relational foreign keys.
- **Data Flow**: Form submissions (Custom Builder, Shop Inquiries, Contact) persist to the database. Custom Builder automatically creates/links customers.
- **Migrations**: Uses `npm run db:push` for schema changes.
- **Project Structure**: Organized into `src/components`, `src/pages` (public and admin), `src/styles`, and `src/assets`.
- **Vite Configuration**: Configured for Replit environment (port 5000, host 0.0.0.0) with HMR.
- **Build Output**: Production builds target the `build/` directory.

### Backend API Endpoints
- `GET /api/customers`
- `POST /api/orders/custom`
- `GET /api/orders`
- `PATCH /api/orders/:id/status`
- `GET /api/inquiries`
- `POST /api/inquiries`
- `PATCH /api/inquiries/:id/status`
- `GET /api/contact`
- `POST /api/contact`

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