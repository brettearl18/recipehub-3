# RecipeHUB Dataflow & Workflow: Admin, Coach, Client

## 1. Overview
This document outlines the key dataflows and workflows between Admin, Coach, and Client roles in RecipeHUB. Use this as a blueprint to ensure all necessary features and interactions are planned for each page before development.

---

## 2. Roles & Responsibilities
- **Admin:** Platform owner/manager. Manages users, recipes, analytics, settings.
- **Coach:** Manages assigned clients, creates/assigns meal plans, tracks client progress.
- **Client:** End user. Receives meal plans, tracks meals/macros, interacts with coach.

---

## 3. Dataflow & Workflow

### A. Admin → Coach
- **Create/Invite Coach:** Admin creates or invites new coach accounts.
- **Assign Clients:** Admin assigns clients to coaches (or reassigns as needed).
- **Monitor Coach Activity:** Admin views coach performance, engagement, and analytics.
- **Manage Permissions:** Admin sets or updates coach permissions/roles.
- **Support/Feedback:** Admin receives feedback or support requests from coaches.

### B. Coach → Client
- **Create/Invite Client:** Coach creates or invites new client accounts (if allowed by admin).
- **Assign Meal Plans:** Coach creates and assigns meal plans to clients.
- **Track Progress:** Coach views client progress, logs, and analytics.
- **Message/Support:** Coach communicates with clients (chat, comments, notifications).
- **Edit/Update Plans:** Coach updates meal plans, recipes, or goals for clients.
- **Review Feedback:** Coach receives feedback or questions from clients.

### C. Client → Coach
- **View Meal Plans:** Client views assigned meal plans and recipes.
- **Track Meals/Macros:** Client logs meals, tracks macros, and progress.
- **Request Changes:** Client requests changes to plans or asks questions.
- **Send Feedback:** Client provides feedback or reports issues to coach.
- **View Analytics:** Client sees their own progress and analytics.

### D. Admin → Client (Direct)
- **Manage Client Accounts:** Admin can create, edit, or deactivate client accounts.
- **Assign/Reassign Coaches:** Admin can reassign clients to different coaches.
- **Monitor Client Activity:** Admin views client engagement and analytics.

---

## 4. Key Data Entities
- **User (Admin, Coach, Client)**
- **Recipe**
- **Meal Plan**
- **Meal Log/Tracking**
- **Analytics/Progress**
- **Feedback/Support Message**

---

## 5. Example Workflow Scenarios

### 1. New Client Onboarding
1. Admin or Coach creates/invites client.
2. Client receives invite, sets up account.
3. Coach assigns meal plan to client.
4. Client logs meals, tracks progress.
5. Coach reviews progress, updates plan as needed.

### 2. Coach Assignment Change
1. Admin reassigns client to a new coach.
2. New coach receives notification.
3. New coach reviews client history and updates plan.

### 3. Feedback Loop
1. Client sends feedback or question to coach.
2. Coach responds or updates plan.
3. If needed, coach escalates to admin for support.

---

## 6. Dataflow Diagram (Textual)

```
[Admin] ──(invite/manage)──> [Coach] ──(assign/manage)──> [Client]
   │                                 │
   └─────────────(direct manage)─────┘

[Coach] <──(feedback/questions)──> [Client]
[Admin] <──(support/feedback)──> [Coach]
```

---

## 7. Checklist Before Development
- [ ] All user roles and permissions defined
- [ ] All key workflows mapped
- [ ] Data entities and relationships clear
- [ ] Feedback/support flows planned
- [ ] Analytics/reporting needs identified
- [ ] Onboarding and assignment flows mapped 