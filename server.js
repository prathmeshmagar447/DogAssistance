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
    const userMessage = req.body.message;

    try {
        const chatCompletion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: userMessage }],
        });
        res.json({ response: chatCompletion.choices[0].message.content });
    } catch (error) {
        console.error('Error generating content from OpenAI API:', error);
        res.status(500).json({ error: 'Failed to get response from AI.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
