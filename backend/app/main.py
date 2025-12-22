from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import generator_api
from db.db import init_db

app = FastAPI(
    title="StarWeaver API",
    description="Online novel and manga generation API",
    version="0.1.0"
)

# CORS configuration for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],  # Add production origins later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(generator_api.router, prefix="/api")


@app.on_event("startup")
async def startup_event():
    """Initialize database on application startup."""
    await init_db()
