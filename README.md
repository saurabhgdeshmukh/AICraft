Aicraft HTML & CSS Generator for Landing Pages

A full-stack AI-powered web application that allows users to generate complete HTML and CSS landing pages using natural language prompts. The app features real-time code preview and is designed to accelerate MVP development.
Features

    Authentication System
    Secure login and signup using NextAuth.js with email/password authentication.

    Chat Interface
    Interactive chat UI where users can prompt the AI to generate HTML and CSS code.

    HTML & CSS Code Generation
    Generates full HTML and CSS in a single file tailored for landing pages.

    Live Code Preview
    Displays real-time preview of the generated page directly within the chat interface.

    Download Option (Optional)
    Users can download the generated HTML file.

    System Prompt Optimization
    Optimized system prompts for better landing page generation using GenAI.

Tech Stack

    Framework: Next.js 14 (App Router)

    Language: TypeScript

    Styling: Tailwind CSS, ShadcnUI

    Authentication: NextAuth.js

    Database: PostgreSQL (via Supabase or NeonDB)

    ORM: Prisma or Drizzle (user choice)

    GenAI API: OpenAI / Anthropic / Gemini (via Vercel AI SDK)

    Hosting: Vercel


Setup Instructions
1. Clone the Repository

git clone https://github.com/yourusername/chatbot-html-css-generator.git
cd chatbot-html-css-generator

2. Install Dependencies

npm install

3. Environment Variables

Create a .env file at the root and add the following:

DATABASE_URL=your_postgresql_database_url
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_or_genai_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key

4. Set Up Database

Using Prisma:

npx prisma generate
npx prisma migrate dev --name init

Or if using Drizzle:

npx drizzle-kit push

5. Run the App

npm run dev

Visit http://localhost:3000
