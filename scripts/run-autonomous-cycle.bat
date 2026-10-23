@echo off
REM ========================================================
REM AISaaSToolkit - Full Autonomous SEO & Monetization Daemon
REM Runs in background, publishes high-intent pages & deploys
REM ========================================================

cd /d "D:\Projects\aisaastoolkit"
if not exist "logs" mkdir logs

echo [=== %date% %time% ===] Starting Autonomous SEO Cycle >> logs\autonomous-seo.log
node scripts/autonomous-seo-engine.mjs --auto --deploy >> logs\autonomous-seo.log 2>&1
echo [=== %date% %time% ===] Autonomous SEO Cycle Completed >> logs\autonomous-seo.log
echo ---------------------------------------------------- >> logs\autonomous-seo.log
