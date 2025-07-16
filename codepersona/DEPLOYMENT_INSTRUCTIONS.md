# Vercel Deployment Instructions for CodePersona

Follow these steps to deploy your CodePersona application to Vercel.

## 1. Prerequisites

- You have a Vercel account ([vercel.com](https://vercel.com/)).
- You have a GitHub account and have pushed your CodePersona project to a GitHub repository.
- You have a completed Supabase setup as described in `SUPABASE_SETUP_INSTRUCTIONS.md`.

## 2. Importing Your Project to Vercel

1.  Log in to your Vercel dashboard.
2.  Click the **"Add New..."** button and select **"Project"**.
3.  The **"Import Git Repository"** screen will appear. Find your CodePersona GitHub repository and click the **"Import"** button next to it.
    - If you haven't connected your GitHub account to Vercel yet, you will be prompted to do so.

## 3. Configuring Your Vercel Project

After importing, Vercel will take you to the project configuration page.

1.  **Project Name:** Vercel will automatically use your repository name (`codepersona`). You can keep this or change it.
2.  **Framework Preset:** Vercel should automatically detect that you are using **Next.js**. No changes are needed here.
3.  **Root Directory:** If you have a monorepo setup, you might need to specify the root directory. Since our project is in the root, you can leave this as is.

## 4. Adding Environment Variables

This is the most critical step for a successful deployment.

1.  Expand the **"Environment Variables"** section.
2.  You need to add all the variables from your local `.env` file. These include your Supabase and GitHub credentials.

**Add the following variables:**

- `DATABASE_URL`: Your full Supabase database connection string.
- `NEXT_PUBLIC_SUPABASE_URL`: Your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Your Supabase anon public key.
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role secret key.
- `GITHUB_TOKEN`: Your GitHub Personal Access Token.
- `GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID.
- `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret.
- `NEXTAUTH_SECRET`: The secret key for NextAuth.js.
- `NEXTAUTH_URL`: The absolute URL of your production deployment (e.g., `https://codepersona.vercel.app`).
- `NEXT_PUBLIC_APP_URL`: The same absolute URL of your production deployment.
- `NEXT_PUBLIC_GA_ID`: Your Google Analytics 4 Measurement ID (optional).

**Important:**

- Ensure you copy and paste the values correctly.
- For secrets like `DATABASE_URL` and `GITHUB_TOKEN`, ensure there are no extra spaces or characters.

## 5. Deploying

1.  After adding all the environment variables, click the **"Deploy"** button.
2.  Vercel will start the build process. You can monitor the build logs in real-time.
3.  The deployment process typically takes a few minutes. Vercel will run `npm install`, `prisma generate`, and `next build`.

## 6. Post-Deployment

Once the deployment is complete, Vercel will provide you with a unique URL for your project (e.g., `codepersona.vercel.app`).

1.  **Visit your new URL** to see your live application.
2.  **Test the functionality** to ensure everything is working as expected. The first analysis might be a bit slow as the serverless functions "warm up".

## Automatic Deployments (CI/CD)

By default, Vercel sets up a CI/CD pipeline for you.

- **Production Branch:** Every time you push a commit to your `main` (or `master`) branch, Vercel will automatically trigger a new production deployment.
- **Preview Deployments:** Every time you create a pull request, Vercel will create a unique "preview" deployment. This allows you to review your changes live before merging them into the main branch.

Your CodePersona application is now live on Vercel!
