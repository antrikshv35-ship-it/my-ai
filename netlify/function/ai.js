    export async function handler(event) {
      const GROQ_API_KEY = process.env.GROQ_API_KEY;
      const body = JSON.parse(event.body);
      const userMsg = body.msg;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: userMsg }]
        })
      });

      const data = await response.json();
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
      };
    }
