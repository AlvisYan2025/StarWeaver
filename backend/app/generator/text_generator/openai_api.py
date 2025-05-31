from openai import OpenAI
import dotenv

dotenv.load_dotenv(dotenv_path=Path("backend/.env"))
client = OpenAI()

completion = client.chat.completions.create(
    model="gpt-4.1",
    messages=[
        {
            "role": "developer",
            "content": "Talk like a pirate."
        },
        {
            "role": "user",
            "content": "Write a one-sentence bedtime story about a unicorn."
        }
    ]
)
