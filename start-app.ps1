Write-Host "Starting Image to Story Forge..." -ForegroundColor Green
Write-Host ""
Write-Host "This will start both the backend and frontend servers." -ForegroundColor Yellow
Write-Host "Backend will run on http://localhost:8000" -ForegroundColor Cyan
Write-Host "Frontend will run on http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop both servers." -ForegroundColor Red
Write-Host ""

try {
    npm run dev:full
} catch {
    Write-Host "Error starting the application: $_" -ForegroundColor Red
    Write-Host "Please ensure you have installed all dependencies:" -ForegroundColor Yellow
    Write-Host "1. Run 'npm install' for frontend dependencies" -ForegroundColor White
    Write-Host "2. Run 'pip install -r backend/requirements.txt' for backend dependencies" -ForegroundColor White
} 