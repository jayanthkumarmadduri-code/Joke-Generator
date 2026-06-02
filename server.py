import http.server
import socketserver
import json
import random
import os

PORT = 3000

jokes = [
    {"setup": "Why don't scientists trust atoms?", "delivery": "Because they make up everything!"},
    {"setup": "What do you call a fake noodle?", "delivery": "An impasta!"},
    {"setup": "Why did the scarecrow win an award?", "delivery": "Because he was outstanding in his field!"},
    {"setup": "How does a penguin build its house?", "delivery": "Igloos it together!"},
    {"setup": "What did the ocean say to the beach?", "delivery": "Nothing, it just waved."},
    {"setup": "Why was the math book sad?", "delivery": "Because it had too many problems."},
    {"setup": "What do you call a bear with no teeth?", "delivery": "A gummy bear!"},
    {"setup": "Why did the gym close down?", "delivery": "It just didn't work out."}
]

class JokeHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/joke'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            joke = random.choice(jokes)
            
            # Check for ?format=oneline
            if 'format=oneline' in self.path:
                response = f"{joke['setup']} {joke['delivery']}"
                self.wfile.write(response.encode())
            else:
                self.wfile.write(json.dumps(joke).encode())
        else:
            # Serve regular files (index.html, style.css, etc.)
            return super().do_GET()

os.chdir(os.path.dirname(os.path.abspath(__file__)))

with socketserver.TCPServer(("", PORT), JokeHandler) as httpd:
    print(f"Server started at http://localhost:{PORT}")
    print("Serving UI and Joke API...")
    httpd.serve_forever()
