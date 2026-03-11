# Project Goal

Create a private admin dashboard for my digital services business using Next.js (App Router) and TailwindCSS.

The project is already initialized. TailwindCSS is already configured.

## Task

Implement only the screens defined in:

- `resources/admin_login_screen`
- `resources/registered_users_list`
- `resources/simplified_admin_dashboard`
- `resources/simplified_client_detail_view`

## Instructions

- Use the resources folders listed above as the only visual references.
- Replicate each design as faithfully as possible.
- Do not add new sections.
- Do not invent layout variations.
- Do not introduce elements that are not present in the references.
- Focus only on the frontend.
- Use realistic mock data where needed.
- Keep the UI clean, modern, and visually consistent across all screens.
- Maintain the same design language, spacing, hierarchy, and style between all views.
- Make the implementation responsive without changing the overall design intent.

---

# Screens to Implement

## 1. Admin Login Screen

Reference:

`resources/admin_login_screen`

Requirements:

- Implement the login screen shown in the reference.
- Include:
  - logo / brand area
  - heading
  - supporting text
  - email input
  - password input
  - password visibility toggle
  - remember me checkbox
  - forgot password link
  - sign in button
  - footer links if present in the design
- Preserve the split-screen layout shown in the reference.
- Match spacing, typography, colors, and proportions as closely as possible.

### Form Validation

The login form must use:

- **Zod** for schema validation
- **React Hook Form** for form state management

Validation rules:

- email must be a valid email format
- password must not be empty

The form should support these states:

- default
- focus
- validation error
- submitting

Error messages should appear below the inputs when validation fails.

---

## 2. Simplified Admin Dashboard

Reference:

`resources/simplified_admin_dashboard`

Requirements:

- Implement the main admin dashboard screen.
- Include:
  - sidebar navigation
  - top search bar
  - notification icon
  - profile area
  - quick action button
  - dashboard metric cards

Example cards:

- Total Registered Users
- Active Clients
- Ongoing Projects
- Monthly Revenue

Use realistic mock values for metrics.

Preserve the visual hierarchy and spacing from the design.

---

## 3. Registered Users List

Reference:

`resources/registered_users_list`

Requirements:

- Implement the registered users management screen.
- Include:
  - sidebar navigation
  - top search/header area
  - summary cards
  - users table
  - action links/buttons
  - pagination

Table columns should include:

- user avatar
- name
- email
- phone
- total spent
- action button (View Details)

Use realistic mock data for users.

Match table spacing, alignment, and card styling closely to the reference.

---

## 4. Simplified Client Detail View

Reference:

`resources/simplified_client_detail_view`

Requirements:

- Implement the client detail screen.
- Include:
  - sidebar navigation
  - top search/header area
  - breadcrumb or page title section
  - client profile summary
  - status badge
  - action buttons
  - active projects section
  - files and deliverables section
  - account health or summary panel

Use realistic mock data.

Keep the layout clean and visually faithful to the reference.

---

# Routing Expectations

Use Next.js App Router.

Recommended routes:

- `/login`
- `/dashboard`
- `/users`
- `/clients/[id]`

Do not add extra routes unless necessary for the referenced screens.

---

# Form and Validation Stack

Forms must use:

- **React Hook Form** for managing form state
- **Zod** for schema validation

Validation must be implemented using the Zod resolver pattern.

Example pattern:

- define a Zod schema
- connect it to React Hook Form
- show validation errors in the UI

This approach should be used for all forms in the project.

---

# Required Stack

- Next.js (App Router)
- React
- TailwindCSS
- Zod
- React Hook Form

---

# Expected Result

A faithful frontend implementation of the designs located in:

- `resources/admin_login_screen`
- `resources/registered_users_list`
- `resources/simplified_admin_dashboard`
- `resources/simplified_client_detail_view`

The result should feel like a cohesive modern admin dashboard with:

- consistent styling
- reusable UI components
- responsive layouts
- proper form validation using Zod and React Hook Form

Focus only on **frontend UI, routing, layout, mock data, and form validation**.
Backend integrations will be implemented later.
