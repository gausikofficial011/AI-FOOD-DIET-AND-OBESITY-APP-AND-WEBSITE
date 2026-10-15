@echo off
echo Testing the frontend build to find the exact error...
cd /d "c:\ProjectAI\frontend"
npm run build > build_error_log.txt 2>&1
echo Done! The error has been captured.
pause
