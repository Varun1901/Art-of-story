# 🖼️ AI Story Crafter

Turn your images into captivating, genre-specific stories using the power of AI.

## 🚀 Project Overview

**Image-to-Story Forge** is a full-stack AI-powered web app that:
- Takes an uploaded image.
- Lets the user choose a genre (Fantasy, Sci-Fi, Romance, Thriller, Comedy).
- Generates a coherent story based on the image and selected genre.

## 🧠 Tech Stack

### Frontend
- React
- shadcn/ui for elegant UI components
- Tailwind CSS for styling
- Axios for API requests

### Backend
- FastAPI (Python)
- PIL for image processing
- OpenAI/LLM-based story generation logic
- MySQL (optional for storing logs/users)

## 📦 Features

- 🖼️ Image Upload
- 🎭 Genre Selection (Fantasy, Sci-Fi, Romance, Thriller, Comedy)
- 🧠 AI-based Story Generation

## 📁 Folder Structure

```
image-to-story-forge/
├── frontend/           # React app
│   ├── components/     # React components (UploadImage, StoryGenerator, etc.)
│   ├── App.jsx         # Main component
│   └── ...
├── backend/            # FastAPI app
│   ├── main.py         # FastAPI routes and logic
│   └── ...
```

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/Varun1901/Art-of-story.git
cd Art-of-story
```

### 2. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

### 3. Setup Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

> ⚠️ Make sure both backend (port 8000) and frontend (port 5173 or 3000) are running simultaneously.

## 🧪 Example Use

1. Upload an image.
2. Select a genre.
3. Click "Upload and Generate Story".
4. Enjoy a story tailored from your image!

## 🌟 Future Improvements

- User authentication and saved story history
- Improved story formatting and tone matching
- Mobile responsiveness
- Image enhancement preprocessing

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📜 License

[MIT](https://choosealicense.com/licenses/mit/)
