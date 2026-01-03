# TreeLoan Backend API

FastAPI backend service for TreeLoan - Green project analysis and funding recommendations.

## Overview

The backend provides a REST API for analyzing project proposals, calculating green sustainability scores, and recommending funding partners using AI/LLM technology.

## 🚀 Quick Start

### Using Docker (Recommended)

1. **Create environment file**
   ```bash
   # Create backend/.env file
   GROQ_API_KEY=your_groq_api_key_here
   LOCAL_ORIGIN=http://localhost:3000
   DOCKER_ORIGIN=http://frontend:3000
   ```

2. **Build and run with Docker Compose**
   ```bash
   # From project root
   docker-compose up backend
   ```

   Or build and run standalone:
   ```bash
   docker build -t treeloan-backend .
   docker run -p 8000:8000 --env-file .env treeloan-backend
   ```

### Local Development Setup

1. **Prerequisites**
   - Python 3.11+
   - pip

2. **Install dependencies**
   ```bash
   # Create virtual environment
   python -m venv .venv

   # Activate virtual environment
   # Windows:
   .venv\Scripts\activate
   # Linux/Mac:
   source .venv/bin/activate

   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in backend directory
   GROQ_API_KEY=your_groq_api_key_here
   LOCAL_ORIGIN=http://localhost:3000
   ```

4. **Run the server**
   ```bash
   uvicorn index:app --reload --host 0.0.0.0 --port 8000
   ```

   The API will be available at: http://localhost:8000

## 📋 Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `GROQ_API_KEY` | ✅ Yes | Groq API key for LLM services | - |
| `LOCAL_ORIGIN` | No | Local development frontend URL | `http://localhost:3000` |
| `DOCKER_ORIGIN` | No | Docker internal frontend URL | - |
| `PRODUCTION_ORIGIN` | No | Production frontend URL | - |

## 📡 API Endpoints

### Health Check

**GET** `/`

Check if the API is running.

**Response:**
```json
{
  "message": "working"
}
```

### Green Analysis

**POST** `/api/v1/green-analysis`

Analyze a project proposal PDF and get green score, suggestions, and funder recommendations.

**Request:**
- Content-Type: `multipart/form-data`
- Body: `proposal_file` (PDF file)

**Response:**
```json
[
  {
    "project_title": "Solar Energy Project",
    "project_description": "...",
    "project_location": "California, USA",
    "project_type": "Renewable Energy",
    "potential_funding": "1000000 - 5000000",
    "green_score": 85,
    "suggestions": ["Switch to more efficient panels", ...],
    "score_impact": [10, 5, ...],
    "recommended_funders": ["Green Energy Fund", ...],
    "company_website": ["https://...", ...],
    "company_description": ["...", ...],
    "estimated_investment": ["1M - 5M", ...]
  }
]
```

**Error Response:**
If green score < 20:
```json
{
  "error": "The project is not green enough, please improve the project to increase the green score."
}
```

## 📚 API Documentation

Interactive API documentation is available when the server is running:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🏗️ Project Structure

```
backend/
├── index.py              # Main FastAPI application
├── services/
│   └── llm_usage.py     # Groq LLM integration and analysis functions
├── models/
│   └── model.py         # Pydantic data models
├── utils/
│   ├── helpers.py       # Utility functions (PDF parsing, data processing)
│   └── green_vc_funders.csv  # Database of green funders
├── requirements.txt     # Python dependencies
├── Dockerfile          # Docker configuration
└── .env               # Environment variables (create this)
```

## 🔧 Development

### Running Tests

```bash
# Install test dependencies (if any)
pip install pytest pytest-cov

# Run tests
pytest
```

### Code Style

This project uses Python standard formatting. Consider using:
- `black` for code formatting
- `flake8` or `pylint` for linting

### Adding New Endpoints

1. Add route handler in `index.py`
2. Create/update Pydantic models in `models/model.py` if needed
3. Add business logic in `services/` or `utils/`
4. Update this README with endpoint documentation

## 🐳 Docker

### Build Image

```bash
docker build -t treeloan-backend .
```

### Run Container

```bash
docker run -p 8000:8000 --env-file .env treeloan-backend
```

### Development with Docker

```bash
# Build with cache
docker build -t treeloan-backend .

# Run with volume mount for hot reload (development)
docker run -p 8000:8000 \
  --env-file .env \
  -v $(pwd):/app \
  treeloan-backend \
  uvicorn index:app --reload --host 0.0.0.0 --port 8000
```

## 🔒 Security Notes

- Never commit `.env` file to version control
- Keep API keys secure
- CORS is configured for specific origins
- The application runs as a non-root user in Docker

## 📦 Dependencies

Key dependencies:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `groq` - Groq API client
- `langchain` - LLM orchestration
- `PyMuPDF` (fitz) - PDF processing
- `pandas` - Data processing
- `python-dotenv` - Environment variable management

See `requirements.txt` for complete list.

## 🚀 Deployment

### Render

The backend is configured for Render deployment via `render.yaml`. Ensure environment variables are set in the Render dashboard.

### Other Platforms

The Dockerfile can be used to deploy to any container platform:
- AWS ECS/Fargate
- Google Cloud Run
- Azure Container Apps
- Heroku (with Docker support)
- DigitalOcean App Platform


