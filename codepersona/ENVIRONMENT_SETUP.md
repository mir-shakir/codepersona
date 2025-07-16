# Environment Setup for CodePersona

This document outlines the necessary environment variables to run the CodePersona application locally.

## 1. Create the Environment File

1.  In the root directory of the project, you will find a file named `.env.example`.
2.  Make a copy of this file and rename it to `.env`.

```bash
cp .env.example .env
```

This `.env` file is ignored by Git, so it's a safe place to store your secret keys.

## 2. Fill in the Environment Variables

Open the `.env` file in your code editor and fill in the values for each variable.

---

### GitHub API Credentials

You need to create a GitHub OAuth App to get these credentials. This allows your application to authenticate users and fetch data from the GitHub API on their behalf.

1.  Go to your GitHub **Settings**.
2.  Navigate to **Developer settings** > **OAuth Apps**.
3.  Click **"New OAuth App"**.
4.  Fill in the form:
    - **Application name:** CodePersona (or anything you like)
    - **Homepage URL:** `http://localhost:3000` (for local development)
    - **Authorization callback URL:** `http://localhost:3000/api/auth/callback/github`
5.  Click **"Register application"**.
6.  On the next page, you will see your **Client ID**.
7.  Click **"Generate a new client secret"** to get your **Client Secret**.

You will also need a **Personal Access Token (classic)** for some server-side API calls.

1.  Go to your GitHub **Settings**.
2.  Navigate to **Developer settings** > **Personal access tokens** > **Tokens (classic)**.
3.  Click **"Generate new token"** and select **"Generate new token (classic)"**.
4.  Give it a name, set an expiration, and select the `public_repo` and `read:user` scopes.
5.  Click **"Generate token"** and copy the token.

```env
# GitHub API
GITHUB_TOKEN="ghp_..."
GITHUB_CLIENT_ID="iv1. ..."
GITHUB_CLIENT_SECRET="..."
```

---

### Supabase Credentials

These credentials connect your application to your Supabase database. See `SUPABASE_SETUP_INSTRUCTIONS.md` for detailed steps on how to get these values.

```env
# Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-PUBLIC-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-SECRET-KEY]"
```

---

### NextAuth.js Configuration

NextAuth.js requires a secret for signing JWTs and a URL for generating correct callback URLs.

- **`NEXTAUTH_SECRET`**: A random string used to hash tokens. You can generate one quickly in your terminal:
  ```bash
  openssl rand -hex 32
  ```
- **`NEXTAUTH_URL`**: The base URL of your application. For local development, this is `http://localhost:3000`.

```env
# App Configuration
NEXTAUTH_SECRET="your_generated_secret_here"
NEXTAUTH_URL="http://localhost:3000"
```

---

### Application & Analytics

- **`NEXT_PUBLIC_APP_URL`**: The public URL of your app. For local development, this is `http://localhost:3000`.
- **`NEXT_PUBLIC_GA_ID`**: Your Google Analytics 4 Measurement ID (e.g., `G-XXXXXXXXXX`). This is optional.

```env
# Analytics & App URL
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 3. Example `.env` file

Here is a complete example of what your `.env` file should look like:

```env
# GitHub API
GITHUB_TOKEN=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Supabase
DATABASE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Analytics
NEXT_PUBLIC_GA_ID=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

**Remember to restart your development server (`npm run dev`) after making any changes to your `.env` file.**
