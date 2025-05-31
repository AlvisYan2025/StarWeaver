from fastapi import APIRouter, HTTPException
from app.schemas.generation import GenerateRequest, GenerateResponse
from app.services.generate_pipeline import generate_manga_scene

router = APIRouter()


@router.get("/generate-text", response_model=GenerateResponse)
async def generate_text(req: GenerateRequest):
    pass


@router.post("/generate-manga", response_model=GenerateResponse)
async def generate_manga(req: GenerateRequest):
    """
    Given a prompt, generate a story and corresponding images.
    """
    try:
        result = await generate_manga_scene(req.prompt, req.style)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/retrieve-story")
async def retrieve_story(req: GenerateRequest):
    """
    Given a story id, retrieve the story and corresponding images.
    """
    pass

@router.post("/save-story")
async def save_story(req: GenerateRequest):
    """
    Given a story id, save the story and corresponding images.
    """
    pass

@router.post("/delete-story")
async def delete_story(req: GenerateRequest):
    """
    Given a story id, delete the story and corresponding images.
    """
    pass    

@router.post("/list-stories")
async def list_user_stories(req: GenerateRequest):
    """
    List all stories.
    """
    pass        

@router.post("/list-community-styles")
async def list_community_styles(req: GenerateRequest):
    """
    List all community stories 
    """
    pass

