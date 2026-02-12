@echo off
echo ========================================
echo Placement Notification App - Setup
echo ========================================
echo.

echo [1/3] Installing Backend Dependencies...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Backend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [2/3] Installing Frontend Dependencies...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Frontend installation failed!
    pause
    exit /b 1
)
cd ..

echo.
echo [3/3] Setting up environment files...
if not exist backend\.env (
    copy backend\.env.example backend\.env
    echo Created backend\.env - Please configure it!
)
if not exist frontend\.env (
    copy frontend\.env.example frontend\.env
    echo Created frontend\.env
)

echo.
echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next Steps:
echo 1. Setup MySQL database (run backend/database/schema.sql)
echo 2. Configure backend/.env with your credentials
echo 3. Run: cd backend ^&^& npm run dev
echo 4. Run: cd frontend ^&^& npm start
echo.
pause
