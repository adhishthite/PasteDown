**Implementation Plan for Markdown PasteBin MVP**

This implementation plan is organized into five phases: Environment Setup, Frontend Development, Backend Development, Integration, and Deployment. Each step includes the relevant document or section reference.

## Phase 1: Environment Setup

1.  **Check Node.js Installation**

    *   Verify Node.js is installed by running `node -v`. Ensure it is Node.js v20.2.1 (as recommended in our guidelines).
    *   **Reference:** PRD Section 1, Tech Stack

2.  **Clone Starter Kit Repository**

    *   Run: `git clone https://github.com/codeGuide-dev/codeguide-starter-lite.git`
    *   Rename the cloned repository to `markdown-pastebin-mvp`.
    *   **Reference:** StarterKit Document

3.  **Initialize Git Repository Branches**

    *   Create and switch to `main` and `dev` branches.
    *   **Reference:** PRD Section 1.4

4.  **Validation:**

    *   Run `node -v` and verify the repository structure matches the provided starter kit.

## Phase 2: Frontend Development

1.  **Set Up Next.js 14**

    *   In the project’s `package.json` (located in the root), ensure the dependency for Next.js is set exactly to version 14 (e.g., "next": "14.x"). This is essential as Next.js 14 is preferred with current AI tools.
    *   **Reference:** Tech Stack (Frontend), notes from developer instructions

2.  **Install Frontend Dependencies**

    *   Install required packages: Next.js 14, TailwindCSS, Typescript, ShadCN UI, react-markdown, and Framer Motion.
    *   Run: `npm install next@14 tailwindcss typescript @shadcn/ui react-markdown framer-motion`
    *   **Reference:** PRD Section 3, Tech Stack

3.  **Implement Landing Page with Editor**

    *   Modify `/app/page.tsx` to render the landing page. This page should contain an inviting, minimalist interface.
    *   **Reference:** PRD Section 3 (User Flow: Landing and Initialization)

4.  **Create Markdown Editor Component**

    *   Create a new file at `/components/Editor.tsx`.

    *   In this component:

        *   Add a large `<textarea>` for entering Markdown content.
        *   Implement a live preview pane using the `react-markdown` library to render the Markdown text.
        *   Style the component using TailwindCSS and ShadCN UI components.

    *   **Reference:** PRD Section 4 (Core Features: Paste Creation & Editing Before Submission)

5.  **Add Submit Functionality**

    *   In the Editor component, add a "Submit" button that triggers a POST request to the backend API endpoint (`/api/paste`).
    *   **Reference:** API Endpoints (Create a New Paste)

6.  **Validation:**

    *   Run `npm run dev` and verify that:

        *   The landing page displays the Markdown editor and live preview.
        *   Typing in the textarea updates the preview in real time.

## Phase 3: Backend Development

1.  **Initialize Express.js Project**

    *   Create a new folder called `/backend` in the project root.
    *   Inside `/backend`, run `npm init -y` to initialize a new Node.js project.
    *   Install dependencies: Express, Mongoose, nanoid, express-rate-limit, and cors by running:

2.  `npm install express mongoose nanoid express-rate-limit cors`

    *   **Reference:** PRD Sections 1 & 4, Tech Stack (Backend)

3.  **Set Up Express Server**

    *   Create `/backend/app.js` to initialize the Express app.
    *   Add middleware for JSON parsing and CORS (allowing requests from `http://localhost:3000`).
    *   **Reference:** PRD Section 4 (Core Features), App Flow: Submission and URL Generation

4.  **Define MongoDB Model**

    *   In `/backend/models`, create a file named `Paste.js`.
    *   Implement the Mongoose schema using the following code:

5.  `const mongoose = require('mongoose'); const PasteSchema = new mongoose.Schema({ id: { type: String, required: true, unique: true }, content: { type: String, required: true }, createdAt: { type: Date, default: Date.now }, expiresAt: { type: Date, required: true, index: { expires: 0 } } }); module.exports = mongoose.model('Paste', PasteSchema);`

    *   **Reference:** Tech Stack Document (Database Schema)

6.  **Implement API Route for Creating a Paste**

    *   In `/backend/routes`, create a file named `paste.js`.

    *   Add the POST endpoint `POST /api/paste` which:

        *   Uses `nanoid` to generate a unique ID.
        *   Calculates the `expiresAt` timestamp as current time plus 3 days.
        *   Saves the paste to MongoDB Atlas using the Mongoose model.

    *   **Reference:** API Endpoints (Create a New Paste)

7.  **Implement API Route for Retrieving a Paste**

    *   In `/backend/routes/paste.js`, add a GET endpoint `GET /api/paste/:id` that retrieves and returns the paste by its ID.
    *   **Reference:** API Endpoints (Get a Paste by ID)

8.  **Apply Rate Limiting Middleware**

    *   In `/backend/app.js`, use `express-rate-limit` to restrict each IP to 5 requests per hour.

9.  `const rateLimit = require('express-rate-limit'); const limiter = rateLimit({ windowMs: 60 * 60 * 1000, // 1 hour max: 5, // Limit each IP to 5 requests per windowMs }); app.use(limiter);`

    *   **Reference:** PRD Section 7 (Rate Limiting)

10. **Validation:**

    *   Run the Express server locally and use curl/Postman to test:

        *   POSTing a new paste to `/api/paste` returns JSON with a unique `id` and `url`.
        *   GETting a paste by its ID returns the expected content.

## Phase 4: Integration

1.  **Connect Frontend to Backend**

    *   In the Editor component (`/components/Editor.tsx`), update the submit function to call the backend API at the appropriate URL.
    *   Use the `fetch` API (or axios) to perform the POST request to `http://localhost:PORT/api/paste` (replace PORT with your backend port).
    *   **Reference:** App Flow: Submission and URL Generation

2.  **Ensure CORS Configuration**

    *   Double-check that the backend CORS middleware allows requests from `http://localhost:3000` (or your Vercel development URL).
    *   **Reference:** PRD Section 3 (User Flow)

3.  **Validation:**

    *   From the frontend editor, click the Submit button and verify that the paste is created and a shareable URL is received.

## Phase 5: Deployment

1.  **Frontend Deployment on Vercel**

    *   Connect the GitHub repository to Vercel.
    *   Configure the Next.js app for deployment ensuring custom API routes (if using Next.js API routes) are properly set up.
    *   **Reference:** Deployment Plan (Frontend Deployment)

2.  **Backend Deployment on Fly.io or Railway.app**

    *   Choose a backend host (for example, Railway.app) and deploy the Express server.
    *   Configure environment variables for the MongoDB Atlas connection string.
    *   **Reference:** Deployment Plan (Backend Deployment)

3.  **Implement Custom Error Page**

    *   In the Next.js app, create a custom error page (e.g., `/app/404.tsx` or `/app/error.tsx`) to display when a paste is expired or invalid.
    *   **Reference:** PRD Section 3 (Error Handling)

4.  **Validation:**

    *   Perform an end-to-end test by deploying both frontend and backend.
    *   Submit a paste, retrieve it via its unique URL, and test invalid/expired paste scenarios to ensure the custom error page is displayed.

**Final Validation Steps:**

1.  Run full integration tests:

    *   Use a tool such as Postman or curl to confirm API responses are correct.
    *   Verify that the frontend correctly displays the live Markdown preview and processes submission.
    *   Confirm that rate limiting is enforced (5 requests per hour per IP).
    *   Ensure deployment endpoints (Vercel for frontend and Railway.app/Fly.io for backend) are operational and correctly integrated with MongoDB Atlas.

This comprehensive plan ensures that the Markdown PasteBin MVP meets the PRD requirements and leverages the specified tech stack and design guidelines. Each step has been formulated to directly reflect the project documentation and requirements provided.
