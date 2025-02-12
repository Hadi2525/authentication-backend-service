from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import firebase_admin
from dotenv import load_dotenv
import pathlib

# Import your API router
from router import router

# Load the env file (for GOOGLE_APPLICATION_CREDENTIALS, etc.)
basedir = pathlib.Path(__file__).parents[1]
load_dotenv(basedir / ".env")

app = FastAPI()

# Include your API router under a prefix so it does not conflict with the frontend route
app.include_router(router, prefix="/api")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

firebase_admin.initialize_app()

# Mount the static directory so that files in /static are accessible via URL (e.g., /static/js/api.js)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up the templates directory for rendering HTML files
templates = Jinja2Templates(directory="templates")

# Serve the index.html file on the root URL
@app.get("/")
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

if __name__ == "__main__":
    import uvicorn
    print("Current App Name:", firebase_admin.get_app().project_id)
    uvicorn.run(app, host="localhost", port=8000)
