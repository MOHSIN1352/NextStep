# NextStep

NextStep is a full-stack web application designed to help users explore, search, and apply for jobs, scholarships, courses, and health policies. Built with a modern MERN (MongoDB, Express.js, React.js, Node.js) stack and Next.js for SSR and routing, NextStep offers personalized recommendations and a seamless, responsive user experience.

---

## Table of Contents

* [Features](#features)
* [Functional Requirements](#functional-requirements)
* [Non-Functional Requirements](#non-functional-requirements)
* [Tech Stack](#tech-stack)
* [Architecture](#architecture)
* [Installation & Setup](#installation--setup)
* [Environment Variables](#environment-variables)
* [Database Schema](#database-schema)
* [API Endpoints](#api-endpoints)
* [UI Components & Pages](#ui-components--pages)
* [Contributing](#contributing)
* [License](#license)

---

## Features

* **User Authentication**: Sign up, log in, password management, and profile updates.
* **Job Search & Application**: Browse listings, filter by company, industry, salary, and location. Apply directly through the platform.
* **Saved Items**: Bookmark jobs, policies, institutes, and courses for later review.
* **Personalized Recommendations**: Career, courses, and policy suggestions based on user profile and activity.
* **Scholarship & Policy Explorer**: Discover state-level scholarship and health policy documents.
* **Institute & Course Directory**: Browse educational institutes and courses, view details and apply/register.
* **Hospital & Policy Finder**: Search hospitals and health insurance policies by location and type.
* **Real-time Search Suggestions**: Live autocomplete for jobs, books (if integrated), and institutes.
* **Responsive UI**: Works seamlessly across mobile, tablet, and desktop.

---

## Functional Requirements

1. **User Management**

   * Users can register, log in, reset passwords, and update profiles.
   * Secure authentication with JWT and encrypted passwords.

2. **Job Module**

   * CRUD operations for job postings (Admin/Employer).
   * Users can search, filter, and apply for jobs.

3. **Scholarship & Policy Module**

   * Admin can upload state policies and scholarship documents.
   * Users can browse and filter by state and category.

4. **Institute & Course Module**

   * CRUD for institutes and courses.
   * Course enrollment workflow.

5. **Hospital & Health Policy Module**

   * Hospital listings with details and ratings.
   * Policy search by type and location.

6. **Recommendations Engine**

   * Suggest jobs, courses, and policies based on user preferences and history.

7. **Saved Items**

   * Users can bookmark items across modules.
   * View and manage saved items in the dashboard.

8. **Search & Autocomplete**

   * Live suggestions as users type in search bars.

9. **Notifications & Alerts**

   * Email confirmations for applications and policy updates.

---

## Non-Functional Requirements

* **Performance**: Fast response times (<200ms for API calls).
* **Scalability**: Horizontal scaling for backend servers and MongoDB sharding.
* **Security**: OWASP-compliant; input validation, sanitization, rate limiting, HTTPS.
* **Maintainability**: Modular codebase, clear separation of concerns, documented API.
* **Availability**: 99.9% uptime with health checks and monitoring.
* **Responsiveness**: Mobile-first design, accessible UI components.
* **Logging & Monitoring**: Centralized logs, error tracking, and performance metrics.

---

## Tech Stack

* **Frontend**: Next.js, React.js, Tailwind CSS, Framer Motion
* **Backend**: Node.js, Express.js
* **Database**: MongoDB (Mongoose ODM)
* **Authentication**: JSON Web Tokens (JWT), bcrypt
* **Hosting & Deployment**: Vercel (Frontend), Heroku/AWS (Backend), Atlas (MongoDB)
* **CI/CD**: GitHub Actions
* **Testing**: Jest, React Testing Library, Supertest

---

## Architecture

![Architecture Diagram](./docs/architecture.png)

1. **Client**: Next.js SSR pages and React SPA components.
2. **API Server**: RESTful endpoints built with Express.js.
3. **Database**: MongoDB with collections for Users, Jobs, Policies, Institutes, Courses, Hospitals, States, Cities.
4. **Services**: Recommendation engine, email service (e.g., SendGrid).

---

## Installation & Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/MOHSIN1352/NextStep.git
   cd NextStep
   ```

2. **Install dependencies**:

   ```bash
   # Frontend
   cd client
   npm install

   # Backend
   cd ../server
   npm install
   ```

3. **Configure environment variables** (see [Environment Variables](#environment-variables)).

4. **Run locally**:

   ```bash
   # Start backend
   cd server
   npm run dev

   # Start frontend
   cd ../client
   npm run dev
   ```

5. **Build for production**:

   ```bash
   cd client
   npm run build
   ```

---

## Environment Variables

Create a `.env` file in both `client` and `server` directories.

**Server `.env`**:

```
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_API_KEY=your_email_service_key
```

**Client `.env.local`**:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

---

## Database Schema

| Collection     | Key Fields                                                                 |
| -------------- | -------------------------------------------------------------------------- |
| **Users**      | `_id`, `name`, `email`, `password`, `role`                                 |
| **Jobs**       | `_id`, `title`, `company`, `location`, `salary`, `industry`, `description` |
| **Policies**   | `_id`, `title`, `stateId`, `category`, `documentUrl`                       |
| **Institutes** | `_id`, `name`, `cityId`, `courses`                                         |
| **Courses**    | `_id`, `title`, `instituteId`, `duration`                                  |
| **Hospitals**  | `_id`, `name`, `cityId`, `rating`                                          |
| **States**     | `_id`, `name`, `code`                                                      |
| **Cities**     | `_id`, `name`, `stateId`                                                   |

---

## API Endpoints

| Method | Endpoint                      | Description                   |
| ------ | ----------------------------- | ----------------------------- |
| POST   | `/api/auth/register`          | Register a new user           |
| POST   | `/api/auth/login`             | Authenticate user, return JWT |
| GET    | `/api/users/profile`          | Get logged-in user profile    |
| PUT    | `/api/users/profile`          | Update user profile           |
| GET    | `/api/jobs`                   | List all jobs                 |
| POST   | `/api/jobs`                   | Create a job (Admin)          |
| GET    | `/api/jobs/:id`               | Get job details               |
| PUT    | `/api/jobs/:id`               | Update job (Admin)            |
| DELETE | `/api/jobs/:id`               | Delete job (Admin)            |
| GET    | `/api/policies`               | List policies                 |
| POST   | `/api/policies`               | Create policy (Admin)         |
| GET    | `/api/institutes`             | List institutes               |
| GET    | `/api/institutes/:id/courses` | List courses by institute     |
| GET    | `/api/hospitals`              | List hospitals                |

*📄 [View Full Project Documentation](docs/Documentation.pdf)
*

---

## UI Components & Pages

* **Home / Explore**: Dashboard with search bars and featured items.
* **Auth Page**: Glassmorphic login/signup with animated transitions.
* **Profile**: View/update user details.
* **Job Listings & Details**: Cards, filters, and detail view.
* **Saved Items**: Scrollable section with chevron controls.
* **Recommendations**: Personalized carousel of jobs, courses, policies.
* **Policy & Scholarship Explorer**: State filter and document viewer.
* **Institute & Course Directory**: Grid of institutes and nested courses.
* **Hospital & Policy Finder**: Map integration and list view.

---

## Contributing

Contributions are welcome! Please:

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

Please follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## License

This project is licensed under the [MIT License](./LICENSE).
