# Spotify Web Player Clone

[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-black?style=for-the-badge&logo=vercel)](https://spotify-clone-neon-theta.vercel.app/)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

A fully functional, high-fidelity frontend clone of the **Spotify Web Player**. This project goes beyond static UI by implementing a custom JavaScript audio player that dynamically fetches and loads music metadata from a local JSON structure, mimicking how real-world APIs deliver content.

**🚀 Live Demo:** [View the live site on Vercel](https://spotify-clone-neon-theta.vercel.app/)

---

## 🚀 Features

* **Custom Audio Player:** Fully functional play, pause, next, and previous buttons integrated with the HTML5 Web Audio API.
* **Dynamic Data Loading:** Uses the `fetch()` API to read `songs.json` and `info.json` files, dynamically generating albums and song lists on the page without hardcoded HTML.
* **Interactive Playbar:** Features a functional seekbar that updates in real-time with the track's current time and total duration.
* **Responsive Layout:** Includes a mobile-friendly layout with a slide-out hamburger menu for the library sidebar.
* **Error Handling:** Built-in `try/catch` fallbacks to ensure the app continues running even if an album folder is missing data.

## 🛠️ Tech Stack

* **Markup:** HTML5
* **Styling:** Vanilla CSS3 (Flexbox, Grid, Media Queries)
* **Logic:** Vanilla JavaScript (ES6+, Async/Await, Fetch API)
* **Hosting:** Vercel

## 📂 Data Structure (How it Works)

This app uses a scalable JSON folder structure to manage music files securely without requiring a backend database. 

```text
/songs
  ├── songs.json           # Master list of all available album folders
  ├── /angry_songs
  │   ├── cover.jpg        # Album cover image
  │   ├── info.json        # Contains album title, description, and song array
  │   └── track1.mp3       # Actual audio files
  └── /diljit
      ├── cover.jpg
      ├── info.json
      └── track1.mp3
```
💻 Getting Started (Local Development)
Because this project relies on the JavaScript fetch() API to read the JSON files, it must be run on a local server. Simply opening the HTML file in a browser will block the network requests due to CORS security policies.

Clone the repository:

```
git clone [https://github.com/malaikaahsan/Spotify-Clone-HTML-CSS.git](https://github.com/malaikaahsan/Spotify-Clone-HTML-CSS.git)
```
Navigate to the folder:

```
cd Spotify-Clone-HTML-CSS
```
Run a Local Server:

If you use VS Code, install the Live Server extension.

Right-click index.html and select "Open with Live Server".

👨‍💻 Author
Malaika Ahsan

GitHub: @malaikaahsan

Disclaimer: This is a practice project for educational purposes and portfolio demonstration. It is not affiliated with Spotify.
