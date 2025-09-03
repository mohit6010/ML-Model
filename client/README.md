# Fertilizer Recommendation Frontend

A modern React frontend for the Flask-based fertilizer recommendation ML system.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API endpoint:**
   ```bash
   cp .env.example .env
   # Edit .env to set VITE_API_BASE_URL if different from http://localhost:5000
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Make sure Flask backend is running:**
   ```bash
   # In the parent directory
   python main.py
   ```

## Configuration

### API Endpoints

The frontend expects these Flask endpoints:

- `POST /api/predict` - Get fertilizer recommendations
- `GET /api/report?jobId=...` - Download PDF report (optional)
- `GET /pdf.pdf` - Fallback PDF download

### Environment Variables

Create a `.env` file from `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### CORS Setup

If you encounter CORS issues, add this to your Flask app:

```python
from flask_cors import CORS
CORS(app, resources={r"/api/*": {"origins": "*"}})
```

## Features

- **Responsive Design**: Works on desktop, tablet, and mobile
- **Form Validation**: Client-side validation with helpful error messages
- **Real-time Feedback**: Loading states and error handling
- **PDF Reports**: Download detailed recommendations
- **Accessibility**: Keyboard navigation and screen reader support

## Tech Stack

- React 18 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- React Router for navigation
- React Hook Form + Zod for validation
- Lucide React for icons

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and API client
└── styles/        # Global styles
```