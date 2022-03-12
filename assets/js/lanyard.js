var statusIcon = document.getElementById("statusIcon");
var statusContent = document.getElementById("statusContent");
var spotifyListening = document.getElementById("spotifyListening");

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

  if (api.d.listening_to_spotify == true) {
    var artist = `${
      api.d.spotify.artist.split(";")[0].split(",")[0]
    }`;
    var song = `${
      api.d.spotify.song.split("(")[0]
    }`;
    spotifyListening.innerHTML = `<a href="https://open.spotify.com/track/${api.d.spotify.track_id}" target="_blank" class="text-black ml-1"><i class="fa-brands fa-spotify text-green-500 mr-2"></i>Listening ${song} by ${artist}</a>`;
  } else {
    spotifyListening.innerHTML = ``;
  }

}