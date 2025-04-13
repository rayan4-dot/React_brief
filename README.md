



# 🎓 Learning Platform – Frontend (React + TailwindCSS)

This is the **frontend** of the Learning Platform built with **React**, **Vite**, and **TailwindCSS**.



## Running the Project FRONTEND

1. **Clone the Repo**:
   ```bash
   git clone https://github.com/rayan4-dot/React_brief
   cd
   npm run build
   ```

> 🧠 The backend API is built with Laravel and is hosted here:  
> 🔗 https://github.com/rayan4-dot/Rest_api-
> Switch to branch frontend


1. **Install Dependencies**:
   ```bash
   composer install
   ```

2. **Set Up Environment**:
   Copy `.env.example` to `.env` and configure it:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your database details:
   ```env
  DB_CONNECTION=mysql
  DB_HOST=127.0.0.1
  DB_PORT=3306
  DB_DATABASE=edex
  DB_USERNAME=root
  DB_PASSWORD=
   ```

3. **Generate App Key**:
   ```bash
   php artisan key:generate
   ```

4. **Run Migrations**:
   ```bash
   php artisan migrate
   ```

5. **Start the Server**:
   ```bash
   php artisan serve
   ```

API runs at http://localhost:8000/api/v1.

## Public API Endpoints

All endpoints are under `/api/v1` and require no authentication.

| Method | Endpoint            | Description             | Controller             |
|--------|---------------------|-------------------------|------------------------|
| GET    | /courses            | List all courses        | CourseController@index |
| GET    | /courses/{id}       | Show a specific course  | CourseController@show  |
| POST   | /courses            | Create a new course     | CourseController@store |
| PUT    | /courses/{id}       | Update a course         | CourseController@update|
| DELETE | /courses/{id}       | Delete a course         | CourseController@destroy|
| GET    | /categories         | List all categories     | CategoryController@index |
| POST   | /categories         | Create a new category   | CategoryController@store |
| PUT    | /categories/{id}    | Update a category       | CategoryController@update |
| DELETE | /categories/{id}    | Delete a category       | CategoryController@destroy |
| GET    | /tags               | List all tags           | TagController@index     |
| GET    | /tags/{id}          | Show a specific tag     | TagController@show      |
| GET    | /stats/courses      | Course stats            | AdminController@courseStats |
| GET    | /stats/categories   | Category stats          | AdminController@categoryStats |
| GET    | /stats/tags         | Tag stats               | AdminController@tagStats |

## Key Notes

**Base URL**: All endpoints are prefixed with `/api/v1`.

**No Auth**: These routes are public, accessible without tokens.

### Courses
CRUD operations for managing courses.

**Example POST payload**:
```json
{
  "title": "Intro to PHP",
  "description": "Learn PHP basics"
}
```

### Categories
CRUD for managing learning categories.

**Example POST payload**:
```json
{
  "name": "Programming",
  "description": "Coding skills"
}
```

### Tags
Read-only (GET) for listing or viewing tags.

Returns tags with `courses_count`:
```json
[
  { "id": 1, "name": "PHP", "courses_count": 2 }
]
```

### Stats
Provide aggregated data:
- `/stats/courses`: Total courses, grouped by status/category.
- `/stats/categories`: Total categories, with course counts.
- `/stats/tags`: Total tags, with course counts.

**Response format**:
```json
{
  "success": true,
  "data": {
    "total": 6,
    "by_status": [{ "status": "open", "count": 6 }],
    "by_category": [{ "category_id": 1, "count": 4, "category": { ... } }],
    "details": []
  }
}
```

**Errors**:
Expect JSON responses like:
```json
{
  "success": false,
  "error": "Resource not found"
}
```
