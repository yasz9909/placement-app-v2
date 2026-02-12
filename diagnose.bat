@echo off
echo ========================================
echo Placement Portal Diagnostic Check
echo ========================================
echo.

echo [1] Checking Backend Port 5000...
netstat -ano | findstr :5000
if %errorlevel% equ 0 (
    echo ✓ Backend is running
) else (
    echo ✗ Backend is NOT running
    echo   Fix: cd backend ^&^& npm start
)
echo.

echo [2] Checking Frontend Port 3000...
netstat -ano | findstr :3000
if %errorlevel% equ 0 (
    echo ✓ Frontend is running
) else (
    echo ✗ Frontend is NOT running
    echo   Fix: cd frontend ^&^& npm start
)
echo.

echo [3] Testing Backend Health...
curl -s http://localhost:5000/health
echo.

echo [4] Checking .env Configuration...
if exist backend\.env (
    echo ✓ backend\.env exists
    findstr /C:"GOOGLE_CLIENT_ID" backend\.env
    findstr /C:"MONGODB_URI" backend\.env
) else (
    echo ✗ backend\.env missing
)
echo.

echo ========================================
echo Next Steps:
echo 1. Both servers must be running
echo 2. Open http://localhost:3000
echo 3. Press F12 to open DevTools Console
echo 4. Try Google login and check console logs
echo ========================================
pause
