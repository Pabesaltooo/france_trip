# Simple HTTP server for local development
import http.server
import socketserver
import webbrowser
import threading
import sys
import socket

PORT = 8080

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=".", **kwargs)

def get_local_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # doesn't have to be reachable
        s.connect(('10.255.255.255', 1))
        IP = s.getsockname()[0]
    except Exception:
        IP = '127.0.0.1'
    finally:
        s.close()
    return IP

def open_browser(ip):
    webbrowser.open(f"http://{ip}:{PORT}/main.html")

def main():
    ip = get_local_ip()
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving at http://{ip}:{PORT}/main.html (LAN)")
        print(f"Or use http://localhost:{PORT}/main.html on this PC.")
        threading.Timer(1.0, open_browser, args=(ip,)).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
            sys.exit(0)

if __name__ == "__main__":
    main()
