// access id elements in HTML
const playlistSongs = document.getElementById("playlist-songs")
const playButton = document.getElementById("play")
const pauseButton = document.getElementById("pause")
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
const renderSongs = array => {
    // 1. map method() is used to iterate through an array
    // 2. return a new array using callback function
    const songsHTML = array.map((song) => {
        return `
        <li id="song-{song.id}" class="playlist-song">
            <button class="playlist-song-info">
                <span class="playlist-song-title">${song.title}</span>
                <span class="playlist-song-artist">${song.artist}</span>
                <span class="playlist-song-duration">${song.duration}</span>
            </button>
            <button class="playlist-song-delete" aria-label="Delete ${song.title}">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#4d4d62"/>
            </button>
        </li>
        `
    }).join(" ");

    // update the playlist in HTML to display songs
    playlistSongs.innerHTML = songsHTML;
}

// *** Sort song by title using sort() method*** 
const sortSongs = () => {
    userData?.songs.sort((a, b) => {
        if (a.title < b.title) {
            return -1
        } else if (a.title > b.title) {
            return 1
        } return 0;
    })
    return userData?.songs;
}

renderSongs(sortSongs());

// Play song
const playing = (id) => {
    const song = userData?.songs.find(song => song.id === id)
    audio.src = song.src;
    audio.title = song.title + "wow";
    if (userData?.currentSong === null || userData?.currentSong.id !== song.id) {
        audio.currentTime = 0;
    } else {
        audio.currentTime = userData?.songCurrentTime;
    }
    userData.currentSong = song;

    playButton.classList.add('playing')
    audio.play()
}







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