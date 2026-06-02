# 🎭 Premium Joke Project

This project contains both a **Beautiful Frontend** and a **Custom Joke API**.

## 📁 Structure
- `/index.html`, `/style.css`, `/script.js`: The premium web application.
- `/local-api/`: A Node.js backend server that serves jokes via a REST API.

## 🚀 How to Run

### Live demo (GitHub Pages)
After deployment, open: **https://jayanthkumarmadduri-code.github.io/Joke-Generator/**

### 1. View the Frontend
Simply open `index.html` in your browser to see the premium joke generator in action. On GitHub Pages it uses [JokeAPI](https://jokeapi.dev); locally it uses your custom API.

### 2. Run the Local API
If you want to use your OWN API:
1. Open a terminal in the `local-api` folder.
2. Run `npm install` (to install express and cors).
3. Run `npm start`.
4. Your API will be live at `http://localhost:3000/api/joke`.

### 💡 One-Line Feature
I added a special feature for the API:
If you visit `http://localhost:3000/api/joke?format=oneline`, it returns the joke as a single string instead of JSON!
