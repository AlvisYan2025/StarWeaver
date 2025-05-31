from openai import OpenAI
import dotenv

dotenv.load_dotenv(dotenv_path=Path("backend/.env"))
client = OpenAI()

def generate_next_chunk(previous_text: str, genre: str = "fantasy", style: str = "descriptive", max_tokens: int = 200) -> str:
    """
        previous_text (str): The story text generated so far.
        genre (str): The genre of the story (e.g., 'sci-fi', 'romance').
        style (str): The writing style to emulate (e.g., 'descriptive', 'dialogue-heavy').
        max_tokens (int): The maximum number of tokens to generate.
    """
    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {
                "role": "system",
                "content": f"You are a skilled {genre} novelist. Write in a vivid, {style} style with strong character voice and plot consistency."
            },
            {
                "role": "developer",
                "content": "Ensure the story flows naturally from the last paragraph. Avoid repetition. Think like a novelist planning the next scene."
            },
            {
                "role": "user",
                "content": f"Here's the story so far:\n\n{previous_text}\n\nContinue the story with the next paragraph:"
            }
        ],
        max_tokens=max_tokens,
        temperature=0.9,
        top_p=0.95,
        presence_penalty=0.6,
        frequency_penalty=0.5,
    )
    return response.choices[0].message.content.strip()

def describe_scene(previous_text: str) -> dict:
    response = client.chat.completions.create(
        model="gpt-4.1",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a visual narrator. Your job is to extract detailed visual descriptions from a story to help an artist illustrate it. "
                    "Focus on describing the setting (scene) and the characters (appearance, clothing, emotions, actions)."
                )
            },
            {
                "role": "user",
                "content": (
                    f"Here is the current story:\n\n{previous_text}\n\n"
                    "Please describe:\n"
                    "1. The scene (location, time of day, atmosphere, environment)\n"
                    "2. The characters present (names if known, appearance, clothing, emotions, actions)\n\n"
                    "Return each as a paragraph under 'scene_description' and 'character_description'."
                )
            }
        ],
        temperature=0.7,
        max_tokens=300,
    )

    content = response.choices[0].message.content.strip()
    scene_desc = ""
    char_desc = ""
    if "Scene description:" in content:
        parts = content.split("Scene description:")
        if "Character description:" in parts[1]:
            scene_desc, char_desc = parts[1].split("Character description:")
        else:
            scene_desc = parts[1]
    elif "Characters:" in content:
        parts = content.split("Characters:")
        scene_desc, char_desc = parts[0], parts[1]

    return {
        "scene_description": scene_desc.strip(),
        "character_description": char_desc.strip()
    }
