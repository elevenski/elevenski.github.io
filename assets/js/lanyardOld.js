var statusIcon = document.getElementById("statusIcon");
var spotifyListening = document.getElementById("spotifyListening");
var visualStudioCodePlaying = document.getElementById("visualStudioCodePlaying");
var netflixWatching = document.getElementById("netflixWatching");
var disneyPlusWatching = document.getElementById("disneyPlusWatching");
var activitiesStatus = document.getElementById("activitiesStatus");
var discordStatus = document.getElementById("discordStatus");

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

var api = {};
var received = false;

lanyard.onopen = function () {
  lanyard.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "354343248698802187",
      },
    })
  );
};

setInterval(() => {
  if (received) {
    lanyard.send(
      JSON.stringify({
        op: 3,
      })
    );
  }
}, 30000);

lanyard.onmessage = function (event) {
  received = true;
  api = JSON.parse(event.data);

  if (api.t === "INIT_STATE" || api.t === "PRESENCE_UPDATE") {
    update_presence();
  }
};

function update_presence() {


  if (statusIcon != null) {
    update_status(api.d.discord_status);
  }

  var figmaAppID = "866719067092418580"
  var figmaActivity = api.d.activities.find(activity => activity.application_id == figmaAppID)

  if (figmaActivity) {
    var figmaDetails = figmaActivity.details
    var figmaState = figmaActivity.state

    figmaPlaying.innerHTML = `
    <a href="javascript:void(0)">
    <div class="card rounded-custom h-full">
        <div class="p-4 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="/assets/img/figma.png" alt="IMG" class="rounded-custom cardImage"
                width="60" height="60">
            <p class="normalText ml-3 opacity-80">${figmaState || "Figma"}<br><span class="normalText opacity-60">${figmaDetails || " "}</span></p>
        </div>
    </div>
    </a>`;
  } else {
    figmaPlaying.innerHTML = ``;
    document.getElementById("figmaPlaying").style.display = "none";
  }

  var vsCodeAppID = "383226320970055681"
  var vsCodeActivity = api.d.activities.find(activity => activity.application_id == vsCodeAppID)

  if (vsCodeActivity) {
    var vsCodeDetails = vsCodeActivity.details
    var vsCodeState = vsCodeActivity.state

    visualStudioCodePlaying.innerHTML = `
    <a href="javascript:void(0)">
    <div class="card rounded-custom h-full">
        <div class="p-4 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="/assets/img/visualStudioCode.png" alt="IMG" class="rounded-custom cardImage"
                width="60" height="60">
            <p class="normalText ml-3 opacity-80">${vsCodeState || "VS Code"}<br><span class="normalText opacity-60">${vsCodeDetails || " "}</span></p>
        </div>
    </div>
    </a>`;
  } else {
    visualStudioCodePlaying.innerHTML = ``;
    document.getElementById("visualStudioCodePlaying").style.display = "none";
  }

  var netflixAppID = "926541425682829352"
  var netflixActivity = api.d.activities.find(activity => activity.application_id == netflixAppID)

  if (netflixActivity) {
    var netflixImage = netflixActivity.assets.large_image
    var netflixImageLink = netflixImage.substring(netflixImage.indexOf("https/"));
    var netflixImageLinkRevised = netflixImageLink.replace('https/', 'https://');

    netflixWatching.innerHTML = `
  <a href="javascript:void(0)">
  <div class="card rounded-custom h-full">
      <div class="p-4 flex space-x-2 items-center overflow-hidden">
          <img draggable="false" src="${netflixImageLinkRevised || "/assets/img/netflix.png"}" alt="IMG" class="rounded-custom cardImage"
              width="60" height="60">
          <p class="normalText ml-3 opacity-80">${netflixActivity.details || "Netflix"}<br><span class="normalText opacity-60">${netflixActivity.state || " "}</span></p>
      </div>
  </div>
  </a>`;
  } else {
    netflixWatching.innerHTML = ``;
    document.getElementById("netflixWatching").style.display = "none";
  }

  var disneyPlusAppID = "630236276829716483"
  var disneyPlusActivity = api.d.activities.find(activity => activity.application_id == disneyPlusAppID)

  if (disneyPlusActivity) {
    disneyPlusWatching.innerHTML = `
    <a href="javascript:void(0)">
    <div class="card rounded-custom h-full">
        <div class="p-4 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="/assets/img/disneyPlus.png" alt="IMG" class="rounded-custom cardImage"
                width="60" height="60">
            <p class="normalText ml-3 opacity-80">${disneyPlusActivity.details || "Disney+"}<br><span class="normalText opacity-60">${disneyPlusActivity.state || " "}</span></p>
        </div>
    </div>
    </a>`;
  } else {
    disneyPlusWatching.innerHTML = ``;
    document.getElementById("disneyPlusWatching").style.display = "none";
  }

  if (api.d.listening_to_spotify === true) {
    const start = api.d.spotify.timestamps.start;
    const end = api.d.spotify.timestamps.end;
    const duration = end - start;
    const now = Date.now();
    const progress = Math.min(now - start, duration);
    const percentage = (progress / duration) * 100;

    const artist = api.d.spotify.artist.replace(/\;/g, ",");
    const song = `${api.d.spotify.song}`;
    const albumArt = api.d.spotify.album_art_url || "/assets/img/spotify.png";

    spotifyListening.style.display = ""; // tekrar görünür yap
    spotifyListening.innerHTML = `
    <a href="https://open.spotify.com/track/${api.d.spotify.track_id}" target="_blank">
      <div class="card rounded-custom h-full">
        <div class="p-4 flex items-center space-x-4 overflow-hidden">
          <div class="relative flex items-center justify-center cardImage animate-pulse">
            <svg class="absolute cardImage" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="rgba(0, 0, 0, 0.5)" stroke-width="6" fill="none"/>
              <circle id="spotifyRing" cx="50" cy="50" r="45" stroke="#1DB954" stroke-width="6" fill="none"
                stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="282.6" transform="rotate(-90 50 50)"/>
            </svg>
            <img src="${albumArt}" alt="Album Art" class="rounded-full object-cover cardImage">
          </div>
          <p class="normalText opacity-80">
            ${song}<br>
            <span class="normalText opacity-60">${artist}</span>
          </p>
        </div>
      </div>
    </a>
  `;

    function updateSpotifyRing() {
      const now = Date.now();
      const progress = Math.min(now - start, duration);
      const percent = progress / duration;
      const ring = document.getElementById("spotifyRing");
      if (ring) {
        const totalLength = 2 * Math.PI * 45;
        ring.style.strokeDashoffset = totalLength * (1 - percent);
      }
    }

    updateSpotifyRing();
    if (window.spotifyRingInterval) clearInterval(window.spotifyRingInterval);
    window.spotifyRingInterval = setInterval(updateSpotifyRing, 1000);

  } else {
    spotifyListening.innerHTML = ``;
    spotifyListening.style.display = "none";
    if (window.spotifyRingInterval) clearInterval(window.spotifyRingInterval);
  }




  function update_status(status) {
    if (statusIcon == null) return;

    if (status === "online") {
      statusIcon.innerHTML = "online";
    } else if (status === "idle") {
      statusIcon.innerHTML = "idle";
    } else if (status === "dnd") {
      statusIcon.innerHTML = "dnd";
    } else if (status === "offline") {
      statusIcon.innerHTML = "offline";
    } else {
      statusIcon.innerHTML = "offline";
    }
  }

  setInterval(function () {
    if (api.d.listening_to_spotify == false && api.d.activities.find(activity => activity.application_id == disneyPlusAppID) == undefined && api.d.activities.find(activity => activity.application_id == netflixAppID) == undefined && api.d.activities.find(activity => activity.application_id == vsCodeAppID) == undefined) {
      activitiesStatus.innerHTML = `<span class="normalText opacity-80">There are currently no activity.</span>`;
    } else {
      activitiesStatus.innerHTML = ``;
      document.getElementById("activitiesStatus").style.display = "none";
    }
  }, 1000)

}


lanyard.onclose = function () {
  console.warn("WebSocket closed, reconnecting...");
  setTimeout(() => {
    location.reload();
  }, 2000);
};

if (lanyard.readyState === WebSocket.OPEN) {
  lanyard.send(JSON.stringify({ op: 3 }));
}