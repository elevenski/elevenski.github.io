window.addEventListener('DOMContentLoaded', async function () {
  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  const emojis = await get('https://api.github.com/emojis');
  const colors = await get('https://raw.githubusercontent.com/ozh/github-colors/master/colors.json');

  document.querySelectorAll('.githubCard').forEach(async function (el) {
    const name = el.getAttribute('data-repo');
    const data = await get(`https://api.github.com/repos/${name}`);

    data.description = (data.description || '').replace(/:\w+:/g, function (match) {
      const name = match.substring(1, match.length - 1);
      const emoji = emojis[name];

      if (emoji) {
        return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
      }

      return match;
    });

    el.innerHTML = `
      <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || elevenski}?utm_source=eleven.js.org')" class="card rounded-custom h-full">
          <div class="p-4 space-x-2 items-center overflow-hidden">
              <p id="left" class="normalText opacity-80">${data.name || "elevenski"}</p>
              <p id="right" class="normalText opacity-60"><i class="fa-solid fa-star mr-1"></i> ${data.stargazers_count || "0"}</p>
          </div>
      </div>
        `;
  });
});

/*
          <div class="normalText p-4 cardNoMT opacity-60">${data.description || "<i>No description or website provided.</i>"}</div>


    <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || elevenvac}')" class="oal-comps-xl-card rounded-cxl mt-3">
        <p class="section-regular-text-b oal-comps-xl-card-link">elevenvac/</a>${data.full_name || "No data"}</p>
        <p class="section-regular-text opacity-80">${data.language || "Undefined"} <span class="ml-1 mr-1">•</span> ${data.stargazers_count || "0"}
            Stars <span class="ml-1 mr-1">•</span> ${data.forks || "0"} Forks</p>
        <p class="section-regular-text opacity-80">${data.description || "<i>No description or website provided.</i>"}</p>
    </div>
*/