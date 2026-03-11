# Next.js Admin Dashboard Best Practices

## Project Context

This project is an **admin dashboard** for a digital services business.

The platform allows the administrator to:

- manage registered users
- manage clients
- track projects for each client
- manage files and deliverables
- monitor client activity
- manage internal business data

The product should feel like a **modern SaaS admin platform**.

---

# 🚀 1. Performance and Loading

- Use **Server Components by default** to minimize client-side JavaScript.
- Use **Client Components (`'use client'`) only when necessary**, such as:
  - button forms
  - interactive tables
  - dropdown menus
  - modals
  - client-side state interactions
- **Lazy load heavy components** such as:
  - charts
  - analytics
  - large tables
- Avoid unnecessary client-side state if the data can be fetched server-side.
- Optimize icons and assets to keep the dashboard lightweight.

---

# 🏗️ 2. Next.js Architecture (App Router)

Use **Next.js App Router** with clear route groups.

Rules:

- Use **layout.tsx** to create a persistent dashboard layout.
- Separate **auth routes and dashboard routes** using route groups.
- Avoid mixing business logic directly inside UI components.

---

# 🎨 3. UI and User Experience (UX)

The interface must follow a **modern SaaS admin design**.

Principles:

- minimalist
- clean
- professional
- premium visual quality

The layout should contain:

### Sidebar

Navigation sections:

- Dashboard
- Clients
- Registered Users
- Settings

### Top Header

Include:

- global search
- notifications icon
- admin avatar
- quick action button

### Main Content

Used for:

- dashboard metrics
- tables
- client profiles
- project tracking
- files and deliverables

---

# 🔐 4. Authentication

Implement a **login screen** based on the design reference.

The login form must include:

- email input
- password input
- password visibility toggle
- remember me checkbox
- forgot password link
- submit button

Rules:

- validate inputs before submission
- redirect authenticated users to `/dashboard`
- protect dashboard routes from unauthenticated access

For now:

Focus only on **frontend authentication flow and UI**.

Supabase authentication will be integrated later.

---

# 📊 5. Dashboard Page

The dashboard home must include **metric cards** such as:

- Total Registered Users
- Active Clients
- Ongoing Projects
- Monthly Revenue

Additional UI elements:

- global search bar
- quick actions button
- responsive metric card grid

Use **realistic mock data**.

---

# 👥 6. Registered Users Page

This page displays and manages registered users.

Include:

### Summary Cards

- total users
- active users this month
- average spend

### Users Table

Columns:

- avatar + user name
- email
- phone
- total spent
- action (View Details)

Also include:

- pagination
- search-ready table structure
- realistic mock data

---

# 🧑‍💼 7. Client Detail Page

Each client page must include:

### Client Profile

Display:

- avatar
- full name
- company or role
- active status badge
- join date
- email
- phone
- total spent
- last interaction

### Actions

- Edit Profile
- Send Message

---

## Active Projects Section

Display projects associated with the client:

- project name
- project description
- due date
- progress bar
- project status badge

Examples:

- In Progress
- Completed
- Pending

---

## Files & Deliverables Section

Display project deliverables:

- file cards or list
- file name
- file size
- upload date
- download button

---

## Client Health Summary

Display a client health score or summary.

Include:

- health score
- contextual explanation
- summary of project performance

---

# 🧩 8. Component System

Create reusable UI components.

Examples:

- Button
- Input
- Card
- MetricCard
- Table
- Avatar
- Badge
- ProgressBar
- Pagination
- SidebarItem
- HeaderActions

Rules:

- consistent spacing
- consistent border radius
- subtle shadows
- modern SaaS visual style

---

# 📱 9. Responsiveness

The dashboard must be **fully responsive**.

### Desktop

- full sidebar
- large layout
- multi-column grid

### Tablet

- reduced spacing
- adaptive tables

### Mobile

- collapsible sidebar
- stacked cards
- scrollable tables

Do not break visual hierarchy.

---

Prepare the architecture for future API integration.

---

# 🔌 11. Future Supabase Integration

The project will later integrate with **Supabase** for:

- authentication
- database
- file storage

The architecture must allow easy integration without major refactors.

---

# 🎯 Final Goal

Implement a modern admin dashboard that:

- replicates the provided reference UI
- includes a login screen
- includes dashboard metrics
- includes registered users management
- includes client detail pages
- uses reusable UI components
- is fully responsive
- is prepared for Supabase integration

For now, focus only on:

- frontend UI
- routing
- layouts
- reusable components
- mock data
