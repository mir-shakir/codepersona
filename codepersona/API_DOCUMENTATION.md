# CodePersona API Documentation

This document provides an overview of the API endpoints used in the CodePersona application. The backend is built using Next.js API Routes.

## Base URL

The base URL for all API endpoints is `/api`.

---

## 1. Authentication

Authentication is handled by NextAuth.js.

### `GET /api/auth/signin`

- **Description:** Redirects the user to the GitHub authentication page to sign in.
- **Provider:** GitHub
- **Usage:** This is typically handled by the NextAuth.js client library.

### `GET /api/auth/signout`

- **Description:** Signs the user out of the application.
- **Usage:** This is typically handled by the NextAuth.js client library.

### `GET /api/auth/session`

- **Description:** Returns the current user's session information.
- **Response:**
  ```json
  {
    "user": {
      "name": "Shakir",
      "email": "shakir@example.com",
      "image": "https://avatars.githubusercontent.com/u/..."
    },
    "expires": "..."
  }
  ```

---

## 2. Analysis

### `POST /api/analyze`

- **Description:** The core endpoint that triggers a personality analysis for a given GitHub username. It fetches data from the GitHub API, processes it, calculates the personality archetype, and saves the results to the database.
- **Request Body:**
  ```json
  {
    "githubUsername": "some-user"
  }
  ```
- **Authentication:** Not strictly required for this prototype. Unauthenticated users can run analyses.
- **Responses:**
  - **200 OK:** Analysis was successful.
    ```json
    {
      "analysisId": "uuid-string-for-the-new-analysis",
      "personalityType": "The Midnight Warrior",
      "reportUrl": "/results/uuid-string-for-the-new-analysis"
    }
    ```
  - **400 Bad Request:** The request body is invalid or the username is missing.
    ```json
    { "error": "GitHub username is required" }
    ```
  - **404 Not Found:** The specified GitHub user could not be found.
    ```json
    { "error": "GitHub user not found" }
    ```
  - **500 Internal Server Error:** An unexpected error occurred during the analysis.
    ```json
    { "error": "Failed to analyze user" }
    ```

---

## 3. Results

### `GET /api/results/{analysisId}`

- **Description:** Retrieves the detailed results of a specific analysis.
- **Path Parameters:**
  - `analysisId` (string, required): The UUID of the analysis to retrieve.
- **Authentication:** Not required if the analysis is public. Required if it's private.
- **Response:**
  ```json
  {
    "id": "uuid-string",
    "personality_type": "The Midnight Warrior",
    "personality_score": {
      "trait1": 0.85,
      "trait2": 0.40
    },
    "analysis_data": {
      "commit_heatmap": [...],
      "language_distribution": {...}
    },
    "user": {
      "name": "Shakir",
      "avatar_url": "https://avatars.githubusercontent.com/u/..."
    },
    "created_at": "2025-07-14T10:00:00.000Z"
  }
  ```

---

## 4. Social Sharing

### `GET /api/og/{analysisId}.png`

- **Description:** Generates and returns a dynamic Open Graph (OG) image for a specific analysis result. This is used for social media sharing previews.
- **Path Parameters:**
  - `analysisId` (string, required): The UUID of the analysis.
- **Query Parameters (Optional):**
  - `template` (string): The template to use (e.g., `twitter`, `instagram_square`, `story`). Defaults to `twitter`.
- **Authentication:** Not required.
- **Response:** A PNG image file.

---

This API is designed to be simple and focused on the core functionality of the application. Future versions may include more endpoints for premium features like team analysis or historical data.
