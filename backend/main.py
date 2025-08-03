from fastapi import FastAPI, Depends, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas, auth
from auth import get_db, create_user, authenticate_user
import os, uuid, shutil
from dotenv import load_dotenv
from PIL import Image
import io

# Gemini
import google.generativeai as genai

# Load environment variables
load_dotenv()
gemini_api_key = os.getenv("GEMINI_API_KEY")
if gemini_api_key:
    genai.configure(api_key=gemini_api_key)
else:
    print("Warning: GEMINI_API_KEY not found in environment variables")

app = FastAPI()

# Allow frontend (React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Default Vite port
        "http://localhost:8080",  # Alternative Vite port
        "http://localhost:8081",  # Current frontend port
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
        "http://127.0.0.1:8081",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running"}

@app.post("/signup")
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    new_user = create_user(user, db)
    return {"message": "User created successfully", "user": new_user.username}

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    existing_user = authenticate_user(user.username, user.password, db)
    if not existing_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {"message": "Login successful", "user": existing_user.username}

@app.post("/upload-image")
def upload_image(file: UploadFile = File(...)):
    os.makedirs("uploaded_images", exist_ok=True)

    file_ext = file.filename.split('.')[-1]
    unique_name = f"{uuid.uuid4()}.{file_ext}"
    file_path = f"uploaded_images/{unique_name}"

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"message": "Image uploaded", "filename": unique_name}

@app.post("/generate-story")
def generate_story(filename: str = Form(...), genre: str = Form(...)):
    image_path = f"uploaded_images/{filename}"

    if not os.path.exists(image_path):
        raise HTTPException(status_code=404, detail="Image not found")

    # Check if Gemini API key is configured
    if not os.getenv("GEMINI_API_KEY"):
        raise HTTPException(status_code=500, detail="Gemini API key not configured. Please set GEMINI_API_KEY in your .env file.")

    try:
        # Read image and load as PIL
        with open(image_path, "rb") as img_file:
            image_bytes = img_file.read()
        image = Image.open(io.BytesIO(image_bytes))

        # Optimize image size for faster processing
        # Resize if image is too large (max 1024px on longest side)
        max_size = 1024
        if max(image.size) > max_size:
            ratio = max_size / max(image.size)
            new_size = tuple(int(dim * ratio) for dim in image.size)
            image = image.resize(new_size, Image.Resampling.LANCZOS)

        # Use Gemini 1.5 Flash with optimized settings
        model = genai.GenerativeModel("models/gemini-1.5-flash-latest")
        
        # More specific and efficient prompt
        prompt = f"""Create a captivating {genre} story (150-200 words) inspired by this image. 
        Focus on the visual elements, mood, and atmosphere. Make it engaging and creative."""

        # Add generation config for faster response
        generation_config = {
            "temperature": 0.7,
            "top_p": 0.8,
            "top_k": 40,
            "max_output_tokens": 500,  # Limit output for faster generation
        }

        response = model.generate_content(
            [image, prompt],
            generation_config=generation_config
        )
        
        story = response.text.strip()

        return {
            "message": "Story generated successfully",
            "genre": genre,
            "story": story
        }

    except Exception as e:
        print(f"Error generating story: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Story generation failed: {str(e)}")