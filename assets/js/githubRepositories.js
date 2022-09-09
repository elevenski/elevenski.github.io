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
      <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || elevenvac}')" class="card rounded-xl h-full">
          <div class="p-3 flex space-x-2 items-center overflow-hidden">
              <p class="normalText opacity-90">${data.name || "No data"}</p>
              <p class="thinText sectionTopRightText rounded-xl p-2 opacity-80"><i class="fa-regular fa-star"></i> &nbsp; ${data.stargazers_count || "0"}</p>
          </div>
          <div class="smallText p-3 cardNoMT opacity-80">${data.description || "<i>No description or website provided.</i>"}</div>
      </div>
        `;
    });
  });
  
  /*
      <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || elevenvac}')" class="oal-comps-xl-card rounded-cxl mt-3">
          <p class="section-regular-text-b oal-comps-xl-card-link">elevenvac/</a>${data.full_name || "No data"}</p>
          <p class="section-regular-text opacity-80">${data.language || "Undefined"} <span class="ml-1 mr-1">•</span> ${data.stargazers_count || "0"}
              Stars <span class="ml-1 mr-1">•</span> ${data.forks || "0"} Forks</p>
          <p class="section-regular-text opacity-80">${data.description || "<i>No description or website provided.</i>"}</p>
      </div>
  */