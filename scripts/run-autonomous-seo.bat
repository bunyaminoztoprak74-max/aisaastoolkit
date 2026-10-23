@echo off
REM ========================================================
REM AISaaSToolkit - Autonomous SEO & Affiliate Monetizer
REM Runs the autonomous engine, builds and deploys to Vercel
REM ========================================================

cd /d "D:\Projects\aisaastoolkit"
echo [1/3] Checking Autonomous SEO Engine Status...
node scripts/autonomous-seo-engine.mjs --status

echo.
echo [2/3] Executing Next High-Intent SEO Monetization Cycle...
node scripts/autonomous-seo-engine.mjs --auto

echo.
echo [3/3] Done. Check output above.
pause
