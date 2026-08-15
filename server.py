import http.server
import socketserver
import base64
import sys

class Handler(http.server.SimpleHTTPRequestHandler):
    def do_OPTIONS(self):
        self.send_response(200, "ok")
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header("Access-Control-Allow-Headers", "X-Requested-With")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_POST(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            post_data = self.rfile.read(content_length)
            with open('apple-touch-icon-v2.png', 'wb') as f:
                f.write(base64.b64decode(post_data))
            self.send_response(200)
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
        except Exception as e:
            print("Error handling POST:", e)

    def log_message(self, format, *args):
        pass

with socketserver.TCPServer(("127.0.0.1", 8081), Handler) as httpd:
    httpd.handle_request() # OPTIONS
    httpd.handle_request() # POST
    print("Saved apple-touch-icon-v2.png")
