# CodePersona - Discover Your Developer DNA

**CodePersona** is a web application that analyzes your GitHub profile to generate a humorous and shareable "developer personality" profile. It's built with modern web technologies and designed to be a fun, engaging tool for the developer community.

![CodePersona Screenshot](https://i.imgur.com/EXAMPLE.png) <!-- Replace with actual screenshot -->

## ✨ Features

- **GitHub Profile Analysis:** Enter any GitHub username to start the analysis.
- **Personality Archetypes:** Discover which of the 10 unique developer personalities you are.
- **Data Visualization:** See your coding habits visualized with interactive charts.
- **Social Sharing:** Get a custom-generated image of your results to share on social media.
- **Dark Mode:** Easy on the eyes for those late-night coding sessions.

## 🚀 Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Shadcn/ui](https://ui.shadcn.com/)
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
- **ORM:** [Prisma](https://www.prisma.io/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Visualizations:** [Recharts](https://recharts.org/)
- **OG Image Generation:** [@vercel/og](https://vercel.com/docs/functions/edge-functions/og-image-generation)
- **Deployment:** [Vercel](https://vercel.com/)

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or later)
- [npm](https://www.npmjs.com/)
- A [Supabase](https://supabase.com/) account
- A [GitHub](https://github.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/shakir/codepersona.git
cd codepersona
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Copy the `.env.example` file to a new file named `.env`.

```bash
cp .env.example .env
```

Follow the instructions in `ENVIRONMENT_SETUP.md` to get your API keys and credentials for GitHub and Supabase, and add them to your `.env` file.

### 4. Set Up the Database

Follow the instructions in `SUPABASE_SETUP_INSTRUCTIONS.md` to set up your Supabase project and push the database schema.

```bash
npx prisma db push
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
