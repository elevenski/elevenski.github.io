//var statusIcon = document.getElementById("statusIcon");
var spotifyListening = document.getElementById("spotifyListening");
var visualStudioCodePlaying = document.getElementById("visualStudioCodePlaying");
var netflixWatching = document.getElementById("netflixWatching");
var disneyPlusWatching = document.getElementById("disneyPlusWatching");
var activitiesStatus = document.getElementById("activitiesStatus");

const lanyard = new WebSocket("wss://api.lanyard.rest/socket");

var api = {};
var received = false;

lanyard.onopen = function () {
  lanyard.send(
    JSON.stringify({
      op: 2,
      d: {
        subscribe_to_id: "692681908873723965",
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
  /*if (statusIcon != null) {
    update_status(api.d.discord_status);
  }*/

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

    if (api.d.listening_to_spotify == true) {

      var countDownDate = new Date(api.d.spotify.timestamps.end).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      var spotify_time = minutes + "m " + seconds + "s "

      /*var artist = `${api.d.spotify.artist.split(";")[0].split(",")[0]
        }`;*/
      //var artist = `${api.d.spotify.artist}`;
      var artist = api.d.spotify.artist.replace(/\;/g, ",");
      /*var song = `${api.d.spotify.song.split("(")[0]
        }`;*/
      var song = `${api.d.spotify.song}`;
      spotifyListening.innerHTML = `
      <a href="https://open.spotify.com/track/${api.d.spotify.track_id}?si=155eeb7c98204d8e&utm_source=eleven.js.org" target="_blank">
      <div class="card rounded-custom h-full">
          <div class="p-4 flex space-x-2 items-center overflow-hidden">
              <img draggable="false" src="${api.d.spotify.album_art_url || "/assets/img/spotify.png"}" alt="IMG" class="rounded-custom cardImage"
                  width="60" height="60">
              <p class="normalText ml-3 opacity-80">${song || "Spotify"}<br><span class="normalText opacity-60">${artist || "Unknown"}</span></p>
          </div>
      </div>
      </a>`;
    } else {
      spotifyListening.innerHTML = ``;
      document.getElementById("spotifyListening").style.display = "none";
    }

  if (api.d.discord_status === "dnd") {
    discordStatus.innerHTML = `<div class="discordStatusDnd"></div>`;

  } else if (api.d.discord_status === "idle") {
    discordStatus.innerHTML = `<div class="discordStatusIdle"></div>`;

  } else if (api.d.discord_status === "online") {
    discordStatus.innerHTML = `<div class="discordStatusOnline"></div>`;

  } else if (api.d.discord_status === "offline") {
    discordStatus.innerHTML = `<div class="discordStatusOffline"></div>`;

  } else {
    discordStatus.innerHTML = `<div class="discordStatusOffline"></div>`;

  }

  setInterval(function () {
    if (api.d.listening_to_spotify == false && api.d.activities.find(activity => activity.application_id == disneyPlusAppID) == undefined && api.d.activities.find(activity => activity.application_id == netflixAppID) == undefined && api.d.activities.find(activity => activity.application_id == vsCodeAppID) == undefined) {
      activitiesStatus.innerHTML = `<span class="normalText opacity-80">There are currently no activity.</span>`;
    } else {
      activitiesStatus.innerHTML = ``;
      document.getElementById("activitiesStatus").style.display = "none";
    }
  }, 1000) // biraz sıkıntılı gibi gibi

}
