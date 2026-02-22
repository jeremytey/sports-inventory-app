# Sports Equipment Inventory

A full-stack inventory management application for a sports equipment store. Built with Node.js, Express, PostgreSQL, and EJS.

## Features

- Browse equipment by category
- Full CRUD for categories and items
- Admin password protection for destructive actions (edit, delete)
- Server-side form validation
- Cascade delete — removing a category removes all its items
- Responsive layout

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** PostgreSQL via `pg` (node-postgres)
- **Templating:** EJS
- **Environment:** dotenv
- **Deployment:** Render

## Project Structure

```
├── app.js                  # Express app setup, middleware, route mounting
├── db/
│   ├── pool.js             # PostgreSQL Pool connection
│   ├── queries.js          # All parameterized SQL query functions
│   └── seed.js             # One-time database seeding script
├── controllers/
│   ├── categoryController.js
│   └── itemController.js
├── routers/
│   ├── categoryRouter.js
│   └── itemRouter.js
├── views/
│   ├── index.ejs           # Home — category list
│   ├── category.ejs        # Category detail — item list
│   ├── item.ejs            # Item detail
│   ├── categoryForm.ejs    # Create & edit category form
│   └── itemForm.ejs        # Create & edit item form
└── public/
    └── css/
        └── style.css
```

## Database Schema

```sql
CREATE TABLE categories(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) UNIQUE NOT NULL ,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items(
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) CHECK (price > 0),
    stock_quantity INTEGER CHECK (stock_quantity >= 0),
    category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
)
```

### Prerequisites

- Node.js v18+
- PostgreSQL

### Setup

1. Clone the repository

```bash
git clone https://github.com/yourusername/sports-inventory-app.git
cd sports-inventory-app
```

2. Install dependencies

```bash
npm install
```

3. Create a `.env` file in the root directory

```
DATABASE_URL=postgresql://username:password@localhost:5432/sportsgarage
ADMIN_PASSWORD=your_secret_password
```

4. Create the database and run the schema

```bash
psql -U postgres -c "CREATE DATABASE sportsgarage"
psql -U postgres -d sportsgarage -f db/schema.sql
```

5. Seed the database

```bash
node db/seed.js
```

6. Start the development server

```bash
node app.js
```

Visit `http://localhost:3000`

## Deployment (Render)

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Set environment variables (`DATABASE_URL`, `ADMIN_PASSWORD`) in the Render dashboard
4. Create a PostgreSQL instance on Render and use its connection string
5. Run `node db/seed.js` once via the Render shell after deploy

## Admin Password

Editing or deleting any category or item requires the admin password set in your `.env` file. This is checked server-side on every destructive request.
