require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Optional sanity check endpoint
app.get('/', (req, res) => {
  res.send('🧠 Pyramid AI Server is live.');
});

app.post('/api/ai', async (req, res) => {
  try {
    const { agent, term, symbol } = req.body;

    const prompt = `You are Agent ${agent}, an AI embedded in a quantum grid interface. 
    A user clicked a cell associated with the term "${term}" and the symbol "${symbol}". 
    Provide a one-sentence paranormal interpretation or advanced physics insight.`;

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a mystical GPT agent generating symbolic insights for a quantum interface.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.9
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });

  } catch (error) {
    console.error('❌ AI error:', error.response?.data || error.message);
    res.status(500).json({ error: 'AI service error' });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🔥 Pyramid AI Server running on port ${PORT}`));
