const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const path = require('path');

app.use(cors());
app.use(express.json());

// Serve static files from the parent directory
app.use(express.static(path.join(__dirname, '..')));

const jokes = [
    { setup: "Why don't scientists trust atoms?", delivery: "Because they make up everything!" },
    { setup: "What do you call a fake noodle?", delivery: "An impasta!" },
    { setup: "Why did the scarecrow win an award?", delivery: "Because he was outstanding in his field!" },
    { setup: "How does a penguin build its house?", delivery: "Igloos it together!" },
    { setup: "What did the ocean say to the beach?", delivery: "Nothing, it just waved." },
    { setup: "Why was the math book sad?", delivery: "Because it had too many problems." },
    { setup: "What do you call a bear with no teeth?", delivery: "A gummy bear!" },
    { setup: "Why did the gym close down?", delivery: "It just didn't work out." }
];

// Endpoint to get a random joke
app.get('/api/joke', (req, res) => {
    const randomIndex = Math.floor(Math.random() * jokes.length);
    const joke = jokes[randomIndex];
    
    // Support for returning just the one-liner if requested via query param
    if (req.query.format === 'oneline') {
        return res.send(`${joke.setup} ${joke.delivery}`);
    }
    
    res.json(joke);
});

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the Premium Joke API! Try /api/joke');
});

app.listen(PORT, () => {
    console.log(`Joke API is running at http://localhost:${PORT}`);
});
