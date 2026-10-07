using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.ComponentModel;
using System.Diagnostics;
using System.IO;
using System.IO.Compression;
using System.Net;
using System.Net.Security;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Interop;
using System.Windows.Media;
using Microsoft.Web.WebView2.Core;
using Microsoft.Web.WebView2.Wpf;

namespace WirexClientLauncher
{
    public class MainWindow : Window
    {
        private const int WM_NCLBUTTONDOWN = 0xA1;
        private const int HT_CAPTION = 0x2;

        [DllImport("user32.dll")]
        public static extern bool ReleaseCapture();

        [DllImport("user32.dll")]
        public static extern IntPtr SendMessage(IntPtr hWnd, int Msg, IntPtr wParam, IntPtr lParam);

        private WebView2 webView;
        private HttpListener httpListener;
        private int port = 8088;
        private string formattedDir;

        public MainWindow()
        {
            try
            {
                if (!Directory.Exists(@"C:\WirexClient"))
                    Directory.CreateDirectory(@"C:\WirexClient");
            }
            catch { }

            Title = "Wirex Client Launcher";
            Width = 800;
            Height = 480;
            WindowStyle = WindowStyle.None;
            AllowsTransparency = true;
            Background = new SolidColorBrush(Color.FromRgb(8, 8, 8));
            WindowStartupLocation = WindowStartupLocation.CenterScreen;
            ResizeMode = ResizeMode.NoResize;

            string baseDir = AppDomain.CurrentDomain.BaseDirectory;
            formattedDir = Path.Combine(baseDir, "formatted");

            if (!Directory.Exists(formattedDir) || !File.Exists(Path.Combine(formattedDir, "index.html")))
            {
                string localApp = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "WirexLauncher", "formatted");
                formattedDir = localApp;

                Assembly executingAssembly = Assembly.GetExecutingAssembly();
                foreach (string resName in executingAssembly.GetManifestResourceNames())
                {
                    if (resName.EndsWith("formatted.zip", StringComparison.OrdinalIgnoreCase))
                    {
                        string tempZip = Path.Combine(Path.GetTempPath(), "wirex_formatted.zip");
                        using (Stream s = executingAssembly.GetManifestResourceStream(resName))
                        using (FileStream fs = File.Create(tempZip))
                        {
                            byte[] buf = new byte[8192];
                            int read;
                            while ((read = s.Read(buf, 0, buf.Length)) > 0)
                                fs.Write(buf, 0, read);
                        }

                        SafeExtractZip(tempZip, formattedDir);
                        try { File.Delete(tempZip); } catch { }
                        break;
                    }
                }
            }

            StartLocalServer();

            webView = new WebView2();
            webView.DefaultBackgroundColor = System.Drawing.Color.FromArgb(255, 8, 8, 8);
            Content = webView;

            Loaded += MainWindow_Loaded;
            Closed += MainWindow_Closed;
        }

        private void StartLocalServer()
        {
            for (int tryPort = 8088; tryPort <= 8095; tryPort++)
            {
                try
                {
                    httpListener = new HttpListener();
                    httpListener.Prefixes.Add($"http://127.0.0.1:{tryPort}/");
                    httpListener.Start();
                    port = tryPort;
                    break;
                }
                catch
                {
                    httpListener = null;
                }
            }

            if (httpListener != null)
            {
                ThreadPool.QueueUserWorkItem(_ =>
                {
                    while (httpListener != null && httpListener.IsListening)
                    {
                        try
                        {
                            HttpListenerContext ctx = httpListener.GetContext();
                            ThreadPool.QueueUserWorkItem(c => ProcessRequest((HttpListenerContext)c), ctx);
                        }
                        catch { }
                    }
                });
            }
        }

        private void ProcessRequest(HttpListenerContext ctx)
        {
            try
            {
                string rawUrl = ctx.Request.Url.AbsolutePath.TrimStart('/');
                if (string.IsNullOrEmpty(rawUrl)) rawUrl = "index.html";

                string filePath = Path.Combine(formattedDir, rawUrl.Replace('/', Path.DirectorySeparatorChar));

                if (File.Exists(filePath))
                {
                    byte[] fileBytes = File.ReadAllBytes(filePath);
                    string ext = Path.GetExtension(filePath).ToLowerInvariant();
                    string mime = "application/octet-stream";

                    switch (ext)
                    {
                        case ".html": mime = "text/html; charset=utf-8"; break;
                        case ".css": mime = "text/css; charset=utf-8"; break;
                        case ".js": mime = "application/javascript; charset=utf-8"; break;
                        case ".png": mime = "image/png"; break;
                        case ".jpg":
                        case ".jpeg": mime = "image/jpeg"; break;
                        case ".ttf": mime = "font/ttf"; break;
                        case ".woff": mime = "font/woff"; break;
                        case ".woff2": mime = "font/woff2"; break;
                    }

                    ctx.Response.ContentType = mime;
                    ctx.Response.Headers.Add("Cache-Control", "no-cache, no-store, must-revalidate");
                    ctx.Response.Headers.Add("Pragma", "no-cache");
                    ctx.Response.Headers.Add("Expires", "0");
                    ctx.Response.ContentLength64 = fileBytes.Length;
                    ctx.Response.OutputStream.Write(fileBytes, 0, fileBytes.Length);
                }
                else
                {
                    ctx.Response.StatusCode = 404;
                }
            }
            catch { }
            finally
            {
                try { ctx.Response.OutputStream.Close(); } catch { }
            }
        }

        private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
        {
            try
            {
                string userDataFolder = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "WirexLauncher_WV2");
                var env = await CoreWebView2Environment.CreateAsync(null, userDataFolder);
                await webView.EnsureCoreWebView2Async(env);

                webView.CoreWebView2.Settings.IsStatusBarEnabled = false;
                webView.CoreWebView2.Settings.AreDefaultContextMenusEnabled = false;
                webView.CoreWebView2.Settings.AreDevToolsEnabled = false;

                webView.CoreWebView2.WebMessageReceived += CoreWebView2_WebMessageReceived;
                webView.CoreWebView2.NavigationCompleted += (s, args) =>
                {
                    if (!args.IsSuccess)
                    {
                        MessageBox.Show("Ошибка загрузки интерфейса: " + args.WebErrorStatus, "Wirex Launcher", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                    else
                    {
                        try
                        {
                            string hwid = GetSystemHWID();
                            webView.CoreWebView2.ExecuteScriptAsync($"window.WIREX_HWID = '{hwid}';");
                        }
                        catch { }
                    }
                };

                if (Directory.Exists(formattedDir))
                {
                    webView.CoreWebView2.SetVirtualHostNameToFolderMapping("appassets.example", formattedDir, CoreWebView2HostResourceAccessKind.Allow);
                }

                webView.Source = new Uri($"http://127.0.0.1:{port}/index.html");
            }
            catch (Exception ex)
            {
                MessageBox.Show("WebView2 Error: " + ex.Message, "Wirex Launcher", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }

        public void DragWindow()
        {
            try
            {
                WindowInteropHelper helper = new WindowInteropHelper(this);
                ReleaseCapture();
                SendMessage(helper.Handle, WM_NCLBUTTONDOWN, (IntPtr)HT_CAPTION, IntPtr.Zero);
            }
            catch { }
        }

        public void SendUiProgress(string status, int percent)
        {
            try
            {
                Dispatcher.BeginInvoke(new Action(() =>
                {
                    if (webView != null && webView.CoreWebView2 != null)
                    {
                        string safeStatus = status.Replace("\\", "\\\\").Replace("'", "\\'").Replace("\"", "\\\"").Replace("\n", "").Replace("\r", "");
                        string json = $"{{\"action\":\"CHANGE_LOADER_TEXT_WITH_PERCENT\",\"value\":{{\"status\":\"{safeStatus}\",\"percent\":{percent}}}}}";
                        try { webView.CoreWebView2.PostWebMessageAsJson(json); } catch { }
                        try { webView.CoreWebView2.ExecuteScriptAsync($"if(window.LauncherController&&LauncherController.handleLauncherActionMessage)LauncherController.handleLauncherActionMessage('CHANGE_LOADER_TEXT_WITH_PERCENT',{{status:'{safeStatus}',percent:{percent}}});"); } catch { }
                    }
                }));
            }
            catch { }
        }

        private void SafeExtractZip(string zipPath, string destDir)
        {
            try
            {
                foreach (var proc in Process.GetProcessesByName("javaw"))
                {
                    try
                    {
                        string mainMod = proc.MainModule != null ? proc.MainModule.FileName : "";
                        if (mainMod.IndexOf("WirexClient", StringComparison.OrdinalIgnoreCase) >= 0)
                            proc.Kill();
                    }
                    catch { }
                }
            }
            catch { }

            Directory.CreateDirectory(destDir);
            using (ZipArchive archive = ZipFile.OpenRead(zipPath))
            {
                int count = archive.Entries.Count;
                int current = 0;
                foreach (ZipArchiveEntry entry in archive.Entries)
                {
                    current++;
                    if (current % 100 == 0 || current == count)
                    {
                        int extractPct = 86 + (int)((current / (double)count) * 10);
                        SendUiProgress($"Распаковка: {current}/{count} файлов...", extractPct);
                    }

                    if (string.IsNullOrEmpty(entry.Name) || entry.FullName.EndsWith("/") || entry.FullName.EndsWith("\\"))
                    {
                        string subDir = Path.Combine(destDir, entry.FullName);
                        Directory.CreateDirectory(subDir);
                    }
                    else
                    {
                        string targetPath = Path.Combine(destDir, entry.FullName);
                        string dir = Path.GetDirectoryName(targetPath);
                        if (!string.IsNullOrEmpty(dir))
                            Directory.CreateDirectory(dir);
                        entry.ExtractToFile(targetPath, true);
                    }
                }
            }
        }

        private static void InitSecurityProtocol()
        {
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = (SecurityProtocolType)16320;
                ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;
            }
            catch { }
        }

        private string GetSystemHWID()
        {
            try
            {
                using (var key = Microsoft.Win32.Registry.LocalMachine.OpenSubKey(@"SOFTWARE\Microsoft\Cryptography"))
                {
                    if (key != null)
                    {
                        object val = key.GetValue("MachineGuid");
                        if (val != null)
                        {
                            using (var md5 = System.Security.Cryptography.MD5.Create())
                            {
                                byte[] hash = md5.ComputeHash(System.Text.Encoding.UTF8.GetBytes(val.ToString() + Environment.ProcessorCount));
                                string hex = BitConverter.ToString(hash).Replace("-", "").ToUpperInvariant();
                                return "WIRX-" + hex.Substring(0, 4) + "-" + hex.Substring(4, 4) + "-" + hex.Substring(8, 4) + "-" + hex.Substring(12, 4);
                            }
                        }
                    }
                }
            }
            catch { }
            return "WIRX-DEFAULT-0000";
        }

        private string FindOrDownloadJava(string clientDir)
        {
            InitSecurityProtocol();
            string appData = Environment.GetFolderPath(Environment.SpecialFolder.ApplicationData);

            string[] candidates = new string[]
            {
                Path.Combine(clientDir, @"runtime\jre-25\bin\javaw.exe"),
                Path.Combine(clientDir, @"runtime-clean\bin\javaw.exe"),
                Path.Combine(clientDir, @"runtime\jre-21\bin\javaw.exe"),
                Path.Combine(clientDir, @"runtime\bin\javaw.exe"),
                Path.Combine(clientDir, @"jre\bin\javaw.exe"),
                Path.Combine(appData, @".wirex\jre\bin\javaw.exe"),
                Path.Combine(appData, @".tlauncher\legacy\Minecraft\jre\x64\bin\javaw.exe"),
                Path.Combine(appData, @".tlauncher\legacy\Minecraft\jre\java-runtime-delta\windows-x64\java-runtime-delta\bin\javaw.exe"),
                Path.Combine(appData, @".minecraft\runtime\java-runtime-delta\windows-x64\java-runtime-delta\bin\javaw.exe"),
                Path.Combine(appData, @".minecraft\runtime\java-runtime-gamma\windows-x64\java-runtime-gamma\bin\javaw.exe"),
                @"C:\Program Files\Java\jdk-21.0.12\bin\javaw.exe",
                @"C:\Program Files\Java\jdk-21\bin\javaw.exe",
                @"C:\Program Files\Eclipse Adoptium\jdk-21\bin\javaw.exe",
                @"C:\Program Files\Java\jre-21\bin\javaw.exe",
                @"C:\Program Files\BellSoft\LibericaJDK-21\bin\javaw.exe",
                @"C:\Program Files\Microsoft\jdk-21\bin\javaw.exe"
            };

            foreach (string p in candidates)
            {
                if (File.Exists(p)) return p;
            }

            // Search in Program Files subdirectories
            string[] searchDirs = new string[]
            {
                @"C:\Program Files\Java",
                @"C:\Program Files\Eclipse Adoptium",
                @"C:\Program Files\BellSoft",
                @"C:\Program Files\Microsoft",
                @"C:\Program Files\Amazon Corretto"
            };

            foreach (string dir in searchDirs)
            {
                if (Directory.Exists(dir))
                {
                    try
                    {
                        string[] files = Directory.GetFiles(dir, "javaw.exe", SearchOption.AllDirectories);
                        foreach (string f in files)
                        {
                            if (f.ToLowerInvariant().Contains("21"))
                                return f;
                        }
                    }
                    catch { }
                }
            }

            // Need to download Java 21
            string runtimeDir = Path.Combine(clientDir, "runtime");
            Directory.CreateDirectory(runtimeDir);
            string zipFile = Path.Combine(runtimeDir, "jre21.zip");

            string[] urls = new string[]
            {
                "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.6%2B7/OpenJDK21U-jre_x64_windows_hotspot_21.0.6_7.zip",
                "https://corretto.aws/downloads/latest/amazon-corretto-21-x64-windows-jdk.zip"
            };

            foreach (string url in urls)
            {
                try
                {
                    SendUiProgress("Загрузка Java 21 Runtime...", 15);
                    InitSecurityProtocol();

                    using (WebClient wc = new WebClient())
                    {
                        wc.Headers.Add("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36");
                        wc.DownloadProgressChanged += (s, e) =>
                        {
                            SendUiProgress($"Загрузка Java 21 ({e.ProgressPercentage}%)...", 15 + (int)(e.ProgressPercentage * 0.25));
                        };
                        wc.DownloadFileTaskAsync(new Uri(url), zipFile).GetAwaiter().GetResult();
                    }

                    if (File.Exists(zipFile) && new FileInfo(zipFile).Length > 1000000)
                    {
                        SendUiProgress("Распаковка Java 21...", 42);
                        string tempExtract = Path.Combine(runtimeDir, "temp_jre");
                        if (Directory.Exists(tempExtract)) Directory.Delete(tempExtract, true);
                        SafeExtractZip(zipFile, tempExtract);

                        string targetJre = Path.Combine(runtimeDir, "jre-21");
                        if (Directory.Exists(targetJre)) Directory.Delete(targetJre, true);

                        string[] javaFiles = Directory.GetFiles(tempExtract, "javaw.exe", SearchOption.AllDirectories);
                        if (javaFiles.Length > 0)
                        {
                            string binDir = Path.GetDirectoryName(javaFiles[0]);
                            string foundRoot = Path.GetDirectoryName(binDir);
                            Directory.Move(foundRoot, targetJre);
                            try { Directory.Delete(tempExtract, true); } catch { }
                            try { File.Delete(zipFile); } catch { }

                            string finalExe = Path.Combine(targetJre, @"bin\javaw.exe");
                            if (File.Exists(finalExe)) return finalExe;
                        }
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine("Java download error: " + ex.Message);
                }
            }

            return "javaw.exe";
        }

        public class TimeoutWebClient : WebClient
        {
            private int timeout;
            public TimeoutWebClient(int timeoutMs = 1800000)
            {
                this.timeout = timeoutMs;
            }

            protected override WebRequest GetWebRequest(Uri uri)
            {
                WebRequest w = base.GetWebRequest(uri);
                w.Timeout = timeout;
                if (w is HttpWebRequest hw)
                {
                    hw.ReadWriteTimeout = timeout;
                    hw.AllowAutoRedirect = true;
                    hw.MaximumAutomaticRedirections = 10;
                }
                return w;
            }
        }

        private string ResolveRedirectUrl(string url)
        {
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
                req.Method = "HEAD";
                req.AllowAutoRedirect = false;
                req.Timeout = 20000;
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                {
                    if ((int)resp.StatusCode >= 300 && (int)resp.StatusCode < 400)
                    {
                        string loc = resp.Headers["Location"];
                        if (!string.IsNullOrEmpty(loc)) return loc;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Resolve redirect failed: " + ex.Message);
            }
            return url;
        }

        private bool DownloadFileWithResume(string url, string dlZip)
        {
            const int maxRetries = 5;
            int attempt = 0;
            long expectedTotal = 848457399;

            while (attempt < maxRetries)
            {
                attempt++;
                try
                {
                    InitSecurityProtocol();

                    long existingBytes = 0;
                    if (File.Exists(dlZip))
                    {
                        existingBytes = new FileInfo(dlZip).Length;
                        if (existingBytes >= expectedTotal)
                        {
                            return true;
                        }
                    }

                    SendUiProgress("Подключение к серверу загрузки Wirex...", 12);
                    string targetUrl = ResolveRedirectUrl(url);

                    HttpWebRequest req = (HttpWebRequest)WebRequest.Create(targetUrl);
                    req.UserAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36";
                    req.Timeout = 60000;
                    req.ReadWriteTimeout = 120000;
                    req.AllowAutoRedirect = true;
                    req.MaximumAutomaticRedirections = 10;

                    if (existingBytes > 0)
                    {
                        req.AddRange(existingBytes);
                    }

                    using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                    {
                        bool isPartial = (resp.StatusCode == HttpStatusCode.PartialContent);
                        long totalBytes = resp.ContentLength;

                        if (isPartial)
                        {
                            totalBytes += existingBytes;
                        }
                        else
                        {
                            existingBytes = 0;
                        }

                        if (totalBytes <= 0) totalBytes = expectedTotal;

                        FileMode mode = (isPartial && existingBytes > 0) ? FileMode.Append : FileMode.Create;
                        using (FileStream fs = new FileStream(dlZip, mode, FileAccess.Write, FileShare.None))
                        using (Stream s = resp.GetResponseStream())
                        {
                            byte[] buffer = new byte[65536];
                            int read;
                            long lastUpdate = DateTime.UtcNow.Ticks;

                            // Send initial progress immediately as stream opens
                            {
                                long mbRec = existingBytes / (1024 * 1024);
                                long mbTot = totalBytes / (1024 * 1024);
                                int pct = (int)Math.Min(99, (existingBytes * 100) / totalBytes);
                                int uiPct = 15 + (int)(pct * 0.70);
                                SendUiProgress($"Загрузка клиента: {mbRec} МБ / {mbTot} МБ ({pct}%)...", uiPct);
                            }

                            while ((read = s.Read(buffer, 0, buffer.Length)) > 0)
                            {
                                fs.Write(buffer, 0, read);
                                existingBytes += read;

                                long nowTicks = DateTime.UtcNow.Ticks;
                                if (nowTicks - lastUpdate > 1500000) // 150 ms
                                {
                                    lastUpdate = nowTicks;
                                    long mbRec = existingBytes / (1024 * 1024);
                                    long mbTot = totalBytes / (1024 * 1024);
                                    int pct = (int)Math.Min(99, (existingBytes * 100) / totalBytes);
                                    int uiPct = 15 + (int)(pct * 0.70);
                                    SendUiProgress($"Загрузка клиента: {mbRec} МБ / {mbTot} МБ ({pct}%)...", uiPct);
                                }
                            }
                        }
                    }

                    if (File.Exists(dlZip) && new FileInfo(dlZip).Length > 800000000)
                    {
                        SendUiProgress("Проверка целостности архива...", 85);
                        return true;
                    }
                }
                catch (Exception ex)
                {
                    Debug.WriteLine($"Download attempt {attempt} failed: {ex.Message}");
                    SendUiProgress($"Сбой сети. Повтор попытки ({attempt}/{maxRetries})...", 15);
                    Thread.Sleep(2000);
                }
            }

            return (File.Exists(dlZip) && new FileInfo(dlZip).Length > 800000000);
        }

        private bool EnsureClientFiles(string clientDir)
        {
            Directory.CreateDirectory(clientDir);
            string classpathFile = Path.Combine(clientDir, "classpath.txt");
            string clientJar = Path.Combine(clientDir, "client.jar");
            string javawExe = Path.Combine(clientDir, @"runtime\jre-25\bin\javaw.exe");

            if (File.Exists(classpathFile) && File.Exists(clientJar) && File.Exists(javawExe))
            {
                SendUiProgress("Файлы клиента проверены.", 40);
                return true;
            }

            string userProfile = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
            string[] localZips = new string[]
            {
                Path.Combine(clientDir, "WirexClient.zip"),
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "WirexClient.zip"),
                Path.Combine(userProfile, @"Downloads\WirexClient.zip"),
                @"C:\Users\kanad\Downloads\WirexClient.zip"
            };

            foreach (string lz in localZips)
            {
                if (File.Exists(lz))
                {
                    try
                    {
                        if (new FileInfo(lz).Length > 800000000)
                        {
                            SendUiProgress("Распаковка локального архива WirexClient.zip...", 45);
                            SafeExtractZip(lz, clientDir);
                            if (File.Exists(classpathFile) && File.Exists(javawExe)) return true;
                        }
                    }
                    catch { }
                }
            }

            string downloadUrl = "https://github.com/Fameboyq/wirex-launcher2/releases/download/1.0/WirexClient.zip";
            string dlZip = Path.Combine(clientDir, "WirexClient_temp.zip");

            try
            {
                SendUiProgress("Подключение к серверу загрузки Wirex...", 15);
                bool downloaded = DownloadFileWithResume(downloadUrl, dlZip);

                if (downloaded && File.Exists(dlZip))
                {
                    SendUiProgress("Распаковка файлов игры (~30-60 сек)...", 86);
                    SafeExtractZip(dlZip, clientDir);
                    try { File.Delete(dlZip); } catch { }

                    if (File.Exists(classpathFile))
                    {
                        SendUiProgress("Клиент успешно установлен!", 95);
                        return true;
                    }
                }
            }
            catch (Exception ex)
            {
                Debug.WriteLine("Client download error: " + ex.Message);
            }

            if (!File.Exists(classpathFile))
            {
                SendUiProgress("Ошибка скачивания файлов клиента.", 0);
                MessageBox.Show("Не удалось загрузить файлы игры (WirexClient.zip).\nПроверьте подключение к интернету и повторите попытку.", "Wirex Launcher", MessageBoxButton.OK, MessageBoxImage.Error);
                return false;
            }

            return true;
        }

        private void LaunchGame(string userName, int ramMb)
        {
            ThreadPool.QueueUserWorkItem(_ =>
            {
                try
                {
                    string clientDir = @"C:\WirexClient";
                    SendUiProgress("Проверка файлов клиента...", 10);
                    if (!EnsureClientFiles(clientDir))
                    {
                        return;
                    }

                    SendUiProgress("Проверка Java Runtime...", 90);
                    string javaPath = FindOrDownloadJava(clientDir);

                    string classpathFile = Path.Combine(clientDir, "classpath.txt");
                    string nativesDir = Path.Combine(clientDir, "natives");
                    string assetsDir = Path.Combine(clientDir, "assets");

                    if (!File.Exists(classpathFile))
                    {
                        SendUiProgress("Ошибка: отсутствует classpath.txt", 0);
                        MessageBox.Show("Файл classpath.txt не найден в C:\\WirexClient.", "Wirex Launcher", MessageBoxButton.OK, MessageBoxImage.Error);
                        return;
                    }

                    SendUiProgress("Запуск Minecraft 1.21.4...", 98);

                    int finalRam = ramMb >= 2048 ? ramMb : 4096;
                    string user = !string.IsNullOrEmpty(userName) ? userName : "WirexUser";
                    string uuid = Guid.NewGuid().ToString("N");
                    string sessionToken = "WIRX-" + Guid.NewGuid().ToString("N").ToUpperInvariant();

                    string args = string.Format(
                        "-Xmx{0}M -Xms1024M -XX:+UseG1GC -XX:+ParallelRefProcEnabled --enable-native-access=ALL-UNNAMED --add-modules=jdk.incubator.vector,jdk.naming.dns --add-opens=java.base/java.lang.invoke=ALL-UNNAMED --add-opens=java.base/java.lang=ALL-UNNAMED -Dwirex.auth.token={7} \"-Djava.library.path={1}\" \"-Dfabric.gameDir={2}\" @{3} net.fabricmc.loader.impl.launch.knot.KnotClient --username \"{4}\" --version \"Fabric 1.21.4\" --gameDir \"{2}\" --assetsDir \"{5}\" --assetIndex 19 --uuid {6} --accessToken dummy --userType mojang",
                        finalRam,
                        nativesDir,
                        clientDir,
                        classpathFile,
                        user,
                        assetsDir,
                        uuid,
                        sessionToken
                    );

                    ProcessStartInfo psi = new ProcessStartInfo
                    {
                        FileName = javaPath,
                        Arguments = args,
                        WorkingDirectory = clientDir,
                        UseShellExecute = false
                    };

                    Process.Start(psi);
                    SendUiProgress("Игра запущена! Приятной игры.", 100);

                    Thread.Sleep(2500);
                    Dispatcher.Invoke(() =>
                    {
                        try { WindowState = WindowState.Minimized; } catch { }
                    });
                }
                catch (Exception ex)
                {
                    SendUiProgress("Ошибка: " + ex.Message, 0);
                    MessageBox.Show("Ошибка запуска клиента: " + ex.Message, "Wirex Launcher", MessageBoxButton.OK, MessageBoxImage.Error);
                }
            });
        }

        private void CoreWebView2_WebMessageReceived(object sender, CoreWebView2WebMessageReceivedEventArgs e)
        {
            string msg = e.WebMessageAsJson;
            if (string.IsNullOrEmpty(msg)) return;

            if (msg.Contains("WINDOW_EXIT"))
            {
                Dispatcher.Invoke(() => Close());
            }
            else if (msg.Contains("WINDOW_MINIMIZE"))
            {
                Dispatcher.Invoke(() => WindowState = WindowState.Minimized);
            }
            else if (msg.Contains("start_drag") || msg.Contains("dragging"))
            {
                Dispatcher.Invoke(() => DragWindow());
            }
            else if (msg.Contains("OPEN_CLIENT_RESOURCES"))
            {
                try
                {
                    Directory.CreateDirectory(@"C:\WirexClient");
                    Process.Start("explorer.exe", @"C:\WirexClient");
                }
                catch { }
            }
            else if (msg.Contains("START_CLIENT"))
            {
                string userName = "WirexUser";
                int ramMb = 2048;

                try
                {
                    Match mUser = Regex.Match(msg, @"""userName""\s*:\s*""([^""]+)""");
                    if (mUser.Success) userName = mUser.Groups[1].Value;

                    Match mRam = Regex.Match(msg, @"""memoryCount""\s*:\s*""?(\d+)""?");
                    if (mRam.Success) int.TryParse(mRam.Groups[1].Value, out ramMb);
                }
                catch { }

                LaunchGame(userName, ramMb);
            }
        }

        private void MainWindow_Closed(object sender, EventArgs e)
        {
            try
            {
                if (httpListener != null && httpListener.IsListening)
                {
                    httpListener.Stop();
                    httpListener.Close();
                }
            }
            catch { }
            Application.Current.Shutdown();
        }
    }
}
