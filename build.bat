@echo off
setlocal
cd /d "%~dp0"
echo ===========================================
echo       Wirex Launcher 2.0 Build Script
echo ===========================================

set "ROSLYN_CSC="
if exist "C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Current\Bin\Roslyn\csc.exe" (
    set "ROSLYN_CSC=C:\Program Files\Microsoft Visual Studio\18\Community\MSBuild\Current\Bin\Roslyn\csc.exe"
) else if exist "C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\Roslyn\csc.exe" (
    set "ROSLYN_CSC=C:\Program Files\Microsoft Visual Studio\2022\Community\MSBuild\Current\Bin\Roslyn\csc.exe"
) else if exist "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe" (
    set "ROSLYN_CSC=C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
)

if "%ROSLYN_CSC%"=="" (
    echo [ERROR] C# Compiler not found!
    exit /b 1
)

echo [INFO] Using C# Compiler: "%ROSLYN_CSC%"

if not exist "bin\Release" mkdir "bin\Release"

"%ROSLYN_CSC%" /target:winexe /optimize+ /platform:anycpu ^
    /out:bin\Release\WirexLauncher.exe ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Core.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.Drawing.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.IO.Compression.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\System.IO.Compression.FileSystem.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\WindowsBase.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\PresentationCore.dll" ^
    /r:"C:\Windows\Microsoft.NET\Framework64\v4.0.30319\WPF\PresentationFramework.dll" ^
    /r:"resources\Microsoft.Web.WebView2.Core.dll" ^
    /r:"resources\Microsoft.Web.WebView2.Wpf.dll" ^
    /res:resources\Microsoft.Web.WebView2.Core.dll ^
    /res:resources\Microsoft.Web.WebView2.Wpf.dll ^
    /res:resources\WebView2Loader.dll ^
    /res:resources\formatted.zip ^
    /win32icon:resources\wirex_icon.ico ^
    src\App.cs src\MainWindow.cs

if %ERRORLEVEL% EQU 0 (
    copy /y bin\Release\WirexLauncher.exe WirexLauncher.exe >nul
    echo.
    echo ===========================================
    echo [SUCCESS] WirexLauncher.exe built successfully!
    echo Output: bin\Release\WirexLauncher.exe and WirexLauncher.exe
    echo ===========================================
) else (
    echo.
    echo [FAIL] Build failed with exit code %ERRORLEVEL%
    exit /b %ERRORLEVEL%
)
