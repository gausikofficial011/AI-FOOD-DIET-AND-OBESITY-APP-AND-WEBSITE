# AI Chatbot Backend Setup Guide

## Issues Fixed

### 1. ✅ Missing Health Check Endpoint
- **Problem**: Frontend was calling `/api/chat/health` but endpoint didn't exist
- **Solution**: Added health check endpoint that validates if the AI service is properly configured

### 2. ✅ Missing Environment Validation
- **Problem**: Chat controller would fail silently if `HF_API_KEY` wasn't set
- **Solution**: Added validation to check for API key before making requests, returns proper error messages

### 3. ✅ Inconsistent Response Format
- **Problem**: Response format didn't match frontend expectations (missing `success` and `error` fields)
- **Solution**: Implemented consistent response format:
  ```json
  {
    "success": true/false,
    "reply": "AI response text",
    "aiSource": "Hugging Face AI",
    "timestamp": "ISO date string",
    "error": "error message if failed"
  }
  ```

### 4. ✅ Missing Chat History
- **Problem**: Messages weren't being saved to database
- **Solution**: Added automatic chat message storage to MongoDB with user tracking

### 5. ✅ Better Error Handling
- **Problem**: Generic errors didn't help with debugging
- **Solution**: Added specific error messages for:
  - Missing API key
  - Authentication failures (invalid API key)
  - Service unavailability
  - Database errors (non-blocking)

## Required Setup

### Step 1: Create `.env` file in backend directory

```bash
cd backend
```

Create a file named `.env` with the following content:

```
# MongoDB connection
MONGODB_URI=mongodb://localhost:27017/nutritrack

# Hugging Face API Key (REQUIRED for chatbot)
HF_API_KEY=hf_YOUR_API_KEY_HERE

# Server port
PORT=5000

# Google Generative AI (for other features)
GEMINI_API_KEY=your_gemini_key_here
```

### Step 2: Get Hugging Face API Key

1. Visit: https://huggingface.co/settings/tokens
2. Create a new access token (read-only is fine)
3. Copy the token and paste it in the `.env` file as `HF_API_KEY`

### Step 3: Start the Backend

```bash
# Install dependencies (if not already done)
npm install

# Start the server
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on port 5000
📡 API available at http://localhost:5000/api
```

### Step 4: Test the Chatbot

The health check endpoint will now respond with:
```json
{
  "status": "ok",
  "ai": "NutriBot AI Assistant",
  "apiConfigured": true,
  "message": "AI service ready"
}
```

## Testing with curl

### Test Health Check
```bash
curl http://localhost:5000/api/chat/health
```

### Test Chat Endpoint
```bash
curl -X POST http://localhost:5000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are good foods for weight loss?",
    "userid": "user123"
  }'
```

Expected response:
```json
{
  "success": true,
  "reply": "AI generated response...",
  "aiSource": "Hugging Face AI",
  "timestamp": "2026-03-27T..."
}
```

## Troubleshooting

### Error: "AI service not configured"
- **Cause**: `HF_API_KEY` environment variable is missing
- **Fix**: Make sure `.env` file exists and contains `HF_API_KEY=hf_...`

### Error: "Authentication failed. Invalid HF_API_KEY"
- **Cause**: API key is incorrect or expired
- **Fix**: Generate a new token from https://huggingface.co/settings/tokens

### Error: "AI service temporarily unavailable"
- **Cause**: Hugging Face API is down or overloaded
- **Fix**: Wait a few moments and try again. The chatbot will still provide helpful fallback nutrition tips

### Chat messages not being saved to database
- **Cause**: Database connection issue
- **Fix**: Verify MongoDB is running and `MONGODB_URI` is correct
- **Note**: This is non-blocking - chat still works even if database save fails

## Files Modified

- ✏️ `/backend/routes/chat.controller.js` - Enhanced with error handling and database storage
- ✏️ `/backend/routes/chat.routes.js` - Added health check endpoint
- ✓ `/backend/models/Chat.js` - Already properly configured
- ✓ `/frontend/src/pages/Chatbot.js` - Now compatible with new endpoints

## Architecture

```
Frontend (Chatbot.js)
    ↓
    GET /api/chat/health  (checks if AI is ready)
    ↓
    POST /api/chat        (sends message)
    ↓
Backend (chat.controller.js)
    ├→ Validate HF_API_KEY
    ├→ Call Hugging Face API
    ├→ Save to MongoDB (Chat model)
    └→ Return response
```

## Next Steps (Optional Enhancements)

1. Add authentication middleware to protect chat endpoints
2. Implement rate limiting to prevent API abuse
3. Add chat history retrieval endpoint
4. Implement image analysis with chatbot responses
5. Add webhook for real-time chat updates
