import http.server
import socketserver
import base64
import sys

class Handler(http.server.BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            with open('apple-touch-icon.png', 'wb') as f:
                f.write(base64.b64decode(post_data))
            self.send_response(200)
            self.end_headers()
        except Exception as e:
            print("Error handling POST:", e)

    def log_message(self, format, *args):
        pass

with socketserver.TCPServer(("", 8081), Handler) as httpd:
    httpd.handle_request() # Handles exactly one request and then exits
    print("Saved apple-touch-icon.png")
