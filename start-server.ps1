# Simple HTTP Server Script
# Save as start-server.ps1

# Set server root directory to the directory containing this script
$root = Split-Path -Parent $MyInvocation.MyCommand.Path

# Set server port
$port = 8000

# Create HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()

Write-Host "Server started, listening on http://localhost:$port/"
Write-Host "Press Ctrl+C to stop the server"
Write-Host ""
Write-Host "Opening browser..."

# Open default browser
Start-Process "http://localhost:$port/"

# Handle requests
while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response
    
    # Get requested file path
    $filePath = $request.Url.LocalPath
    if ($filePath -eq "/") {
        $filePath = "/index.html"
    }
    
    # Build full file path
    $fullPath = Join-Path $root $filePath.Substring(1)
    
    # Check if file exists
    if (Test-Path $fullPath -PathType Leaf) {
        try {
            # Read file content
            $content = [System.IO.File]::ReadAllBytes($fullPath)
            
            # Set response headers
            $extension = [System.IO.Path]::GetExtension($fullPath).ToLower()
            switch ($extension) {
                ".html" { $response.ContentType = "text/html; charset=utf-8" }
                ".css" { $response.ContentType = "text/css; charset=utf-8" }
                ".js" { $response.ContentType = "text/javascript; charset=utf-8" }
                ".svg" { $response.ContentType = "image/svg+xml; charset=utf-8" }
                default { $response.ContentType = "application/octet-stream" }
            }
            
            # Send response
            $response.ContentLength64 = $content.Length
            $response.OutputStream.Write($content, 0, $content.Length)
        } catch {
            Write-Host "Error processing file: $fullPath"
            Write-Host $_.Exception.Message
            
            # Return 404 error
            $response.StatusCode = 404
            $response.ContentType = "text/plain"
            $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $errorContent.Length
            $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
        }
    } else {
        Write-Host "File not found: $fullPath"
        
        # Return 404 error
        $response.StatusCode = 404
        $response.ContentType = "text/plain"
        $errorContent = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
        $response.ContentLength64 = $errorContent.Length
        $response.OutputStream.Write($errorContent, 0, $errorContent.Length)
    }
    
    # Close response stream
    $response.OutputStream.Close()
}

# Stop listener
$listener.Stop()
$listener.Close()
Write-Host "Server stopped"