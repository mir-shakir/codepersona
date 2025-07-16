# Supabase Setup Instructions for CodePersona

Follow these steps to set up a Supabase project and connect it to your CodePersona application.

## 1. Create a Supabase Project

1.  Go to [supabase.com](https://supabase.com/) and sign in or create a new account.
2.  Click on "New project".
3.  Choose an organization and give your project a name (e.g., "CodePersona").
4.  Generate a secure Database Password and save it somewhere safe. You will need this for the connection string.
5.  Choose the region closest to your users.
6.  Click "Create new project".

## 2. Get Your Project Credentials

Once your project is created, navigate to the project dashboard.

1.  Go to **Project Settings** (the gear icon in the left sidebar).
2.  Click on the **Database** section.
3.  Under **Connection string**, find the URI. This is your `DATABASE_URL`. It will look something like this:
    `postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres`
    **Important:** Replace `[YOUR-PASSWORD]` with the secure Database Password you created in Step 1.

4.  Next, go to the **API** section in the Project Settings.
5.  Under **Project API Keys**, you will find your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
    - **Project URL:** This is your `NEXT_PUBLIC_SUPABASE_URL`.
    - **`anon` `public` key:** This is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
6.  You will also need the **`service_role` `secret`** key for administrative tasks. Be very careful with this key.
    - **`service_role` `secret` key:** This is your `SUPABASE_SERVICE_ROLE_KEY`.

## 3. Configure Your Environment Variables

1.  In the root of your CodePersona project, find the `.env.example` file and rename it to `.env`.
2.  Open the `.env` file and add the credentials you collected in the previous step.

```env
# Supabase
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT-ID].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[YOUR-PROJECT-ID].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[YOUR-ANON-PUBLIC-KEY]"
SUPABASE_SERVICE_ROLE_KEY="[YOUR-SERVICE-ROLE-SECRET-KEY]"

# Other variables (you can fill these in later)
GITHUB_TOKEN=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_SECRET= # Generate a secret using: openssl rand -hex 32
NEXTAUTH_URL=http://localhost:3000
```

**Remember to replace the placeholder values with your actual Supabase credentials.**

## 4. Apply the Database Schema

Once your environment variables are set up, you can apply the Prisma schema to your Supabase database.

1.  Open your terminal and navigate to the root of your CodePersona project.
2.  Run the following command to push the schema to your database. This will create the `User`, `Analysis`, and `PersonalityType` tables.

```bash
npx prisma db push
```

3.  After the command completes successfully, you can verify that the tables have been created by going to the **Table Editor** in your Supabase project dashboard.

Your Supabase database is now set up and connected to your CodePersona application!
