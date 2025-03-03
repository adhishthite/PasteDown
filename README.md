[![CodeGuide](/codeguide-backdrop.svg)](https://codeguide.dev)

# CodeGuide Starter Lite

A modern web application starter template built with Next.js 14, featuring authentication, database integration.

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication:** [Clerk](https://clerk.com/)
- **Database:** [Supabase](https://supabase.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## Prerequisites

Before you begin, ensure you have the following:

- Node.js 18+ installed
- A [Clerk](https://clerk.com/) account for authentication
- A [Supabase](https://supabase.com/) account for database
- Generated project documents from [CodeGuide](https://codeguide.dev/) for best development experience

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd codeguide-starter-lite
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Variables Setup**

   - Copy the `.env.example` file to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Fill in the environment variables in `.env` (see Configuration section below)

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.**

## Configuration

### Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com/)
2. Create a new application
3. Go to API Keys
4. Copy the `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`

### Supabase Setup

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Create a new project
3. Go to Project Settings > API
4. Copy the `Project URL` as `NEXT_PUBLIC_SUPABASE_URL`
5. Copy the `anon` public key as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
CLERK_SECRET_KEY=your_secret_key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features

- 🔐 Authentication with Clerk
- 📦 Supabase Database
- 🎨 Modern UI with Tailwind CSS
- 🚀 App Router Ready
- 🔄 Real-time Updates
- 📱 Responsive Design

## Project Structure

```
codeguide-starter/
├── app/                # Next.js app router pages
├── components/         # React components
├── utils/             # Utility functions
├── public/            # Static assets
├── styles/            # Global styles
├── documentation/     # Generated documentation from CodeGuide
└── supabase/          # Supabase configurations and migrations
```

## Documentation Setup

To implement the generated documentation from CodeGuide:

1. Create a `documentation` folder in the root directory:

   ```bash
   mkdir documentation
   ```

2. Place all generated markdown files from CodeGuide in this directory:

   ```bash
   # Example structure
   documentation/
   ├── project_requirements_document.md
   ├── app_flow_document.md
   ├── frontend_guideline_document.md
   └── backend_structure_document.md
   ```

3. These documentation files will be automatically tracked by git and can be used as a reference for your project's features and implementation details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# PasteDown - Markdown Paste Service

PasteDown is a simple, distraction-free Markdown paste service where users can create and share Markdown content via unique URLs.

## Features

- **Distraction-Free Editing**: Clean, minimal interface for writing Markdown content
- **Live Preview**: Real-time preview of your Markdown as you type
- **Unique URLs**: Each paste gets a short, unique URL for easy sharing
- **Auto-Expiration**: Pastes automatically expire after 3 days
- **No Edit After Submit**: Once submitted, pastes are locked and cannot be modified
- **Rate Limiting**: Basic protection against abuse (5 requests per hour per IP)
- **Responsive Design**: Works great on desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v20.2.1 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/adhishthite/PasteDown.git
   cd PasteDown
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Usage

1. **Creating a Paste**:

   - Navigate to the landing page
   - Type or paste your Markdown content in the editor
   - See the live preview on the right (or switch tabs on mobile)
   - Click "Create Paste" when you're done

2. **Sharing a Paste**:

   - After submission, you'll be redirected to a unique URL
   - Copy and share this URL with others
   - The recipient can view the rendered Markdown by visiting the URL

3. **Viewing a Paste**:
   - Visit the paste's unique URL (e.g., `https://pastedown.vercel.app/abc123`)
   - The Markdown will be rendered as HTML
   - Options to copy the content or share the URL are available

## Technical Implementation

- **Frontend**: Next.js 14 (App Router), TailwindCSS, ShadCN UI, TypeScript
- **Rendering**: React Markdown for Markdown parsing and rendering
- **Styling**: TailwindCSS for utility-first styling
- **UI Components**: ShadCN UI for accessible, customizable components
- **Animation**: Framer Motion for smooth transitions
- **Storage**: In-memory storage with simulated TTL for MVP (would use MongoDB in production)
- **ID Generation**: nanoid for generating unique, URL-friendly IDs
- **Deployment**: Vercel for hosting the application

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [ShadCN UI](https://ui.shadcn.com/) for the component library
- [React Markdown](https://github.com/remarkjs/react-markdown) for Markdown rendering
- [nanoid](https://github.com/ai/nanoid) for ID generation
