# Expenses Tracker

A full-stack expense tracking web app built with React, Node.js, Express, and PostgreSQL. Users can log daily expenses through a calendar interface, track spending by category, set monthly budget limits, and view visual summaries with charts.

**Live demo:** https://expenses-tracker-v2-ashy.vercel.app/

---

### Home Page
![Home Page](screenshots/homepage.png)

### Summary Page
![Summary](screenshots/summary.png)
![Summary](screenshots/summary2.png)

### Budget Settings Page
![Budget Page](screenshots/budget.png)

---

## Features

### Expense Logging
- Calendar-based daily expense logging
- Click a date to view and add expenses for that day
- Expense dot indicators on calendar days that have data
- Navigate between months with previous/next controls
- Daily total displayed for selected date
- Auto-fills selected date when adding a new expense

### Expense Management
- Add expenses with title, amount, category, and date
- Delete individual expenses
- Category dropdown with fixed options: Food, Transport, Entertainment, Utilities, Shopping, Others
- Form validation with error messages for missing fields
- Success message feedback after adding an expense
- Empty state message when no expenses exist for a selected date

### Summary & Analytics
- Year and month filter to explore any time period
- Total spent, top category, and transaction count stat cards
- Monthly breakdown showing spending per month
- Category breakdown showing spending per category
- Bar chart for monthly spending trend (shown on All months view)
- Pie chart (donut style) for category distribution
- Charts hidden and replaced with empty state when no data exists
- Budget progress bars shown per category when a specific month is selected

### Budget Management
- Set monthly spending limits per category
- Individual save per category with success feedback
- Budget limits persist across sessions via PostgreSQL
- Progress bars color-coded: green (safe), orange (80%+), red (over budget)
- Budget comparison only shown for specific month views, not yearly

### UI/UX
- Colorful dashboard design with purple gradient header
- Category-consistent colors across badges, progress bars, and pie chart
- Responsive two-column layout (calendar + expense list)
- Responsive design for tablet and mobile
- Empty state guidance for new users
- Smooth progress bar transitions

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- Recharts (bar chart, pie chart)
- CSS3 (Flexbox + Grid, responsive design)

### Backend
- Node.js
- Express.js
- Prisma ORM (v5)
- PostgreSQL

### Cloud & Deployment
- Vercel (frontend hosting)
- Render (backend hosting)
- Neon (managed PostgreSQL)

### Tools
- Nodemon (development auto-restart)
- Prisma Studio (database GUI)
- Thunder Client (API testing)
- Git + GitHub (version control)

---

## Database

The app uses PostgreSQL with two tables:

- **Expense** — stores individual expense entries (title, amount, category, date)
- **Budget** — stores monthly budget limits per category (one budget per category)

Key relationships:
- Each expense belongs to a category
- Each budget is unique per category (`@unique` constraint)
- Budget upsert — updates if category exists, creates if new

---

## Project Structure

```bash
expenses-tracker-v2/
├── backend/
│   ├── prisma/
│   │   ├── migrations/
│   │   └── schema.prisma
│   ├── .env
│   ├── .env.example
│   ├── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Home.jsx
│   │   ├── Summary.jsx
│   │   ├── Budget.jsx
│   │   ├── Calendar.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ExpenseItem.jsx
│   │   ├── Header.jsx
│   │   └── index.css
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | Get all expenses (ordered by date desc) |
| POST | `/api/expenses` | Create a new expense |
| DELETE | `/api/expenses/:id` | Delete an expense by ID |
| GET | `/api/budgets` | Get all budget limits |
| POST | `/api/budgets` | Create or update a budget limit |

---

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL
- npm

### 1. Clone the repository

```bash
git clone https://github.com/aliffkhuzairi/expenses-tracker-v2.git
cd expenses-tracker-v2
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/expenses_tracker"
PORT=3001
```

Run database migrations:

```bash
npx prisma migrate dev
```

Start the backend server:

```bash
npm run dev
```

### 3. Set up the frontend

```bash
cd frontend
npm install
```

Create a `.env` file:

```env
VITE_API_URL=http://localhost:3001
```

Start the frontend:

```bash
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## Deployment

| Service | Purpose | URL |
|---------|---------|-----|
| Vercel | Frontend hosting | https://expenses-tracker-v2-ashy.vercel.app/ |
| Render | Backend hosting | https://expenses-tracker-api-eomg.onrender.com |
| Neon | Managed PostgreSQL | https://neon.tech |

### Environment Variables

**Frontend (Vercel):**
```
VITE_API_URL=https://expenses-tracker-api-eomg.onrender.com
```

**Backend (Render):**
```
DATABASE_URL=your-neon-connection-string
```

---

## Responsive Design

- Desktop → two-column layout (calendar + expense list)
- Tablet → single column stacked layout
- Mobile → form first, list below for quick expense logging

---

## Security Notes

- Database credentials stored in `.env` file
- `.env` excluded from Git via `.gitignore`
- `node_modules` excluded from Git
- API uses JSON body parsing with Express middleware
- Prisma parameterized queries prevent SQL injection

---

## What I Learned

- Building a REST API with Node.js and Express
- Defining database schemas and running migrations with Prisma ORM
- Connecting a React frontend to an Express backend via fetch API
- Managing React state with useState and useEffect hooks
- Building a calendar component from scratch using JavaScript Date logic
- Filtering and aggregating data on the frontend for analytics
- Using Recharts to build bar and pie charts with custom styling
- Implementing budget vs spending comparisons with progress bars
- Structuring a full-stack project with separate frontend and backend
- Using React Router for client-side navigation
- Writing conventional Git commit messages
- Deploying a full-stack app with separate frontend and backend services
- Managing separate development and production environments
- Using cloud services: Vercel, Render, and Neon

---

## Future Improvements

- User authentication (login and register)
- Export expenses to CSV
- Edit existing expenses
- Recurring expense tracking
- Push notifications for budget warnings
- Mobile app version

---

## Author

**Aliff Khuzairi bin Jamaludin**
Computer Science Graduate
Korea University, Seoul

---

## License

This project is for educational purposes.
