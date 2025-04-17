# 🕵️‍♀️ OFAC Sanctions Screening Tool

A full-stack web app to search for individuals and entities listed in global sanctions databases using the OpenSanctions API.

## 🔧 Tech & Tools
- Frontend: React (Vite), CSS
- Backend: Flask (Python)
- API: OpenSanctions
- Deployment: Vercel (frontend), Render (backend)
- Others: Docker, GitHub

## 🚀 Live Links: 
[https://search-tool-frontend.vercel.app  ](https://search-tool-beta.vercel.app/)

## Demo Video 📹 
[Demo Video](Demo.mp4)

## 🛠️ Running Locally

# Backend
```
cd backend
pip install -r requirements.txt
echo OPENSANCTIONS_API_KEY=your_key > .env
python app.py
```

# Frontend
```
cd ../frontend
npm install
npm run dev
```

## 📄 Features
- Name search with filters (Individual, Entity, All)
- Paginated results (5 per page)
- Real-time API integration
- Clean, responsive UI
