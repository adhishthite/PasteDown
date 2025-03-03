# Project Requirements Document (PRD) for Markdown PasteBin MVP

## 1. Project Overview

The Markdown PasteBin is a simple yet powerful web service that allows users to easily paste, share, and view Markdown content via a unique URL. The platform is designed to deliver a distraction-free and intuitive interface where users can type their Markdown in an editor with a live preview, submit it, and instantly receive a shareable link. The core idea is to improve upon existing paste services by delivering robust Markdown rendering along with a clean, minimal user experience. Once a paste is submitted, it is locked from further edits and is set to auto-expire after three days, ensuring that the content remains temporary and the system stays uncluttered.

The primary purpose behind building this service is to address the shortcomings of current paste sites that often lack efficient Markdown support. Its key objectives include offering a seamless markdown editing and previewing experience, a secure backend for storing content, and an auto-deletion mechanism that leverages MongoDB TTL indexing. Success will be measured by how well the application performs under light load conditions, the reliability of its unique URL generation, and the smooth user experience from content creation to viewing.

## 2. In-Scope vs. Out-of-Scope

**In-Scope:**

*   Users can create a Markdown paste using a large text area.
*   Live preview of the rendered Markdown as the user types.
*   Ability to edit content freely until submission.
*   Generation of a unique, shareable URL (using a short unique ID, e.g., "abc123") once the paste is submitted.
*   Storage of the paste in MongoDB Atlas, using Mongoose as the ORM.
*   Implementation of a built-in auto-deletion feature with a default expiration of 3 days, using MongoDB’s TTL indexing.
*   Custom error pages to notify users when a paste is invalid or has expired.
*   Basic rate limiting of 5 requests per hour per IP to prevent abuse.
*   Deployment of the frontend on Vercel and the backend on Fly.io or Railway.app.
*   Integration of basic analytics and logging (leveraging Vercel’s native tools).

**Out-of-Scope:**

*   Advanced paste editing features post-submission (the paste remains uneditable).
*   Allowing users to select custom expiration durations in this version (fixed at 3 days).
*   Additional features such as public paste listings, searchable pastes, password-protected pastes, or downloadable formats (to be considered in later development phases).
*   Extra monitoring or integration services beyond simple logging and analytics.
*   Extensive user authentication or account management systems.

## 3. User Flow

When a user lands on the Markdown PasteBin, they are greeted with a minimalist landing page focused on the Markdown editor. The interface features a large text area on one side where users can enter their Markdown content, complemented by a live preview pane that updates in real time. The design is intentional; it minimizes distractions so that all attention is on creating clear and formatted Markdown content. The UI utilizes a clean aesthetic with subtle animations powered by Framer Motion for smooth transitions, and it is fully responsive for mobile devices.

Once the user has finished writing, they click on the “Submit” button. On submission, the paste is locked from further editing and a unique URL is generated using a short ID created by the nanoid library. This URL is then visibly displayed to the user, allowing them to copy and share it immediately. The paste is saved to a MongoDB Atlas database with an expiration timestamp set to three days from creation, enforced by a TTL index. If someone accesses an expired or non-existent paste, they are redirected to a custom error page that explains the issue clearly while staying consistent with the overall clean design.

## 4. Core Features

*   **Markdown Paste Creation**

    *   A distraction-free text area for entering Markdown content.
    *   Live Markdown preview pane that renders content in real time.
    *   A “Submit” button to finalize the paste submission.

*   **Editing Before Submission**

    *   Users can edit their content freely until the paste is submitted.
    *   Once submitted, the paste is locked and cannot be modified.

*   **Unique, Shareable URL Generation**

    *   The system generates a short, unique ID (via nanoid) that converts to a shareable URL (e.g., mdpaste.io/abc123).
    *   No user authentication is required to view pastes.

*   **Auto-Deletion of Pastes**

    *   Pastes automatically expire after three days.
    *   Uses MongoDB TTL indexing to handle the deletion process automatically.

*   **Custom Error Handling**

    *   Displays a dedicated custom error page for invalid or expired paste IDs.

*   **Rate Limiting and Logging**

    *   Backend restricts each IP address to 5 requests per hour.
    *   Incorporation of analytics and logging using Vercel’s native tools to monitor usage and errors.

## 5. Tech Stack & Tools

**Frontend:**

*   Framework: Next.js
*   UI Library: ShadCN UI
*   Markdown Rendering: react-markdown (or marked.js)
*   Styling: TailwindCSS
*   Language: Typescript
*   Deployment: Vercel
*   Animations: Framer Motion (for smooth transitions)

**Backend:**

*   Framework: Express.js (Node.js)
*   Database: MongoDB Atlas
*   ORM: Mongoose
*   Unique ID Generation: nanoid
*   Deployment: Fly.io or Railway.app

**Additional Tools & Integrations:**

*   Logging & Analytics: Vercel native tools
*   IDE/Plugin Integration: Cursor (an advanced IDE with real-time AI-powered coding suggestions)

## 6. Non-Functional Requirements

*   **Performance:**

    *   Frontend load times should be under 2 seconds on average.
    *   Backend response time for API calls should be within 200-300ms under normal load.

*   **Security:**

    *   Ensure that content submission and viewing are secure, with no authentication required but with safe handling of user input to avoid injection attacks.
    *   Rate limiting (5 requests per hour per IP) to prevent abuse.

*   **Compliance:**

    *   Ensure that data storage and deletion via MongoDB Atlas comply with privacy standards.
    *   Basic GDPR compliance by not storing any sensitive user data.

*   **Usability:**

    *   Interface should be minimalist, mobile responsive, and provide a smooth user experience.
    *   Support for both light and dark themes with consistent theming.

## 7. Constraints & Assumptions

*   The paste expiry is hardcoded to 3 days for this MVP, and any customization will be considered in future phases.
*   It is assumed that MongoDB Atlas, Express.js, and the chosen deployment platforms (Vercel, Fly.io/Railway.app) are readily available and meet the demands of our usage metrics.
*   The system is built primarily for sharing Markdown and will not support any edit functionality post-submission.
*   Assumes that third-party libraries like nanoid, react-markdown, and Framer Motion are stable and well-maintained.
*   Rate limiting is based on the assumption that an IP address is a reliable identifier for abuse prevention in the current setup.

## 8. Known Issues & Potential Pitfalls

*   **Rate Limiting Challenges:**

    *   With the limitation of 5 requests per hour per IP, there might be false positives (e.g., shared networks) blocking legitimate use. Consider potential white-listing in high-traffic scenarios.

*   **Scalability for Future Enhancements:**

    *   Current design does not account for features like password-protected pastes or public search. The architecture should be modular to ease the integration of these features later.

*   **MongoDB TTL Index Limitations:**

    *   Relying entirely on MongoDB TTL indexing for auto-deletion might introduce slight delays in deletion. Have monitoring in place for expired content.

*   **User Experience for Expired/Invalid Pastes:**

    *   Ensuring that the custom error page provides clear messaging without confusing users. A well-designed error page is essential.

*   **Deployment Environments:**

    *   Differences in deployment platforms (Vercel for frontend vs. Fly.io/Railway.app for backend) might lead to integration hiccups. Maintain robust API contract tests between frontend and backend to mitigate issues.

This document should serve as a clear and complete reference for generating future technical documents related to the Markdown PasteBin MVP, ensuring that every aspect from user flow to deployment is well understood by all subsequent systems involved.
