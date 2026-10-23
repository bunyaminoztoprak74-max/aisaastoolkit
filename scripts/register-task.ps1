# AISaaSToolkit Autonomous SEO & Affiliate Monetizer - Windows Scheduled Task Installer
# Runs silently in the background via wscript.exe -> run-silent.vbs -> node.exe

$taskName = "AISaaSToolkit_AutonomousSEO"
$vbsPath = "D:\Projects\aisaastoolkit\scripts\run-silent.vbs"

# Remove old task if present
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue

$action = New-ScheduledTaskAction -Execute "wscript.exe" -Argument "`"$vbsPath`""
# Runs every 6 hours indefinitely (4 times a day)
$trigger = New-ScheduledTaskTrigger -Once -At "03:00" -RepetitionInterval (New-TimeSpan -Hours 6) -RepetitionDuration (New-TimeSpan -Days 3650)
$settings = New-ScheduledTaskSettingsSet -AllowStartIfOnBatteries -DontStopIfGoingOnBatteries -StartWhenAvailable

Register-ScheduledTask -TaskName $taskName -Action $action -Trigger $trigger -Settings $settings -Description "Autonomous background SEO and affiliate content engine for aisaastoolkit.com" -Force

Write-Host "=========================================================="
Write-Host "✅ AUTONOMOUS TASK REGISTERED SUCCESSFULLY: $taskName"
Write-Host "   Schedule: Every 6 hours (Runs silently in background)"
Write-Host "=========================================================="
