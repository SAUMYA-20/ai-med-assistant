# AI Med Assistant

This is an AI-powered medical voice assistant built with [Next.js](https://nextjs.org), Clerk authentication, Drizzle ORM, and Vapi for voice interactions. Users can describe symptoms, get AI doctor suggestions, and start a voice consultation session.

## Features

- **User Authentication**: Secure login/signup with Clerk.
- **AI Doctor Suggestions**: Get doctor recommendations based on your symptoms.
- **Voice Consultation**: Start and manage voice-based medical sessions.
- **Session History**: View and manage your past consultations.
- **Modern UI**: Responsive, accessible, and visually appealing interface.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL or your preferred database (configured in `/config/db`)
- Clerk account for authentication ([Clerk Docs](https://clerk.com/docs))
- Vapi API key for voice features ([Vapi Docs](https://docs.vapi.ai/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/ai-med-assistant.git
   cd ai-med-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables**

   Create a `.env.local` file and add your keys:
   ```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_VAPI_API_KEY=your_vapi_api_key
   DATABASE_URL=your_database_url
   ```

4. **Run database migrations** (if using Drizzle or another ORM)
   ```bash
   # Example for Drizzle
   npx drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## Project Structure

- `/app` - Next.js app directory (routes, components, API)
- `/app/api/session-chat` - API routes for session management
- `/app/(routes)/_components` - Reusable UI components
- `/config` - Database and schema configuration

## Key Technologies

- [Next.js App Router](https://nextjs.org/docs/app)
- [Clerk](https://clerk.com/) for authentication
- [Drizzle ORM](https://orm.drizzle.team/) for database access
- [Vapi](https://vapi.ai/) for voice AI
- [Tailwind CSS](https://tailwindcss.com/) for styling

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Drizzle ORM Docs](https://orm.drizzle.team/docs)
- [Vapi Docs](https://docs.vapi.ai/)

