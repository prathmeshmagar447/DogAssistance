require('dotenv').config();
const express = require('express');
const OpenAI = require('openai');
const path = require('path');

const app = express();
const port = 3000;

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
    console.error('OPENAI_API_KEY is not set in .env file');
    process.exit(1);
}

const openai = new OpenAI({
    apiKey: API_KEY,
});

app.use(express.json());
app.use(express.static(path.join(__dirname)));

app.post('/chat', async (req, res) => {
    console.log('Received chat request!'); // Added for debugging
    const { messages } = req.body; // Expecting an array of messages

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'system',
                    content: 'You are DoggyBot, an AI-powered chatbot dedicated to dog assistance. Provide comprehensive information, practical advice, and engaging content covering various aspects of dogs, including their care, behavior, training, and general facts. Maintain a friendly, encouraging, and knowledgeable tone. Always stay on topic about dogs.'
                },
                ...messages
            ],
        });
        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating content from OpenAI API:', error.message || error); // Log full error
        res.status(500).json({ error: 'Failed to get response from AI.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
