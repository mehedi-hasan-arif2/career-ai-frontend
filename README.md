# CareerAI — Frontend

CareerAI is an AI-powered career development platform that helps users understand their current skills, identify career gaps, and build a clear path toward their target role.

Users can analyze their resume, get personalized career recommendations, generate a step-by-step roadmap, and continue the conversation with an AI career assistant that maintains chat context.

This repository contains the **frontend application** built with Next.js, TypeScript, and modern React technologies.

## Live Demo

* **Client:** 

## Key Features

* **Explore Career Tracks**
  Browse career tracks without an account with search, category and difficulty filters, sorting, and pagination.

* **Career Track Details**
  View detailed information including category, difficulty, duration, rating, and related career options.

* **AI Resume Analysis**
  Paste resume content and receive AI-generated insights including extracted skills, strengths, and skill gaps.

* **Personalized Career Roadmap**
  Set a career goal and generate an ordered roadmap based on your skills, resume analysis, and previous goals.

* **AI Career Assistant**
  Chat with an AI assistant that keeps conversation history and provides context-aware responses with suggested follow-up questions.

* **Career Item Management**
  Create and manage personal career items with ownership-based access and delete confirmation.

* **Analytics Dashboard**
  Track career progress with skill frequency and activity visualizations powered by Recharts.

* **Authentication**
  Supports email/password authentication, Google sign-in, and demo login.

* **Responsive UI**
  Designed to work across mobile, tablet, and desktop devices.

* **Theme Support**
  Includes light and dark mode.

## Technology Stack

* Next.js 15 (App Router)
* React 19
* TypeScript
* Tailwind CSS
* TanStack Query
* Axios
* React Hook Form
* Zod
* Framer Motion
* Recharts
* Sonner
* Lucide React

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd career-ai-frontend
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

The Google Client ID must match the one configured on the backend.

### 3. Run the development server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

Make sure the backend server is running before using features that depend on authentication, career data, AI services, or analytics.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```text
src/
├── app/              # Next.js routes and pages
├── components/       # Reusable UI components
├── hooks/            # Custom React hooks
├── lib/              # API clients and utilities
├── providers/        # Application providers
├── services/         # API and data services
├── types/            # TypeScript types
└── ...
```

## Deployment

The frontend is deployed and connected to the production backend API.

---

Built with Next.js, TypeScript, and AI-powered career tools.