import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

const apiReviewFeedback = async (message) => {
    const prompt = `
    
    'Here's the text to correct: ${message}

    Review this text and find errors in spelling, grammar, or style. Highlight the errors using [[h]] to start and [[\h]] to end the highlight. Provide feedback as a JSON with the corrected text and a feedback array. The array should include error type, correction, and explanation for each error.

    Here's the format to use:
    {
      "text": "CORRECTED TEXT",
      "feedback": [
        ["ERROR TYPE", "CORRECTION", "EXPLANATION"],
        ...
      ]
    }

    Don't skip any errors. Each highlighted section should have unique feedback. Only highlight errors and don't include any extra spaces. Don't add anything to the text except highlighting.`;

    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 2048
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const responseData = await response.json();
    return responseData.choices[0].text.trim();
};

const apiRespond = async (message) => {
    const prompt = `
    
    'Here's the text that I recieved: ${message} How shall I respond?.`;

    const response = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            max_tokens: 1024
        })
    });

    if (!response.ok) {
        throw new Error('API request failed');
    }

    const responseData = await response.json();
    return responseData.choices[0].text.trim();
};

app.post('/api/review-feedback', async (req, res) => {
    try {
        const message = req.body.message;
        const result = await apiReviewFeedback(message);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/respond', async (req, res) => {
    try {
        const message = req.body.message;
        const result = await apiRespond(message);
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
