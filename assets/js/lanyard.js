const elements = {
  statusIcon: document.getElementById("statusIcon"),
  spotifyListening: document.getElementById("spotifyListening"),
  visualStudioCodePlaying: document.getElementById("visualStudioCodePlaying"),
  netflixWatching: document.getElementById("netflixWatching"),
  disneyPlusWatching: document.getElementById("disneyPlusWatching"),
  activitiesStatus: document.getElementById("activitiesStatus"),
};

const APP_IDS = {
  figma: "866719067092418580",
  vscode: "383226320970055681",
  netflix: "926541425682829352",
  disney: "630236276829716483"
};

let api = {};
let received = false;
let ws;

function connectWebSocket() {
  ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.onopen = () => {
    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: "354343248698802187" } }));
  };

  ws.onmessage = (event) => {
    received = true;
    api = JSON.parse(event.data);
    if (["INIT_STATE", "PRESENCE_UPDATE"].includes(api.t)) updatePresence();
  };

  ws.onclose = () => {
    console.warn("WebSocket closed. Reconnecting...");
    setTimeout(connectWebSocket, 2000);
  };
}

function updateStatus(status) {
  if (!elements.statusIcon) return;
  const valid = ["online", "idle", "dnd", "offline"];
  elements.statusIcon.innerHTML = valid.includes(status) ? status : "offline";
}

function mapAppActivity(appId, targetElement, imgPath, fallbackTitle) {
  const activity = api.d.activities.find(a => a.application_id === appId);
  if (!activity) {
    targetElement.innerHTML = "";
    targetElement.style.display = "none";
    return;
  }

  targetElement.style.display = "";
  const imageSrc = activity.assets?.large_image?.includes("https/") 
    ? activity.assets.large_image.replace("https/", "https://") 
    : imgPath;

  targetElement.innerHTML = `
    <a href="javascript:void(0)">
      <div class="card rounded-custom h-full">
        <div class="p-4 flex space-x-2 items-center overflow-hidden">
          <img src="${imageSrc}" alt="IMG" class="rounded-custom cardImage" width="60" height="60">
          <p class="normalText ml-3 opacity-80">
            ${activity.state || fallbackTitle}<br>
            <span class="normalText opacity-60">${activity.details || " "}</span>
          </p>
        </div>
      </div>
    </a>`;
}

function updateSpotify() {
  const spotify = api.d.spotify;
  const el = elements.spotifyListening;
  if (!api.d.listening_to_spotify || !spotify) {
    el.innerHTML = "";
    el.style.display = "none";
    clearInterval(window.spotifyRingInterval);
    return;
  }

  el.style.display = "";
  const duration = spotify.timestamps.end - spotify.timestamps.start;
  const progress = Math.min(Date.now() - spotify.timestamps.start, duration);
  const percent = (progress / duration) * 100;

  el.innerHTML = `
    <a href="https://open.spotify.com/track/${spotify.track_id}" target="_blank">
      <div class="card rounded-custom h-full">
        <div class="p-4 flex items-center space-x-4 overflow-hidden">
          <div class="relative flex items-center justify-center cardImage animate-pulse">
            <svg class="absolute cardImage" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" stroke="rgba(0, 0, 0, 0.5)" stroke-width="6" fill="none"/>
              <circle id="spotifyRing" cx="50" cy="50" r="45" stroke="#1DB954" stroke-width="6" fill="none"
                stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="282.6" transform="rotate(-90 50 50)"/>
            </svg>
            <img src="${spotify.album_art_url}" class="rounded-full object-cover cardImage">
          </div>
          <p class="normalText opacity-80">${spotify.song}<br>
            <span class="normalText opacity-60">${spotify.artist.replace(/;/g, ",")}</span>
          </p>
        </div>
      </div>
    </a>`;

  const updateRing = () => {
    const now = Date.now();
    const progress = Math.min(now - spotify.timestamps.start, duration);
    const ring = document.getElementById("spotifyRing");
    if (ring) {
      const length = 2 * Math.PI * 45;
      ring.style.strokeDashoffset = length * (1 - progress / duration);
    }
  };

  clearInterval(window.spotifyRingInterval);
  updateRing();
  window.spotifyRingInterval = setInterval(updateRing, 1000);
}

function updatePresence() {
  updateStatus(api.d.discord_status);
  mapAppActivity(APP_IDS.figma, document.getElementById("figmaPlaying"), "/assets/img/figma.png", "Figma");
  mapAppActivity(APP_IDS.vscode, elements.visualStudioCodePlaying, "/assets/img/visualStudioCode.png", "VS Code");
  mapAppActivity(APP_IDS.netflix, elements.netflixWatching, "/assets/img/netflix.png", "Netflix");
  mapAppActivity(APP_IDS.disney, elements.disneyPlusWatching, "/assets/img/disneyPlus.png", "Disney+");
  updateSpotify();
}

function updateActivityStatusText() {
  const a = api.d.activities;
  const hasNothing =
    !api.d.listening_to_spotify &&
    !a.find(act => Object.values(APP_IDS).includes(act.application_id));

  if (hasNothing) {
    elements.activitiesStatus.innerHTML = `<span class="normalText opacity-80">There are currently no activity.</span>`;
    elements.activitiesStatus.style.display = "";
  } else {
    elements.activitiesStatus.innerHTML = "";
    elements.activitiesStatus.style.display = "none";
  }
}

setInterval(() => {
  if (ws.readyState === WebSocket.OPEN && received) {
    ws.send(JSON.stringify({ op: 3 }));
  }
}, 30000);

setInterval(updateActivityStatusText, 1000);

connectWebSocket();