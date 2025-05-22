### generator.py
import openai
from memory_manager import MemoryManager

class StoryGenerator:
    def __init__(self, api_key, memory_manager: MemoryManager):
        openai.api_key = api_key
        self.memory_manager = memory_manager

    def build_prompt(self, current_prompt, involved_characters):
        structured = self.memory_manager.structured_memory
        memory_snippets = self.memory_manager.retrieve_relevant_snippets(current_prompt)
        character_info = "\n".join([
            f"{char}: {structured[char]['personality']}, {structured[char]['current_goal']}, Status: {structured[char]['status']}"
            for char in involved_characters if char in structured
        ])
        memory_text = "\n".join(memory_snippets)
        final_prompt = f"CHARACTER MEMORY:\n{character_info}\n\nPAST EVENTS:\n{memory_text}\n\nSCENE SETUP:\n{current_prompt}\n\nSTORY CONTINUATION:".strip()
        return final_prompt

    def generate_story(self, current_prompt, involved_characters, model="gpt-4", temperature=0.8):
        prompt = self.build_prompt(current_prompt, involved_characters)
        response = openai.ChatCompletion.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            temperature=temperature
        )
        return response.choices[0].message['content']