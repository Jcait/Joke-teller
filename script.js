const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

// VoiceRSS Javascript SDK

// Disablle.Enable button
function toggleButton() {
    button.disabled = !button.disabled
}


// Passing our Joke to our VoiceRSSApi
function tellme(joke)  {
    VoiceRSS.speech({
        key: '<API_Goes_Here>',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}


//Get jojes from JokeAPI
async function getJokes() {
    let joke = ''; 
    const apiURL = 'https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiURL);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
        } else {
            joke = data.joke;
        }
        // Text-toSpeech
        tellme(joke);
        // disable Button
        toggleButton();
    } catch(error) {
        // Catch errors here
        console.log('Woops,', error)
    }

}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton)