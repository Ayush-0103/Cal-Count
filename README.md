CalCount

CalCount is a lightweight calorie and nutrition estimation app that helps users quickly understand the nutritional value of their meals. It focuses on simplicity, speed, and clarity, making calorie awareness effortless without manual tracking or complex inputs.

Features

Calorie estimation for meals and dishes

Macronutrient breakdown (protein, carbohydrates, fats)

AI-powered nutrition analysis

Automated workflows using n8n

Clean and easy-to-use interface

How It Works (n8n + AI)

CalCount uses n8n as the core automation and AI orchestration platform.

User submits a meal (text or image)

Request is sent to an n8n workflow

n8n’s AI Agent node processes the input

A connected LLM model (via OpenRouter / OpenAI / Anthropic) analyzes the meal

Output is validated using Structured Output Parser

Structured nutrition data is returned to the app

This setup ensures reliable, consistent, and schema-safe nutrition outputs.

Use Case

CalCount is designed for users who want quick calorie awareness without maintaining detailed food logs. It helps users:

Understand calorie intake

Make healthier food choices

Balance macronutrients in daily meals

Tech Stack

Frontend: HTML / CSS / JavaScript (or React)

Automation & AI Orchestration: n8n

AI Models: LLMs via OpenRouter / OpenAI / Anthropic

Validation: n8n Structured Output Parser

Deployment: Web application

Setup

Clone the repository

git clone https://github.com/your-username/calcount.git


Navigate to the project directory

cd calcount


Install dependencies

npm install


Start the application

npm run dev


Run n8n locally or connect to n8n Cloud and import the CalCount workflow

Project Structure
CalCount/
├── public/
│   └── cc.png
├── src/
│   ├── components/
│   ├── pages/
│   └── utils/
├── n8n/
│   └── calcount-workflow.json
├── index.html
├── package.json
└── README.md

Future Enhancements

Image-based food analysis using vision models

Micronutrient insights

Meal history and trend tracking

Daily calorie goals and personalization

Disclaimer

CalCount provides estimated nutritional values for informational purposes only. It is not intended as medical or dietary advice.

License

MIT License
