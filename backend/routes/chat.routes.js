const express = require("express");
const router = express.Router();
const { chatBot, healthCheck } = require("./chat.controller");

// Health check endpoint
router.get("/health", healthCheck);

// Chat endpoint
router.post("/", chatBot);

module.exports = router;
