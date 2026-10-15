const Chat = require('../models/Chat');

// Health check endpoint
const healthCheck = async (req, res) => {
  try {
    const hasApiKey = !!process.env.HF_API_KEY;
    res.json({
      status: "ok",
      ai: "NutriBot AI Assistant",
      apiConfigured: hasApiKey,
      message: hasApiKey ? "AI service ready" : "Warning: HF_API_KEY not configured"
    });
  } catch (err) {
    console.error("Health check error:", err);
    res.status(500).json({ 
      status: "error",
      message: "Health check failed" 
    });
  }
};

const chatBot = async (req, res) => {
  try {
    const { message, userid } = req.body;
    
    if (!message) {
      return res.status(400).json({ 
        success: false,
        error: "Message is required" 
      });
    }

    // Check if API key is configured
    if (!process.env.HF_API_KEY) {
      console.error("❌ HF_API_KEY not configured");
      return res.status(503).json({
        success: false,
        error: "AI service not configured. Please set HF_API_KEY environment variable."
      });
    }

    console.log("📩 Received message:", { message, userid });

    // Call Hugging Face Inference API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/flan-t5-base",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.HF_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            do_sample: true,
          }
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HF API Error:", response.status, errorText);
      
      // Check if it's an API key issue
      if (response.status === 401 || response.status === 403) {
        return res.status(503).json({
          success: false,
          error: "Authentication failed. Invalid HF_API_KEY."
        });
      }
      
      return res.status(503).json({ 
        success: false,
        error: `AI service temporarily unavailable (${response.status})`
      });
    }

    const data = await response.json();
    
    let reply = "I couldn't generate a response.";
    
    // Handle different response formats from HF API
    if (Array.isArray(data) && data[0]?.generated_text) {
      reply = data[0].generated_text;
    } else if (data?.generated_text) {
      reply = data.generated_text;
    } else if (data?.error) {
      reply = `Model error: ${data.error}`;
    } else if (typeof data === 'string') {
      reply = data;
    }

    console.log("✅ Response from HF:", { message, reply: reply.substring(0, 100) });

    // Store chat message in database if userid is provided
    if (userid) {
      try {
        let chatSession = await Chat.findOne({ user: userid });
        
        if (!chatSession) {
          chatSession = new Chat({
            user: userid,
            messages: [],
            title: 'Nutrition Chat'
          });
        }

        // Add user message
        chatSession.messages.push({
          role: 'user',
          content: message,
          timestamp: new Date(),
          source: 'user'
        });

        // Add bot response
        chatSession.messages.push({
          role: 'assistant',
          content: reply,
          timestamp: new Date(),
          source: 'ai'
        });

        chatSession.updatedAt = new Date();
        await chatSession.save();
        console.log("💾 Chat saved to database");
      } catch (dbErr) {
        console.error("⚠️ Error saving chat to database:", dbErr);
        // Don't fail the response - still return the reply
      }
    }

    res.json({ 
      success: true,
      reply: reply,
      aiSource: "Hugging Face AI",
      timestamp: new Date().toISOString()
    });
    
  } catch (err) {
    console.error("❌ Chatbot error:", err);
    res.status(500).json({ 
      success: false,
      error: "Chatbot service error. Please try again later.",
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
};

module.exports = { chatBot, healthCheck };