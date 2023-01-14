var statusIcon = document.getElementById("statusIcon");
var discordStatus = document.getElementById("discordStatus");
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
    var vsCodeDetails = vsCodeActivity.details
    var vsCodeState = vsCodeActivity.state

    visualStudioCodePlaying.innerHTML = `
    <a href="javascript:void(0)">
    <div class="card rounded-xl h-full">
        <div class="p-3 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="/assets/img/visualStudioCode.svg" alt="IMG" class="rounded-xl"
                width="50" height="50">
            <p class="normalText ml-3 opacity-90">VS Code<br><span class="smallText opacity-80">${vsCodeState || "<i>No data</i>"}</span></p>
            <p class="thinText sectionTopRightText rounded-xl p-2 opacity-80">${vsCodeDetails || "<i>No data</i>"}</p>
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
  <div class="card rounded-xl h-full">
      <div class="p-3 flex space-x-2 items-center overflow-hidden">
          <img draggable="false" src="/assets/img/netflix.png" alt="IMG" class="rounded-xl"
              width="50" height="50">
          <p class="normalText ml-3 opacity-90">Netflix<br><span class="smallText opacity-80">${netflixActivity.details || "<i>No data</i>"}</span></p>
          <p class="thinText sectionTopRightText rounded-xl p-2 opacity-80">${netflixActivity.state || "<i>No data</i>"}</p>
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
    <div class="card rounded-xl h-full">
        <div class="p-3 flex space-x-2 items-center overflow-hidden">
            <img draggable="false" src="/assets/img/disneyPlus.png" alt="IMG" class="rounded-xl"
                width="50" height="50">
            <p class="normalText ml-3 opacity-90">Disney+<br><span class="smallText opacity-80">${disneyPlusActivity.details || "<i>No data</i>"}</span></p>
            <p class="thinText sectionTopRightText rounded-xl p-2 opacity-80">${disneyPlusActivity.state || "<i>No data</i>"}</p>
        </div>
    </div>
    </a>`;
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

      var artist = `${api.d.spotify.artist.split(";")[0].split(",")[0]
        }`;
      var song = `${api.d.spotify.song.split("(")[0]
        }`;
      spotifyListening.innerHTML = `
      <a href="https://open.spotify.com/track/${api.d.spotify.track_id}" target="_blank">
      <div class="card rounded-xl h-full">
          <div class="p-3 flex space-x-2 items-center overflow-hidden">
              <img draggable="false" src="${api.d.spotify.album_art_url}" alt="IMG" class="rounded-xl"
                  width="50" height="50">
              <p class="normalText ml-3 opacity-90">Spotify<br><span class="smallText opacity-80">${song || "<i>No data</i>"}</span></p>
              <p class="thinText sectionTopRightText rounded-xl p-2 opacity-80">left ${spotify_time || "0m 0s"}</p>
          </div>
      </div>
      </a>`;
    } else {
      spotifyListening.innerHTML = ``;
      document.getElementById("spotifyListening").style.display = "none";
    }

  }, 1000); //removed: animate__animated animate__flash

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
      activitiesStatus.innerHTML = `<i class="smallText opacity-80">There are currently no activity</i>`;
    } else {
      activitiesStatus.innerHTML = ``;
      document.getElementById("activitiesStatus").style.display = "none";
    }
  }, 1000) // biraz sıkıntılı gibi gibi

}