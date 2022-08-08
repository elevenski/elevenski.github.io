var statusIcon = document.getElementById("statusIcon");
var statusContent = document.getElementById("statusContent");
var spotifyListening = document.getElementById("spotifyListening");
var visualStudioCodePlaying = document.getElementById("visualStudioCodePlaying");
var netflixWatching = document.getElementById("netflixWatching");
var disneyPlusWatching = document.getElementById("disneyPlusWatching");

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

  var vsCodeAppID = "383226320970055681"
  var vsCodeActivity = api.d.activities.find(activity => activity.application_id == vsCodeAppID)
  
  if (vsCodeActivity) {
    visualStudioCodePlaying.innerHTML = `
<div class="oal-comps-l-card rounded-cxl mt-3">
<div class=" rounded-cxl">
<div class="oal-comps-l-card-left">
<img draggable="false" src="/assets/img/vscode.svg" alt="IMG" class="img-65 rounded-cxl" width="65" height="65">
</div>
<div class="oal-comps-l-card-right ml-2 p-1">
<p class="section-regular-text-b">Visual Studio Code</p>
<p class="section-regular-text opacity-80 oal-state">${vsCodeActivity.details || " "}</p>
</div>
</div>
</div>`;
  } else {
    visualStudioCodePlaying.innerHTML = ``;
    document.getElementById("visualStudioCodePlaying").style.display = "none";
  }

var netflixAppID = "926541425682829352"
var netflixActivity = api.d.activities.find(activity => activity.application_id == netflixAppID)

if (netflixActivity) {
  var netflixImage = netflixActivity.assets.large_image
  var netflixImageLink = netflixImage.substring(netflixImage.indexOf("https/"));
  var netflixImageLinkRevised = netflixImageLink.replace('https/','https://');

  netflixWatching.innerHTML = `
<div class="oal-comps-l-card rounded-cxl mt-3">
<div class=" rounded-cxl">
<div class="oal-comps-l-card-left">
<img draggable="false" src="${netflixImageLinkRevised || "assets/img/netflix.png"}" onerror="this.onerror=null;this.src='assets/img/netflix.png'" alt="IMG" class="img-65 rounded-cxl" width="65" height="65">
</div>
<div class="oal-comps-l-card-right ml-2 p-1">
<p class="section-regular-text-b">Netflix</p>
<p class="section-regular-text opacity-80 oal-state">${netflixActivity.details || " "}</p>
</div>
</div>
</div>`;
} else {
    netflixWatching.innerHTML = ``;
  document.getElementById("netflixWatching").style.display = "none";
}

var disneyPlusAppID = "630236276829716483"
var disneyPlusActivity = api.d.activities.find(activity => activity.application_id == disneyPlusAppID)

if (disneyPlusActivity) {
    disneyPlusWatching.innerHTML = `
<div class="oal-comps-l-card rounded-cxl mt-3">
<div class=" rounded-cxl">
<div class="oal-comps-l-card-left">
<img draggable="false" src="assets/img/disneyplus.png" alt="IMG" class="img-65 rounded-cxl" width="65" height="65">
</div>
<div class="oal-comps-l-card-right ml-2 p-1">
<p class="section-regular-text-b">Disney+</p>
<p class="section-regular-text opacity-80 oal-state">${disneyPlusActivity.details || " "}</p>
</div>
</div>
</div>`;
} else {
    disneyPlusWatching.innerHTML = ``;
  document.getElementById("disneyPlusWatching").style.display = "none";
}

  setInterval(function () {

    if (api.d.listening_to_spotify == true) {

    var countDownDate = new Date(api.d.spotify.timestamps.end).getTime();
    var now = new Date().getTime();
    var distance = countDownDate - now;
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var spotify_time = minutes + "m " + seconds + "s "

      var artist = `${
        api.d.spotify.artist.split(";")[0].split(",")[0]
      }`;
      var song = `${
        api.d.spotify.song.split("(")[0]
      }`;
      spotifyListening.innerHTML = `
      <a href="https://open.spotify.com/track/${api.d.spotify.track_id}" target="_blank">
      <div class="oal-comps-l-card rounded-cxl mt-3">
      <div class=" rounded-cxl">
      <div class="oal-comps-l-card-left">
      <img draggable="false" src="assets/img/spotify.png" alt="IMG" class="img-65 rounded-cxl" width="65" height="65">
      </div>
      <div class="oal-comps-l-card-right ml-2 p-1">
      <p class="section-regular-text-b">Spotify</p>
      <p class="section-regular-text opacity-80 oal-state">${song || " "} (${spotify_time || "0m 0s"})</p>
      </div>
      </div>
      </div>
      </a>`;
    } else {
      spotifyListening.innerHTML = ``;
      document.getElementById("spotifyListening").style.display = "none";
    }

  }, 1000); //removed: animate__animated animate__flash

  if (api.d.discord_status === "dnd") {
    statusContent.innerHTML = `<span class="w-3 h-3 bg-red-500 rounded-full inline-flex ml-1 mr-2"></span>Online`;

  } else if (api.d.discord_status === "idle") {
    statusContent.innerHTML = `<span class="w-3 h-3 bg-yellow-500 rounded-full inline-flex ml-1 mr-2"></span>Online`;

  } else if (api.d.discord_status === "online") {
    statusContent.innerHTML = `<span class="w-3 h-3 bg-green-500 rounded-full inline-flex ml-1 mr-2"></span>Online`;

  } else if (api.d.discord_status === "offline") {
    statusContent.innerHTML = `<span class="w-3 h-3 bg-gray-500 rounded-full inline-flex ml-1 mr-2"></span>Offline`;

  } else {
    statusContent.innerHTML = `<span class="w-3 h-3 bg-gray-500 rounded-full inline-flex ml-1 mr-2"></span>Loading`;

  }

}