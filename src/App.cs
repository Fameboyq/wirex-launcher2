using System;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Reflection;
using System.Runtime.InteropServices;
using System.Security.Cryptography.X509Certificates;
using System.Windows;

namespace WirexClientLauncher
{
    public class App : Application
    {
        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern bool SetDllDirectory(string lpPathName);

        [DllImport("kernel32.dll", CharSet = CharSet.Auto, SetLastError = true)]
        private static extern IntPtr LoadLibrary(string lpLibFileName);

        [DllImport("kernel32.dll", ExactSpelling = true, SetLastError = true)]
        private static extern bool CheckRemoteDebuggerPresent(IntPtr hProcess, ref bool isDebuggerPresent);

        private static void AntiAnalysis()
        {
            try
            {
                if (System.Diagnostics.Debugger.IsAttached)
                    Environment.Exit(0);

                bool isDebugger = false;
                CheckRemoteDebuggerPresent(System.Diagnostics.Process.GetCurrentProcess().Handle, ref isDebugger);
                if (isDebugger)
                    Environment.Exit(0);

                string[] bad = { "dnspy", "ilspy", "de4dot", "procmon", "x64dbg", "x32dbg", "ida64", "ida", "httpdebugger", "charles", "wireshark" };
                foreach (var p in System.Diagnostics.Process.GetProcesses())
                {
                    try
                    {
                        string pName = p.ProcessName.ToLowerInvariant();
                        foreach (string b in bad)
                        {
                            if (pName.Contains(b))
                                Environment.Exit(0);
                        }
                    }
                    catch { }
                }
            }
            catch { }
        }

        [STAThread]
        public static void Main()
        {
            AntiAnalysis();
            try
            {
                ServicePointManager.Expect100Continue = true;
                ServicePointManager.SecurityProtocol = (SecurityProtocolType)16320; // Ssl3 | Tls | Tls11 | Tls12 | Tls13
                ServicePointManager.ServerCertificateValidationCallback = (sender, cert, chain, sslPolicyErrors) => true;
            }
            catch { }

            AppDomain.CurrentDomain.AssemblyResolve += OnAssemblyResolve;

            ExtractNativeDependencies();
            RunApp();
        }

        private static Assembly OnAssemblyResolve(object sender, ResolveEventArgs args)
        {
            try
            {
                string shortName = new AssemblyName(args.Name).Name;
                string resourceName = shortName + ".dll";
                Assembly executingAssembly = Assembly.GetExecutingAssembly();

                using (Stream stream = executingAssembly.GetManifestResourceStream(resourceName))
                {
                    if (stream != null)
                    {
                        byte[] buffer = new byte[stream.Length];
                        stream.Read(buffer, 0, buffer.Length);
                        return Assembly.Load(buffer);
                    }
                }

                // Check with namespace prefix if needed
                foreach (string name in executingAssembly.GetManifestResourceNames())
                {
                    if (name.EndsWith(resourceName, StringComparison.OrdinalIgnoreCase))
                    {
                        using (Stream stream = executingAssembly.GetManifestResourceStream(name))
                        {
                            if (stream != null)
                            {
                                byte[] buffer = new byte[stream.Length];
                                stream.Read(buffer, 0, buffer.Length);
                                return Assembly.Load(buffer);
                            }
                        }
                    }
                }
            }
            catch { }

            return null;
        }

        private static void ExtractNativeDependencies()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string tempDir = Path.Combine(Path.GetTempPath(), "WirexLauncher_Native");
                Directory.CreateDirectory(tempDir);

                byte[] loaderBytes = null;
                Assembly asm = Assembly.GetExecutingAssembly();

                foreach (string name in asm.GetManifestResourceNames())
                {
                    if (name.EndsWith("WebView2Loader.dll", StringComparison.OrdinalIgnoreCase))
                    {
                        using (Stream s = asm.GetManifestResourceStream(name))
                        {
                            if (s != null)
                            {
                                loaderBytes = new byte[s.Length];
                                s.Read(loaderBytes, 0, loaderBytes.Length);
                            }
                        }
                        break;
                    }
                }

                if (loaderBytes != null)
                {
                    string[] targetPaths = new string[]
                    {
                        Path.Combine(baseDir, "WebView2Loader.dll"),
                        Path.Combine(tempDir, "WebView2Loader.dll"),
                        Path.Combine(baseDir, "runtimes", "win-x64", "native", "WebView2Loader.dll"),
                        Path.Combine(baseDir, "x64", "WebView2Loader.dll"),
                        Path.Combine(tempDir, "runtimes", "win-x64", "native", "WebView2Loader.dll")
                    };

                    foreach (string path in targetPaths)
                    {
                        try
                        {
                            string dir = Path.GetDirectoryName(path);
                            if (!string.IsNullOrEmpty(dir))
                                Directory.CreateDirectory(dir);
                            File.WriteAllBytes(path, loaderBytes);
                        }
                        catch { }
                    }

                    SetDllDirectory(tempDir);
                    string tempLoader = Path.Combine(tempDir, "WebView2Loader.dll");
                    if (File.Exists(tempLoader))
                        LoadLibrary(tempLoader);

                    string baseLoader = Path.Combine(baseDir, "WebView2Loader.dll");
                    if (File.Exists(baseLoader))
                        LoadLibrary(baseLoader);
                }
            }
            catch { }
        }

        private static void RunApp()
        {
            App app = new App();
            MainWindow window = new MainWindow();
            app.Run(window);
        }
    }
}
