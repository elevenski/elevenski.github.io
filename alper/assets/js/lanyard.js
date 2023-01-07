var statusIcon = document.getElementById("statusIcon");
var discordStatus = document.getElementById("discordStatus");
var spotify = document.getElementById("spotify");
var netflix = document.getElementById("netflix");
var disneyPlus = document.getElementById("disneyPlus");
var csgo = document.getElementById("csgo");

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

  var csgoAppID = "356875057940791296"
  var csgoActivity = api.d.activities.find(activity => activity.application_id == csgoAppID)

  if (csgoActivity) {

    csgo.innerHTML = `
  <div class="card rounded-xl h-full mb-3">
      <div class="p-3 flex space-x-2 items-center overflow-hidden">
          <img draggable="false" src="assets/img/csgo.jpeg" alt="IMG" class="rounded-xl"
              width="50" height="50">
          <p class="normalText ml-3">Steam'de <span class="normalText"><b>${csgoActivity.name || "<i>İsim Bulunamadı</i>"}</b></span> Oynuyor...</p>
      </div>
  </div>`;
  } else {
    csgo.innerHTML = ``;
    document.getElementById("csgo").style.display = "none";
  }

  var netflixAppID = "926541425682829352"
  var netflixActivity = api.d.activities.find(activity => activity.application_id == netflixAppID)

  if (netflixActivity) {
    var netflixImage = netflixActivity.assets.large_image
    var netflixImageLink = netflixImage.substring(netflixImage.indexOf("https/"));
    var netflixImageLinkRevised = netflixImageLink.replace('https/', 'https://');

    netflix.innerHTML = `
  <div class="card rounded-xl h-full mb-3">
      <div class="p-3 flex space-x-2 items-center overflow-hidden">
          <img draggable="false" src="assets/img/netflix.png" alt="IMG" class="rounded-xl"
              width="50" height="50">
          <p class="normalText ml-3">Netflix'de <span class="normalText"><b>${netflixActivity.details || "<i>İçerik Bulunamadı</i>"}</b></span> izliyor...</p>
      </div>
  </div>`;
  } else {
    netflix.innerHTML = ``;
    document.getElementById("netflix").style.display = "none";
  }

  var disneyPlusAppID = "630236276829716483"
  var disneyPlusActivity = api.d.activities.find(activity => activity.application_id == disneyPlusAppID)

  if (disneyPlusActivity) {
    disneyPlus.innerHTML = `
    <div class="card rounded-xl h-full mb-3">
        <div class="p-3 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="assets/img/disneyPlus.png" alt="IMG" class="rounded-xl"
                width="50" height="50">
            <p class="normalText ml-3">Disney+'da <span class="normalText"><b>${disneyPlusActivity.details || "<i>İçerik Bulunamadı</i>"}</b></span> izliyor...</p>
        </div>
    </div>`;
  } else {
    disneyPlus.innerHTML = ``;
    document.getElementById("disneyPlus").style.display = "none";
  }

  setInterval(function () {

    if (api.d.listening_to_spotify == true) {

      var countDownDate = new Date(api.d.spotify.timestamps.end).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var spotify_time = minutes + "d " + seconds + "s "

      var artist = `${api.d.spotify.artist.split(";")[0].split(",")[0]
        }`;
      var song = `${api.d.spotify.song.split("(")[0]
        }`;
      spotify.innerHTML = `
      <a href="https://open.spotify.com/track/${api.d.spotify.track_id}" target="_blank">
      <div class="card rounded-xl h-full mb-3">
          <div class="p-3 flex space-x-2 items-center overflow-hidden">
              <img draggable="false" src="${api.d.spotify.album_art_url}" alt="IMG" class="rounded-xl"
                  width="50" height="50">
              <p class="normalText ml-3">Spotify'da <span class="normalText"><b>${song || "<i>Müzik Bulunamadı</i>"}</b></span> dinliyor...</p>
              <span class="normalText p-2">${spotify_time || "0d 0s"}</span>
          </div>
      </div>
      </a>`;
    } else {
        spotify.innerHTML = ``;
      document.getElementById("spotify").style.display = "none";
    }

  }, 1000);

  if (api.d.discord_status === "dnd") {
    discordStatus.innerHTML = `Çevrimiçi`;

  } else if (api.d.discord_status === "idle") {
    discordStatus.innerHTML = `Çevrimiçi`;

  } else if (api.d.discord_status === "online") {
    discordStatus.innerHTML = `Çevrimiçi`;

  } else if (api.d.discord_status === "offline") {
    discordStatus.innerHTML = `Çevrimdışı`;

  } else {
    discordStatus.innerHTML = `Çevrimdışı`;

  }

}
