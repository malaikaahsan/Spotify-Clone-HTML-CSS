let currentSong = new Audio();
let songs = [];
let currFolder;

function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) return "00:00";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

async function getSongs(folder) {
    currFolder = folder;
    try {
        let a = await fetch(`/${folder}/info.json`);
        let response = await a.json();
        
        // This will work whether you named it "songs" or "songList" in info.json
        songs = response.songs || response.songList || []; 

        let songUL = document.querySelector(".songlist ul");
        songUL.innerHTML = "";
        for (const song of songs) {
            songUL.innerHTML += `<li><img class="invert" src="img/music.svg" alt="">
                                <div class="info">
                                    <div>${song.replaceAll("%20", " ")}</div>
                                    <div>Artist</div>
                                </div>
                                <div class="playnow">
                                    <span>Play Now</span>
                                    <img class="invert" src="img/play.svg" alt="">
                                </div></li>`;
        }

        Array.from(document.querySelectorAll(".songlist li")).forEach(e => {
            e.addEventListener("click", () => {
                playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            });
        });
        return songs;
    } catch(err) {
        console.error("Error fetching songs for " + folder, err);
        return [];
    }
}

const playMusic = (track, pause = false) => {
    // Make sure we format the path perfectly
    currentSong.src = `/${currFolder}/${track}`;
    if (!pause) {
        currentSong.play();
        document.getElementById("now").src = "img/pause.svg";
    }
    document.querySelector(".songinfo").innerHTML = decodeURI(track);
    document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
}

async function displayAlbums() {
    try {
        let a = await fetch(`/songs/songs.json`);
        let response = await a.json();
        let folders = response.folders;
        let cardContainer = document.querySelector(".cardcontainer");
        cardContainer.innerHTML = ""; // Clear out any hardcoded HTML cards

        for (const folder of folders) {
            try {
                let infoFetch = await fetch(`/songs/${folder}/info.json`);
                if(!infoFetch.ok) throw new Error("Could not find info.json");
                let info = await infoFetch.json();
                
                cardContainer.innerHTML += `<div class="card" data-folder="${folder}">
                    <div class="play">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="black"><path d="M5 20V4L19 12L5 20Z" /></svg>
                    </div>
                    <img src="/songs/${folder}/cover.jpg" alt="">
                    <h2>${info.title}</h2>
                    <p>${info.description}</p>
                </div>`;
            } catch(err) {
                // If one folder fails (like karan_ajula), it skips it and loads the rest!
                console.error("Skipping folder due to error: " + folder, err);
            }
        }

        Array.from(document.getElementsByClassName("card")).forEach(e => {
            e.addEventListener("click", async item => {
                let folderName = item.currentTarget.dataset.folder;
                songs = await getSongs(`songs/${folderName}`); 
                if(songs && songs.length > 0) {
                    playMusic(songs[0]);
                }
            });
        });
    } catch (err) {
        console.error("Error loading albums from songs.json", err);
    }
}

async function main() {
    await displayAlbums();

    // Play/Pause Button
    document.getElementById("now").addEventListener("click", () => {
        if (currentSong.paused) {
            currentSong.play();
            document.getElementById("now").src = "img/pause.svg";
        } else {
            currentSong.pause();
            document.getElementById("now").src = "img/playbtn.svg";
        }
    });

    // Time Update logic
    currentSong.addEventListener("timeupdate", () => {
        document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(currentSong.currentTime)} / ${secondsToMinutesSeconds(currentSong.duration)}`;
        document.querySelector(".circle").style.left = (currentSong.currentTime / currentSong.duration) * 100 + "%";
    });

    // Seekbar logic
    document.querySelector(".seekbar").addEventListener("click", e => {
        let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
        document.querySelector(".circle").style.left = percent + "%";
        currentSong.currentTime = ((currentSong.duration) * percent) / 100;
    });

    // Mobile Hamburger
    document.querySelector(".hamburger").addEventListener("click", () => document.querySelector(".left").style.left = "0");
    document.querySelector(".close").addEventListener("click", () => document.querySelector(".left").style.left = "-120%");
    
    // Previous Button Logic
    document.getElementById("previous").addEventListener("click", () => {
        currentSong.pause();
        // Decode the URL so it matches the plain text name in the array
        let trackName = decodeURI(currentSong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(trackName);
        if ((index - 1) >= 0) {
            playMusic(songs[index - 1]);
        }
    });

    // Next Button Logic
    document.getElementById("next").addEventListener("click", () => {
        currentSong.pause();
        // Decode the URL so it matches the plain text name in the array
        let trackName = decodeURI(currentSong.src.split("/").slice(-1)[0]);
        let index = songs.indexOf(trackName);
        if ((index + 1) < songs.length) {
            playMusic(songs[index + 1]);
        }
    });
}

main();