# RecipeHUB Admin Dashboard: Comprehensive Layout

## 1. Overall Structure
- **Sidebar Navigation** (persistent, collapsible on mobile)
- **Top Bar/Header** (user info, notifications, quick actions)
- **Main Content Area** (dashboard widgets, tables, forms, etc.)
- **Footer** (copyright, version, support link)

---

## 2. Sidebar Navigation
**Sections:**
- **Dashboard** (Overview)
- **Users** (Manage all users: admins, coaches, clients)
- **Recipes** (CRUD for recipes, categories, tags)
- **Meal Plans** (Assign, edit, and view meal plans)
- **Analytics** (Usage, engagement, nutrition stats)
- **Settings** (Platform, billing, integrations)
- **Support** (Contact, FAQ, feedback)

**Features:**
- Collapsible/expandable
- Active state highlight
- Icons for each section (Heroicons or similar)
- User avatar and role at the bottom

---

## 3. Top Bar/Header
- **Search bar** (quick search for users, recipes, etc.)
- **Notifications bell** (alerts, system messages)
- **Quick actions** (e.g., "Add Recipe", "Invite User")
- **User menu** (profile, settings, logout)

---

## 4. Dashboard (Main Content)
**Widgets/Sections:**
- **Stats cards** (Total users, active clients, recipes, etc.)
- **Recent activity** (logins, new recipes, plan assignments)
- **Quick links** (to most-used admin actions)
- **System health** (API status, error logs, etc.)

---

## 5. Users Management
- **Table of users** (filter by role, search, sort)
- **User detail drawer/modal** (view/edit user info, reset password, assign roles)
- **Bulk actions** (invite, deactivate, export)

---

## 6. Recipes Management
- **Table/grid of recipes** (search, filter by category/tag)
- **Recipe editor** (rich text, images, nutrition info)
- **Bulk import/export**

---

## 7. Meal Plans
- **List of plans** (filter by coach/client)
- **Plan editor** (drag-and-drop meals, assign to users)
- **Calendar view**

---

## 8. Analytics
- **Charts and graphs** (user growth, engagement, nutrition trends)
- **Downloadable reports**
- **Custom date ranges**

---

## 9. Settings
- **Platform settings** (branding, email templates)
- **Billing/subscription**
- **Integrations** (e.g., Stripe, Zapier, etc.)
- **Roles & permissions**

---

## 10. Support
- **Contact form**
- **FAQ**
- **Feedback submission**

---

## Example Wireframe (Textual)

```
---------------------------------------------------------
| Sidebar      | Top Bar/Header                        |
| (nav links)  | [Search] [Add Recipe] [Bell] [User]  |
---------------------------------------------------------
|                                                 |
|   Dashboard Widgets (stats, activity, quick links)   |
|-------------------------------------------------------|
|   Main Table/List (users, recipes, etc. by section)   |
|-------------------------------------------------------|
|   Footer (copyright, version, support)                |
---------------------------------------------------------
```

---

## UX/UI Best Practices
- Consistent color scheme (brand colors, accessible contrast)
- Responsive design (works on desktop, tablet, mobile)
- Clear call-to-actions (primary/secondary buttons)
- Feedback for actions (toasts, modals, confirmations)
- Keyboard accessible and screen reader friendly
- Loading states and skeletons for data fetches
- Sticky sidebar/top bar for easy navigation 