export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key is missing' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', 
        messages: [
          { 
            role: 'system', 
            content: 'You are a helpful assistant for Chakradham Online.' 
          },
          { role: 'user', content: message }
        ]
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("Groq API Error Response:", errorText);
        throw new Error(`Groq API Error: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).json({ error: error.message || 'Failed to fetch response' });
  }
            }
