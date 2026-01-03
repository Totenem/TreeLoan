# TreeLoan Frontend

Next.js frontend application for TreeLoan - Green project analysis platform.

## Overview

A modern, responsive web application built with Next.js 16, React 19, TypeScript, and Tailwind CSS. Users can upload project proposals, view green sustainability scores, and get funding recommendations.

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Set environment variable**
   ```bash
   # Set in docker-compose.yml or .env file
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. **Build and run with Docker Compose**
   ```bash
   # From project root
   docker-compose up frontend
   ```

   Or build and run standalone:
   ```bash
   docker build -t treeloan-frontend .
   docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 treeloan-frontend
   ```

### Local Development Setup

1. **Prerequisites**
   - Node.js 20+ 
   - npm or yarn

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env.local file in frontend/tree-loan directory
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📋 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | ✅ Yes | Backend API URL | - |

**Note**: In Next.js, environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## 🏗️ Project Structure

```
frontend/tree-loan/
├── app/
│   ├── page.tsx          # Home page
│   ├── layout.tsx        # Root layout
│   ├── globals.css       # Global styles
│   └── favicon.ico       # Favicon
├── components/
│   ├── UploadFile.tsx    # File upload component
│   └── ResultComponent.tsx  # Results display component
├── public/               # Static assets
├── package.json          # Dependencies and scripts
├── next.config.ts        # Next.js configuration
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.*     # Tailwind CSS configuration
└── Dockerfile           # Docker configuration
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4.x
- **Icons**: Lucide React
- **Build**: Next.js standalone output (for Docker)

## 🧩 Key Components

### UploadFile Component

Handles PDF file uploads with progress tracking and API communication.

**Features:**
- Drag and drop file upload
- Upload progress indicator
- File validation (PDF only)
- Error handling

### ResultComponent

Displays analysis results including:
- Green score visualization
- Project details
- Improvement suggestions with score impact
- Recommended funders with details

## 🔌 API Integration

The frontend communicates with the backend API:

- **Endpoint**: `POST /api/v1/green-analysis`
- **Request**: FormData with `proposal_file` (PDF)
- **Response**: JSON array with analysis results

See [Backend README](../backend/README.md) for API documentation.

## 🐳 Docker

### Build Image

```bash
docker build -t treeloan-frontend .
```

### Run Container

```bash
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=http://localhost:8000 treeloan-frontend
```

### Production Build

The Dockerfile uses Next.js standalone output mode for optimized production builds. The build process:

1. Installs dependencies
2. Builds the Next.js application
3. Creates a minimal production image with only necessary files
4. Runs as non-root user for security

## 🚀 Deployment

### Render

Configured for Render deployment via `render.yaml`. The frontend service will automatically:
- Build the Next.js application
- Set environment variables
- Connect to the backend service

### Other Platforms

- **Vercel**: Optimized for Next.js (recommended for frontend-only)
- **Netlify**: Supports Next.js with serverless functions
- **Any container platform**: Use the provided Dockerfile

### Environment Variables for Production

Set `NEXT_PUBLIC_API_URL` to your production backend URL:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

## 🔒 Security Considerations

- Environment variables with `NEXT_PUBLIC_` prefix are exposed to the browser
- Never put sensitive data in `NEXT_PUBLIC_*` variables
- API keys and secrets should only be in the backend
- CORS is handled by the backend API

## 📦 Dependencies

Key dependencies:
- `next` - React framework
- `react` & `react-dom` - UI library
- `typescript` - Type safety
- `tailwindcss` - Utility-first CSS
- `lucide-react` - Icon library

See `package.json` for complete list.

## 🛠️ Development Tips

### Hot Reload

Next.js provides fast refresh in development mode. Changes to components will hot-reload automatically.

### Type Safety

This project uses TypeScript. Always define proper types for:
- Component props
- API responses
- State variables

### Styling

- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and colors

## 📝 License


