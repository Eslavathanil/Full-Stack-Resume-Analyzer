# Full-Stack Resume Analyzer

Upload PDF resumes, extract key info automatically, and get AI-driven feedback with Google Gemini.

## Features
- Upload resumes and extract contact info, skills, work experience, education
- AI rating, improvement suggestions & upskilling tips
- History tab to view and open past analyses

## Tech Stack
Frontend: React.js  
Backend: Node.js + Express.js  
Database: PostgreSQL  
AI: Google Gemini API  
PDF Parsing: pdf-parse  

## Setup
```bash
# Clone
git clone https://github.com/Eslavathanil/Full-Stack-Resume-Analyzer.git
cd Full-Stack-Resume-Analyzer

# Backend
cd backend
npm install
# add .env with DB + GOOGLE_API_KEY
node server.js

# Frontend
cd ../frontend
npm install
npm start
