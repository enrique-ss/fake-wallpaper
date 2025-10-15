Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing

# Código Win32
$signature = @"
using System;
using System.Runtime.InteropServices;
public class Win32 {
  [DllImport("user32.dll", SetLastError=true)]
  public static extern IntPtr FindWindow(string lpClassName, string lpWindowName);
  [DllImport("user32.dll", SetLastError=true)]
  public static extern IntPtr SetParent(IntPtr hWndChild, IntPtr hWndNewParent);
}
"@
Add-Type $signature

# Caminho do HTML
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$htmlPath = Join-Path $scriptDir "wallpaper.html"

# Criar janela principal
$form = New-Object System.Windows.Forms.Form
$form.FormBorderStyle = 'None'
$form.TopMost = $false
$form.ShowInTaskbar = $false
$form.StartPosition = 'Manual'

# Pegar resolução da tela
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$form.Bounds = $screen

# Adicionar navegador embutido
$web = New-Object System.Windows.Forms.WebBrowser
$web.ScrollBarsEnabled = $false
$web.ScriptErrorsSuppressed = $true
$web.Dock = 'Fill'
$uri = New-Object System.Uri ($htmlPath)
$web.Url = $uri
$form.Controls.Add($web)

# Adicionar evento Load DEPOIS que o form existe
Register-ObjectEvent -InputObject $form -EventName Load -Action {
    $progman = [Win32]::FindWindow("Progman", "Program Manager")
    if ($progman -ne [IntPtr]::Zero) {
        [Win32]::SetParent($form.Handle, $progman) | Out-Null
    }
} | Out-Null

# Exibir o form
[void]$form.ShowDialog()
