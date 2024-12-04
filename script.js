const playlist = [
    { title: "Enna Sona Reprise", artist: "Artist 1", album: "Album 1", src: "Enna_Sone_Reprise.mp3" },
    { title: "Mere Dholna 3.0", artist: "Artist 2", album: "Album 1", src: "Mere_Dholna_3.0.mp3" },
    { title: "Akhiyaan De Kol", artist: "Artist 3", album: "Album 1", src: "Akhiyaan_De_Kol.mp3" },
    { title: "Raanjhan", artist: "Artist 3", album: "Album ", src: "Raanjhan.mp3" },
];

let currentSongIndex = 0;
let isPlaying = false;

const audio = new Audio();
const playPauseButton = document.getElementById("play-pause-button");
const prevButton = document.getElementById("prev-button");
const nextButton = document.getElementById("next-button");
const progressBar = document.getElementById("progress-bar");
const volumeSlider = document.getElementById("volume-slider");
const playlistContainer = document.getElementById("playlist-container");

// Load a song by its index
function loadSong(index) {
    const song = playlist[index];
    document.getElementById("song-title").textContent = song.title;
    document.getElementById("song-artist").textContent = song.artist;
    document.getElementById("song-album").textContent = song.album;
    audio.src = song.src;
    progressBar.value = 0; // Reset progress bar
}

// Play or pause the current song
function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "▶"; // Show play icon
    } else {
        audio.play();
        playPauseButton.textContent = "⏸"; // Show pause icon
    }
    isPlaying = !isPlaying;
}

// Play the next song
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length; // Wrap around to the first song
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.textContent = "⏸"; // Update button to pause
    isPlaying = true;
}

// Play the previous song
function playPrevSong() {
    currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // Wrap around to the last song
    loadSong(currentSongIndex);
    audio.play();
    playPauseButton.textContent = "⏸"; // Update button to pause
    isPlaying = true;
}

// Update the progress bar as the song plays
function updateProgressBar() {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
}

// Seek to a specific point in the song
function seekSong() {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
}

// Initialize the playlist
playlist.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = `${song.title} - ${song.artist}`;
    li.addEventListener("click", () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
        togglePlayPause();
    });
    playlistContainer.appendChild(li);
});

// Event Listeners
audio.addEventListener("timeupdate", updateProgressBar); // Update progress bar
audio.addEventListener("ended", playNextSong); // Play next song automatically
progressBar.addEventListener("input", seekSong); // Seek functionality
playPauseButton.addEventListener("click", togglePlayPause); // Play/Pause
prevButton.addEventListener("click", playPrevSong); // Previous button
nextButton.addEventListener("click", playNextSong); // Next button
volumeSlider.addEventListener("input", () => (audio.volume = volumeSlider.value)); // Volume control

// Load the first song on startup
loadSong(currentSongIndex);