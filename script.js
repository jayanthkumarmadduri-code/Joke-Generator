const jokeBtn = document.getElementById('joke-btn');
const jokeSetup = document.getElementById('setup');
const jokeDelivery = document.getElementById('delivery');
const btnText = document.getElementById('btn-text');
const loader = document.getElementById('loader');
const laughSound = document.getElementById('laugh-sound');

/**
 * Simple Joke API Module
 * This represents the "Joke API" logic
 */
const JokeAPI = {
    endpoint: 'http://localhost:3000/api/joke',
    
    async getRandomJoke() {
        try {
            const response = await fetch(this.endpoint);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
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
