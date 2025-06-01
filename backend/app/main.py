from fastapi import FastAPI
from app.api import generator_api

app = FastAPI()
app.include_router(generator_api.router, prefix="/api")

