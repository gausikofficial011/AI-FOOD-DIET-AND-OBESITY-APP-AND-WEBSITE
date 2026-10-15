@echo off
echo Starting frontend and capturing logs...
cd /d "c:\ProjectAI\frontend"
set BROWSER=none
npm start > frontend_debug.txt 2>&1
