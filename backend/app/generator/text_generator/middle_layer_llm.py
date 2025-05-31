from openai import OpenAI
from pathlib import Path
import dotenv

dotenv.load_dotenv(dotenv_path=Path("backend/.env"))  
class MiddleLayerLLM:
    def __init__(self, model="gpt-4.1"):
        self.client = OpenAI()
        self.model = model
        self.system_prompt = (
            "You are an expert at converting scenes from story text into highly detailed, "
            "visually rich prompts for an image generation model. Include details like characters' appearance, "
            "emotion, environment, and perspective. Make sure the description is consistent with prior context."
        )

    def generate_image_prompt(self, scene_text: str) -> str:
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

