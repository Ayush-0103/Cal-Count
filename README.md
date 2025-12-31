<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
<body>

  <h1>CalCount</h1>

  <p>
    CalCount is a lightweight calorie and nutrition estimation app that helps users
    quickly understand the nutritional value of their meals. It focuses on simplicity,
    speed, and clarity, making calorie awareness effortless without manual tracking
    or complex inputs.
  </p>
  <p>
    <strong>Live Application:</strong>
    <a href="https://cal-count-rho.vercel.app/" target="_blank">
      https://cal-count-rho.vercel.app/
    </a>
  </p>

  <hr />

  <h2>Features</h2>
  <ul>
    <li>Calorie estimation for meals and dishes</li>
    <li>Macronutrient breakdown (protein, carbohydrates, fats)</li>
    <li>AI-powered nutrition analysis</li>
    <li>Automated workflows using n8n</li>
    <li>Clean and easy-to-use interface</li>
  </ul>

  <hr />

  <h2>How It Works (n8n + AI)</h2>
  <p>CalCount uses <strong>n8n</strong> as the core automation and AI orchestration platform:</p>
  <ol>
    <li>User submits a meal (text or image)</li>
    <li>Request is sent to an n8n workflow</li>
    <li>n8n’s AI Agent node processes the input</li>
    <li>A connected LLM model (via OpenRouter / OpenAI / Anthropic) analyzes the meal</li>
    <li>Output is validated using the Structured Output Parser</li>
    <li>Structured nutrition data is returned to the application</li>
  </ol>

  <hr />

  <h2>Use Case</h2>
  <p>
    CalCount is designed for users who want quick calorie awareness without maintaining
    detailed food logs. It helps users:
  </p>
  <ul>
    <li>Understand calorie intake</li>
    <li>Make healthier food choices</li>
    <li>Balance macronutrients in daily meals</li>
  </ul>

  <hr />

  <h2>Tech Stack</h2>
  <ul>
    <li>Frontend: HTML / CSS / JavaScript (or React)</li>
    <li>Automation & AI Orchestration: n8n</li>
    <li>AI Models: LLMs via OpenRouter / OpenAI / Anthropic</li>
    <li>Validation: n8n Structured Output Parser</li>
    <li>Deployment: Web application</li>
  </ul>

  <hr />

  <h2>Setup</h2>
  <pre>
git clone https://github.com/your-username/calcount.git
cd calcount
npm install
npm run dev
  </pre>

  <p>
    Run n8n locally or connect to n8n Cloud and import the CalCount workflow.
  </p>

  <hr />

  <h2>Project Structure</h2>
  <pre>
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
└── README.html
  </pre>

  <hr />

  <h2>Future Enhancements</h2>
  <ul>
    <li>Image-based food analysis using vision models</li>
    <li>Micronutrient insights</li>
    <li>Meal history and trend tracking</li>
    <li>Daily calorie goals and personalization</li>
  </ul>

  <hr />

  <h2>Disclaimer</h2>
  <p>
    CalCount provides estimated nutritional values for informational purposes only.
    It is not intended as medical or dietary advice.
  </p>

  <hr />

  <h2>License</h2>
  <p>MIT License</p>

</body>
</html>
