from fastapi import Request, FastAPI
from .models import generator

app = FastAPI()

@app.get("/")
async def main():
    return "POST a message with a JSON document that has a 'question' key."

@app.post("/")
async def ask_question(request: Request):
    data = await request.json()
    question = data["question"]

    print(f'Arrived question: {question}')

    answer = generator(question, max_length=200, num_return_sequences=1, truncation=True)[0]['generated_text']

    if answer.startswith(question):
        answer = answer[len(question):].strip()

    print(f'Generated answer: {answer}')

    return answer