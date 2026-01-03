# TreeLoan 🌱

**Greener Lending Platform** - Analyze projects and get instant green sustainability scores with AI-powered environmental impact evaluation and funding opportunities.

## Overview

TreeLoan is a full-stack application that helps evaluate the environmental sustainability of projects and connects them with potential green funders. Upload a project proposal PDF, and get instant analysis including green scores, improvement suggestions, and recommended funding partners.

## ✨ Key Features

1. **Green Score Engine**
   - AI-powered LLM scans project proposals, loan applications, and certifications
   - Assigns a sustainability score based on eco-friendliness (renewable energy, carbon reduction, sustainable materials)
   - Minimum score threshold: 20/100

2. **Funding Estimator**
   - Estimates potential funding amounts based on the green score
   - Higher scores = better loan terms and higher funding potential

3. **Improvement Suggestions**
   - Highlights weak areas in the project
   - Provides actionable eco-upgrades to increase the green score
   - Shows score impact for each suggestion

4. **Recommended Funders**
   - Suggests lenders, NGOs, and green investment firms
   - Matches projects with the most suitable funding partners
   - Includes company descriptions and estimated investment ranges

5. **Project Analysis**
   - Extracts project details (title, description, location, type)
   - Categorizes projects into sustainability types
   - Generates comprehensive analysis reports

## 🏗️ Architecture

- **Frontend**: Next.js 16 (React 19, TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python 3.11)
- **AI/LLM**: Groq API with Llama models
- **Deployment**: Docker Compose (local) / Render (production)

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose installed
- Groq API key ([Get one here](https://console.groq.com/keys))

### Running with Docker Compose (Recommended)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd TreeLoan-1
   ```

2. **Set up environment variables**
   ```bash
   # Create backend/.env file
   cd backend
   cp .env.example .env  # Or create .env manually
   ```
   
   Add your Groq API key to `backend/.env`:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   LOCAL_ORIGIN=http://localhost:3000
   DOCKER_ORIGIN=http://frontend:3000
   ```

3. **Start the application**
   ```bash
   # From project root
   docker-compose up
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Running Locally (Development)

See individual README files:
- [Backend README](./backend/README.md) - For backend setup
- [Frontend README](./frontend/tree-loan/README.md) - For frontend setup

## 📁 Project Structure

```
TreeLoan-1/
├── backend/           # FastAPI backend service
│   ├── index.py      # Main FastAPI application
│   ├── services/     # LLM integration services
│   ├── models/       # Pydantic models
│   ├── utils/        # Helper functions and utilities
│   └── Dockerfile    # Backend Docker configuration
│
├── frontend/         # Next.js frontend application
│   └── tree-loan/
│       ├── app/      # Next.js app directory
│       ├── components/  # React components
│       └── Dockerfile   # Frontend Docker configuration
│
├── docker-compose.yml  # Docker Compose configuration
└── render.yaml        # Render deployment blueprint
```

## 🌐 Deployment

### Render Deployment

The project includes a `render.yaml` blueprint for easy deployment on Render:

1. Push your code to GitHub
2. Connect your repository to Render
3. Render will automatically detect `render.yaml` and create services
4. Set environment variables in Render dashboard:
   - `GROQ_API_KEY` (backend service)
   - `PRODUCTION_ORIGIN` (backend service - your frontend URL)

See [Render Blueprint Documentation](https://render.com/docs/blueprint-spec) for details.

## 🔧 Environment Variables

### Backend
- `GROQ_API_KEY` (required) - Your Groq API key
- `LOCAL_ORIGIN` (optional) - Local development frontend URL (default: http://localhost:3000)
- `DOCKER_ORIGIN` (optional) - Docker internal frontend URL
- `PRODUCTION_ORIGIN` (optional) - Production frontend URL

### Frontend
- `NEXT_PUBLIC_API_URL` (required) - Backend API URL

## 📚 API Documentation

Once the backend is running, visit:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## 🛠️ Development

### Docker Commands

```bash
# Start services
docker-compose up

# Start in detached mode
docker-compose up -d

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

## 📝 License



## 🤝 Contributing



## 📧 Contact

- GitHub: [Totenem/TreeLoan](https://github.com/Totenem/TreeLoan)
