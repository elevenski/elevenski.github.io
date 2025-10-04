const elements = {
  statusIcon: document.getElementById("statusIcon"),
  activitiesContainer: document.getElementById("activitiesContainer"),
  activitiesStatus: document.getElementById("activitiesStatus"),
};

let api = {};
let received = false;
let ws;

function connectWebSocket() {
  ws = new WebSocket("wss://api.lanyard.rest/socket");

  ws.onopen = () => {
    ws.send(JSON.stringify({ op: 2, d: { subscribe_to_id: "354343248698802187" } })); // kendi ID'ni yaz
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

function resolveAssetUrl(raw, appId, fallback) {
  if (!raw) return fallback;
  let s = String(raw);

  if (s.startsWith("mp:external/") && s.includes("https/")) {
    return s.substring(s.indexOf("https/")).replace("https/", "https://");
  }

  if (s.startsWith("https/")) {
    return s.replace("https/", "https://");
  }

  if (s.startsWith("http")) {
    return s;
  }

  if (appId && s) {
    return `https://cdn.discordapp.com/app-assets/${appId}/${s}.png`;
  }

  return fallback;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderActivities() {
  const container = elements.activitiesContainer;
  if (!container) return;
  container.innerHTML = "";

  const activities = api?.d?.activities || [];

  const spotifyActivity = activities.find(
    a => a.name === "Spotify" && api?.d?.listening_to_spotify && api?.d?.spotify
  );
  const otherActivities = activities.filter(a => a.name !== "Spotify");

  if (spotifyActivity) {
    const spotify = api.d.spotify;
    const duration = spotify.timestamps.end - spotify.timestamps.start;

    const card = document.createElement("div");
    card.className = "cardNH rounded-3xl h-full visible";
    card.innerHTML = `
      <a href="https://open.spotify.com/track/${spotify.track_id}" target="_blank">
        <div class="px-6 py-3 flex items-center space-x-4 overflow-hidden">
          <div class="relative flex items-center justify-center cardImage">
            <svg class="absolute cardImage" viewBox="0 0 100 100" style="width:60px;height:60px">
              <circle cx="50" cy="50" r="45" stroke="rgba(0, 0, 0, 0.12)" stroke-width="6" fill="none"/>
              <circle id="spotifyRing" cx="50" cy="50" r="45" stroke="#1DB954" stroke-width="6" fill="none"
                stroke-linecap="round" stroke-dasharray="282.6" stroke-dashoffset="282.6" transform="rotate(-90 50 50)"/>
            </svg>
            <img draggable="false" src="${spotify.album_art_url}" class="rounded-full object-cover cardImage" width="60" height="60" alt="IMG">
          </div>
          <div class="flex flex-col flex-1 overflow-hidden ml-3">
            <p class="textLNormal textBold opacity-80 truncate">${escapeHtml(spotify.song)}</p>
            <p class="textThin opacity-60 truncate">${escapeHtml(spotify.artist.replace(/;/g, ","))}</p>
          </div>
        </div>
      </a>
    `;
    container.appendChild(card);

    clearInterval(window.spotifyRingInterval);
    const updateRing = () => {
      const now = Date.now();
      const prog = Math.min(now - spotify.timestamps.start, duration);
      const ring = document.getElementById("spotifyRing");
      if (ring) {
        const length = 2 * Math.PI * 45;
        ring.style.strokeDashoffset = length * (1 - prog / duration);
      }
    };
    updateRing();
    window.spotifyRingInterval = setInterval(updateRing, 1000);
  }

  otherActivities.forEach(activity => {
    const largeImage = activity.assets?.large_image || activity.assets?.small_image || "";
    const imageSrc = resolveAssetUrl(
      largeImage,
      activity.application_id,
      "assets/img/pattern.png"
    );

    const title = activity.name || "Unknown App";
    const state = activity.state || "";
    const details = activity.details || "";

    const card = document.createElement("div");
    card.className = "cardNHS rounded-3xl h-full overflow-hidden visible";
    card.innerHTML = `
      <div class="px-6 py-3 flex space-x-2 items-center h-full">
        <div class="flex items-center gap-3 w-full">
          <img draggable="false" src="${imageSrc}" alt="IMG"
               class="rounded-xl cardImage activityImage" width="60" height="60"
               onerror="this.onerror=null; this.src='/assets/img/pattern.png'">
          <div class="flex flex-col flex-1 overflow-hidden">
            <p class="textLNormal textBold opacity-80 truncate">${escapeHtml(title)}</p>
            <p class="textThin opacity-60 truncate">${escapeHtml(details || state || " ")}</p>
          </div>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}


function updatePresence() {
  updateStatus(api.d.discord_status);
  renderActivities();
  adjustLayout();
  updateActivityStatusText();
}

function updateActivityStatusText() {
  const a = api?.d?.activities || [];
  const hasNothing = a.length === 0;

  if (elements.activitiesStatus) {
    if (hasNothing) {
      elements.activitiesStatus.innerHTML = "";
      elements.activitiesStatus.style.display = "none";
    } else {
      elements.activitiesStatus.innerHTML = "";
      elements.activitiesStatus.style.display = "none";
    }
  }
}

setInterval(() => {
  if (ws && ws.readyState === WebSocket.OPEN && received) {
    ws.send(JSON.stringify({ op: 3 }));
  }
}, 30000);

setInterval(updateActivityStatusText, 1000);

window.addEventListener('resize', () => {
  adjustLayout();
});

connectWebSocket();

function adjustLayout() {
  const container = elements.activitiesContainer;
  if (!container) return;

  const visible = Array.from(container.children).filter(el =>
    el.classList.contains('visible') &&
    window.getComputedStyle(el).display !== 'none'
  );

  visible.forEach(el => el.classList.add('hidden'));

  const toShow = visible.slice(0, 3);
  toShow.forEach(el => el.classList.remove('hidden'));

  if (window.matchMedia('(max-width: 768px)').matches) {
    toShow.forEach(el => {
      el.classList.remove("sm:w-full", "sm:w-1/2", "sm:w-1/3", "w-[300px]", "mx-auto");
      el.classList.add("w-full", "mb-3");
    });
    container.classList.remove("flex", "justify-center");
    return;
  }

  container.classList.remove("flex", "justify-center");
  if (toShow.length === 1) {
    container.classList.add("flex", "justify-center");
    const el = toShow[0];
    el.classList.remove("w-full", "sm:w-1/2", "sm:w-1/3");
    el.classList.add("w-[400px]");
  } else if (toShow.length === 2) {
    container.classList.add("flex", "justify-start", "gap-6");
    toShow.forEach(el => {
      el.classList.remove("w-full", "sm:w-full", "sm:w-1/2", "sm:w-1/3");
      el.classList.add("sm:w-1/2");
    });
  } else if (toShow.length === 3) {
    container.classList.add("flex", "justify-start", "gap-6");
    toShow.forEach(el => {
      el.classList.remove("w-full", "sm:w-full", "sm:w-1/2", "sm:w-1/3");
      el.classList.add("sm:w-1/3");
    });
  }
}
