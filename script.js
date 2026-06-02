const jokeBtn = document.getElementById('joke-btn');
const jokeSetup = document.getElementById('setup');
const jokeDelivery = document.getElementById('delivery');
const btnText = document.getElementById('btn-text');
const loader = document.getElementById('loader');
const laughSound = document.getElementById('laugh-sound');

const isLocalDev =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';

/**
 * Simple Joke API Module
 * Local: custom API via server.py / local-api
 * GitHub Pages: public JokeAPI (https://jokeapi.dev)
 */
const JokeAPI = {
    get endpoint() {
        return isLocalDev
            ? '/api/joke'
            : 'https://v2.jokeapi.dev/joke/Any?safe-mode';
    },

    async getRandomJoke() {
        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();

            if (isLocalDev) {
                return { setup: data.setup, delivery: data.delivery };
            }
            return data;
        } catch (error) {
            console.error('Fetch error:', error);
            return {
                type: 'single',
                joke: 'Oops! The joke service is taking a nap. Try again in a bit!'
            };
        }
    }
};

async function getJoke() {
    // Play sound from beginning
    laughSound.currentTime = 0;
    laughSound.play().catch(e => console.log("Audio play deferred until user interacts with the page."));

    // UI state: Loading
    jokeBtn.disabled = true;
    btnText.style.display = 'none';
    loader.style.display = 'block';
    jokeDelivery.classList.remove('show');

    const data = await JokeAPI.getRandomJoke();

    // UI state: Success
    loader.style.display = 'none';
    btnText.style.display = 'inline';
    jokeBtn.disabled = false;

    if (data.type === 'single') {
        jokeSetup.textContent = data.joke;
        jokeDelivery.textContent = '';
        jokeDelivery.classList.remove('show');
    } else {
        jokeSetup.textContent = data.setup;
        jokeDelivery.textContent = data.delivery;
        
        // Slight delay for delivery for better comedic timing
        setTimeout(() => {
            jokeDelivery.classList.add('show');
        }, 500);
    }
}

// Initial joke
// getJoke();

jokeBtn.addEventListener('click', getJoke);
