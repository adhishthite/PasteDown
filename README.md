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

![PasteDown Logo](/app/icon.png)

PasteDown is a modern, distraction-free Markdown paste service where users can create and share Markdown content via unique URLs. It offers real-time previewing with enhanced Markdown support including math equations (KaTeX) and diagrams (Mermaid).

## ✨ Features

- **Distraction-Free Editing**: Clean, minimal interface for writing Markdown content
- **Live Preview**: Real-time preview of your Markdown as you type, with synchronized scrolling
- **Enhanced Markdown Support**:
  - Math equations via KaTeX
  - Diagrams via Mermaid
  - SmartyPants typography for smart quotes and dashes
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Unique URLs**: Each paste gets a short, unique URL for easy sharing
- **Auto-Expiration**: Pastes automatically expire after 3 days
- **Rate Limiting**: Protection against abuse (5 requests per hour per IP)
- **Dark/Light Mode**: Toggle between dark and light themes

## 🚀 Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Markdown Rendering**: [React Markdown](https://github.com/remarkjs/react-markdown)
- **Math Rendering**: [KaTeX](https://katex.org/) via rehype-katex
- **Diagram Rendering**: [Mermaid](https://mermaid.js.org/) via remark-mermaid-plugin
- **ID Generation**: [nanoid](https://github.com/ai/nanoid)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/)
- **Validation**: [Zod](https://zod.dev/)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v20+ recommended)
- npm, yarn, or pnpm

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
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## 📝 Usage

### Creating a Paste

1. Visit the landing page at [http://localhost:3000](http://localhost:3000)
2. Type or paste your Markdown content in the editor
3. View the live preview on the right (or switch tabs on mobile)
4. Click "Create Paste" when you're ready to share

### Viewing a Paste

- Visit the paste's unique URL (e.g., `http://localhost:3000/abc123`)
- The Markdown will be rendered as HTML
- Use the buttons to copy the content or share the URL

### Markdown Features

PasteDown supports standard Markdown syntax plus:

````markdown
# Math Equations (KaTeX)

$E = mc^2$

# Diagrams (Mermaid)

```mermaid
graph TD
    A[Start] --> B{Decision}
    B -->|Yes| C[Action]
    B -->|No| D[Another Action]
```
````

## 📊 Implementation Details

- Pastes are stored in-memory with simulated TTL for the MVP (would use MongoDB in production)
- Rate limiting is implemented to prevent abuse (5 requests per hour per IP)
- Responsive design adapts to different screen sizes:
  - Desktop: Side-by-side editor and preview
  - Mobile: Tab-based interface to switch between editor and preview
- Synchronized scrolling between editor and preview for better UX

## 🧩 Project Structure

```
PasteDown/
├── app/                   # Next.js App Router pages and API routes
│   ├── [id]/              # Dynamic paste viewing route
│   ├── api/               # API endpoints
│   │   └── paste/         # Paste creation and retrieval
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   └── ...                # Custom components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
├── public/                # Static assets
├── styles/                # Global styles
└── types/                 # TypeScript type definitions
```

## 🔮 Future Enhancements

- User accounts for paste management
- Custom expiration times
- Private pastes with password protection
- Syntax highlighting for code blocks
- Paste forking/versioning
- Real database integration (MongoDB)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the React framework
- [TailwindCSS](https://tailwindcss.com/) for the utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [React Markdown](https://github.com/remarkjs/react-markdown) for Markdown rendering
- [nanoid](https://github.com/ai/nanoid) for ID generation
- [KaTeX](https://katex.org/) for math equation rendering
- [Mermaid](https://mermaid.js.org/) for diagram rendering
