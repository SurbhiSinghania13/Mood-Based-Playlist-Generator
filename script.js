let songs;
let currentSongIndex;
let audioPlayer;
let background;

// Initialization on window load
window.onload = function () {
    songs = {
        happy: ['happysong1', 'happysong2'],
        sad: ['sadsong1', 'sadsong2'],
        relaxed: ['relaxedsong1', 'relaxedsong2'],
    };

    currentSongIndex = 0;
}

// Function to change the mood and update the UI accordingly
function changeMood() {
    // Get DOM elements
    background = document.getElementById('background');
    const moodSelect = document.getElementById('moodSelect');
    const selectedMoodElement = document.getElementById('selectedMood');
    const songListElement = document.getElementById('songList');
    audioPlayer = document.getElementById('audioPlayer');
    const outputSection = document.getElementById('output');

    // Retrieve selected mood and corresponding songs
    const selectedMood = moodSelect.value;
    const selectedSongs = songs[selectedMood];

    // Display or hide output section based on the selected mood
    outputSection.style.display = 'block';
    if (selectedMood == "X") {
        outputSection.style.display = 'none';
    }

    // Update selected mood display
    selectedMoodElement.textContent = selectedMood.charAt(0).toUpperCase() + selectedMood.slice(1);

    // Clear and populate the song list
    songListElement.innerHTML = '';

    selectedSongs.forEach((song, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = song;
        listItem.addEventListener('click', () => playSong(index));
        songListElement.appendChild(listItem);
    });

    // Play the first song if available
    if (selectedSongs.length > 0) {
        playSong(0);
    } else {
        audioPlayer.pause();
    }

    // Set background image based on the selected mood
    switch (selectedMood) {
        case 'happy':
            background.style.backgroundImage = 'url("images/happy.jpg")';
            break;
        case 'sad':
            background.style.backgroundImage = 'url("images/sad.jpg")';
            break;
        case 'relaxed':
            background.style.backgroundImage = 'url("images/relaxed.jpg")';
            break;
        default:
            background.style.backgroundImage = '';
    }
    // Highlight the first song in the list
    highlightSong(0);
}

// Function to play a selected song
function playSong(index) {
    const audioSource = document.getElementById('audioSource');
    audioSource.src = `songs/${songs[moodSelect.value][index]}.mp3`;
    currentSongIndex = index;
    audioPlayer.load();
    highlightSong(index);
}

// Function to skip to the next song
function skipSong() {
    const selectedSongs = songs[moodSelect.value];
    if (currentSongIndex < selectedSongs.length - 1) {
        playSong(currentSongIndex + 1);
    } else {
        playSong(0);
    }
}

// Function to highlight the selected song in the list
function highlightSong(index) {
    const listItems = songList.getElementsByTagName('li');
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].classList.remove('highlighted');
    }
    listItems[index].classList.add('highlighted');
}