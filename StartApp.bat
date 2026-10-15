@echo off
echo ============================================
echo   AI NutriTrack - Ultimate Startup Script
echo ============================================
echo.

echo [1/3] Cleaning up old processes so the terminal doesn't get stuck...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000') do taskkill /F /PID %%a 2>nul
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :5000') do taskkill /F /PID %%a 2>nul
timeout /t 2 /nobreak > nul

echo.
echo [2/3] Starting Backend Server (Port 5000)...
start "NutriTrack Backend" cmd /k "cd /d "%~dp0backend" && npm start"

echo.
echo [3/3] Starting Frontend App (Port 3000)...
timeout /t 3 /nobreak > nul
start "NutriTrack Frontend" cmd /k "cd /d "%~dp0frontend" && set DANGEROUSLY_DISABLE_HOST_CHECK=true&& set BROWSER=none&& set PORT=3000&& npm start"

echo.
echo ============================================
echo  All terminals have been launched!
echo.
echo  Website      : http://localhost:3000
echo  Admin Portal : http://localhost:3000/allusers
echo ============================================
echo.
pause
