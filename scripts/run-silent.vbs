Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "D:\Projects\aisaastoolkit"
WshShell.Run "cmd.exe /c ""D:\Projects\aisaastoolkit\scripts\run-autonomous-cycle.bat""", 0, True
Set WshShell = Nothing
