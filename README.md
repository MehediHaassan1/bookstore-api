# 📚 Bookstore RESTful API
This is a RESTful API for managing a bookstore, built with TypeScript, Express.js, Knex, and PostgreSQL. The API allows users to perform CRUD operations on authors and books, and includes search and pagination.

# 🚀 Features
- CRUD operations for Authors and Books.
- Validation using Express Validator.
- Input sanitization.
- Views: authors with books, books with author
- Error handling with meaningful HTTP status codes.
- Fully typed with TypeScript.
- Uses Knex for SQL query building and migrations.
- Environment configuration with .env
- Bonus
    - Pagination and search.

# 🛠️ Tech Stack
- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Knex.js
- Express Validator
- dotenv
- ESLint + Prettier 

# 📁 Project Structure
```
├───migrations
└───src
    ├───app
    │   ├───constant
    │   ├───controllers
    │   ├───routes
    │   ├───services
    │   └───validations
    ├───config
    ├───errors
    ├───interfaces
    ├───middlewares
    └───utils
├───.env
├───.env.example
├───.gitignore
├───.prettierignore
├───.prettierrc.json
├───eslint.config.mjs
├───knexfile.ts
├───package-lock.json
├───package.json
└───tsconfig.json
```

# ⚙️ Setup Instructions
### 1. Clone the repository
```
git clone https://github.com/MehediHaassan1/bookstore-api.git
cd bookstore-api
```
### 2. Install Dependencies
```
npm install
```
### 3. Set Up Environment Variables
Create a ```.env``` file in the root directory and replace with your data.
```
PORT=3000
DB_CLIENT=pg
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=bookstore_db
```
### 4. Run Migrations
```
npm run migrate:latest
```
### 5. Start the Server
```
npm run dev
```

# 🧪 API Endpoints
### Authors
- ```GET /authors```
- ```GET /authors/:id```
- ```POST /authors```
- ```PUT /authors/:id```
- ```DELETE /authors/:id```
### Books
- ```GET /books```
- ```GET /books/:id```
- ```POST /books```
- ```PUT /books/:id```
- ```DELETE /books/:id```
### Queries
- ```GET /books?author=1```
- ```GET /authors?searchsearchTerm=John```
- ```GET /books?searchTerm=War```
