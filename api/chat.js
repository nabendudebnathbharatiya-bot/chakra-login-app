export default async function handler(req, res) {
  // শুধুমাত্র POST রিকোয়েস্ট গ্রহণ করবে
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;
  const apiKey = process.env.GROQ_API_KEY; // Vercel থেকে API Key নিচ্ছে

  try {
    // Groq API-তে ডেটা পাঠানো
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192', // আপনি চাইলে 'mixtral-8x7b-32768' ও ব্যবহার করতে পারেন
        messages: [
          { 
            role: 'system', 
            content: 'You are a friendly and helpful AI assistant for an online learning platform called Chakradham Online. Reply concisely and politely in Bengali.' 
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    
    // Groq-এর উত্তর ফ্রন্ট-এন্ডে পাঠানো
    res.status(200).json({ reply: data.choices[0].message.content });

  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to fetch response from AI' });
  }
}
