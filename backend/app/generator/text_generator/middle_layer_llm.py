from openai import OpenAI
from pathlib import Path
import dotenv
import os

dotenv.load_dotenv(dotenv_path=Path(".env"))


class MiddleLayerLLM:
    """
    Custom prompt layer for converting story scenes to image generation prompts.
    Provides full control over prompt engineering for visual consistency.
    """
    def __init__(self, model: str = "gpt-4-turbo-preview"):
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        self.model = model
        self.system_prompt = (
            "You are an expert at converting scenes from story text into highly detailed, "
            "visually rich prompts for an image generation model. Include details like characters' appearance, "
            "emotion, environment, and perspective. Make sure the description is consistent with prior context."
        )

    def generate_image_prompt(self, scene_text: str) -> str:
        """
        Generate an image prompt from story scene text.
        
        Args:
            scene_text: The story scene text to convert
            
        Returns:
            Detailed image generation prompt string
        """
        messages = [
            {"role": "system", "content": self.system_prompt},
            {"role": "user", "content": f"Generate an image prompt from the following story scene:\n\n{scene_text}"}
        ]
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
            temperature=0.8,
            max_tokens=300
        )

        return response.choices[0].message.content.strip()

