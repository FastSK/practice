// access id elements in HTML
const playlistSongs = document.getElementById("playlist-songs");
const playButton = document.getElementById("play");
const pauseButton = document.getElementById("pause");
const nextButton = document.getElementById("next");
const previousButton = document.getElementById("previous");
const shuffleButton = document.getElementById("shuffle");

// create an empty array to store all the songs (=objects)
const allSongs = [
    {
        id: 0,
        title: "Scratching The Surface",
        artist: "Quincy Larson",
        duration: "4:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/scratching-the-surface.mp3"
    }, {
        id: 1,
        title: "Can't Stay Down",
        artist: "Quincy Larson",
        duration: "4:15",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/cant-stay-down.mp3"
    },
    {
        id: 2,
        title: "Still Learning",
        artist: "Quincy Larson",
        duration: "3:51",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3"
    },
    {
        id: 3,
        title: "Baby",
        artist: "Harry Koo",
        duration: "3:11",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/still-learning.mp3"
    },
    {
        id: 4,
        title: "Walking on Air",
        artist: "Quincy Larson",
        duration: "3:25",
        src: "https://s3.amazonaws.com/org.freecodecamp.mp3-player-project/walking-on-air.mp3",
    }
];

// Web audio api 
const audio = new Audio();

// userData Object
let userData = {
    // spread operator
    songs: [...allSongs],
    currentSong: null,
    songCurrentTime: 0
};

// display songs in the UI using function
const renderSongs = (array) => {
    // 1. map method() is used to iterate through an array
    // 2. return a new array using callback function
    const songsHTML = array.map((song) => {
        return `
        <li id="song-${song.id}" class="playlist-song">
      <button class="playlist-song-info" onclick="playSong(${song.id})">
          <span class="playlist-song-title">${song.title}</span>
          <span class="playlist-song-artist">${song.artist}</span>
          <span class="playlist-song-duration">${song.duration}</span>
      </button>
      <button class="playlist-song-delete" aria-label="Delete ${song.title}">
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M5.32587 5.18571C5.7107 4.90301 6.28333 4.94814 6.60485 5.28651L8 6.75478L9.39515 5.28651C9.71667 4.94814 10.2893 4.90301 10.6741 5.18571C11.059 5.4684 11.1103 5.97188 10.7888 6.31026L9.1832 7.99999L10.7888 9.68974C11.1103 10.0281 11.059 10.5316 10.6741 10.8143C10.2893 11.097 9.71667 11.0519 9.39515 10.7135L8 9.24521L6.60485 10.7135C6.28333 11.0519 5.7107 11.097 5.32587 10.8143C4.94102 10.5316 4.88969 10.0281 5.21121 9.68974L6.8168 7.99999L5.21122 6.31026C4.8897 5.97188 4.94102 5.4684 5.32587 5.18571Z" fill="white"/></svg>
        </button>
      </li>
        `;
    }).join("");

    // update the playlist in HTML to display songs
    playlistSongs.innerHTML = songsHTML;
}

// *** Sort song by title using sort() method*** 
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1
        }
        if (a.title > b.title) {
            return 1;
        }
        return 0;
    })
    return userData?.songs;
}

renderSongs(sortSongs());

// Play song
const playSong = (id) => {
    const song = userData?.songs.find((song) => song.id === id)
    audio.src = song.src;
    audio.title = song.title + "wow";

    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;

    // add "playing" css class and add it to playButton element. 
    playButton.classList.add('playing')

    audio.play()
}

// Add functionality for playing a song to the play button once it is clicked on. 
playButton.addEventListener('click', () => {
    if (userData?.currentSong === null) {
        playSong(userData?.songs[0].id)
    } else {
        playSong(userData?.currentSong.id)
    }
});





// SPOTIFY API
// // Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
// const token = 'BQDihvA34ddMC2YqoiEE8y8ncIRKHwR4XQT-BbJnP0vp2hOoF7FJLdj1Pq9rfP71_rSZHkXl5h8DI-vjsPPNVplvr6UATMZMr5LOldZH9bHGKvBI_Pg56_1RclXN43-nyb8xPb_IVsYmPWwvp_eKD1Faryn_dmQ_d7kqTFGVkPYt8lWczSbkxUVcig36bk5wBLTtBz-O6r8vLsE8DDxCUBfpGch5r1B8LAaFwzilfnJ0P3FnUy8td35KjxJDcIs3e0gNX59ij0iPoJMenMKz';
// async function fetchWebApi(endpoint, method, body) {
//     const res = await fetch(`https://api.spotify.com/${endpoint}`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//         method,
//         body: JSON.stringify(body)
//     });
//     return await res.json();
// }

// async function getTopTracks() {
//     // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
//     return (await fetchWebApi(
//         'v1/me/top/tracks?time_range=long_term&limit=5', 'GET'
//     )).items;
// }

// const topTracks = await getTopTracks();
// console.log(
//     topTracks?.map(
//         ({ name, artists }) =>
//             `${name} by ${artists.map(artist => artist.name).join(', ')}`
//     )
// );