window.addEventListener('DOMContentLoaded', async function () {
  const username = "elevenski";
  const container = document.querySelector('#githubReposContainer');
  const repoStatusEl = document.getElementById('repoStatus');

  async function get(url) {
    const resp = await fetch(url);
    return resp.json();
  }

  const [repos, emojis] = await Promise.all([
    get(`https://api.github.com/users/${username}/repos?per_page=100`),
    get('https://api.github.com/emojis')
  ]);

  const filtered = repos
    .filter(repo => repo.stargazers_count > 2)
    .sort((a, b) => b.stargazers_count - a.stargazers_count);

  filtered.forEach(repo => {
    const desc = (repo.description || '').replace(/:\w+:/g, function (match) {
      const name = match.substring(1, match.length - 1);
      const emoji = emojis[name];
      if (emoji) {
        return `<span><img src="${emoji}" style="width: 1rem; height: 1rem; vertical-align: -0.2rem;"></span>`;
      }
      return match;
    });

    const card = document.createElement('div');
    card.className = "githubCard";
    card.innerHTML = `
      <div data-id="${repo.full_name}" onclick="window.open('${repo.html_url}?utm_source=eleven.js.org')" class="card rounded-custom h-full cursor-pointer">
        <div class="p-4">
         <div class="space-x-2 items-center overflow-hidden">
          <p id="left" class="normalText opacity-80">${repo.name}</p>
          <p id="right" class="normalText opacity-70">
            <i class="fa-light fa-star mr-1"></i> ${repo.stargazers_count}
          </p>
          </div>
          <p class="mt-2 normalText opacity-60">
            ${repo.description || 'No description.'}
          </p>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  if (repoStatusEl) {
  repoStatusEl.remove(); // veya loadingEl.style.display = "none";
}
});


/*

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

*/



/*
          <div class="normalText p-4 cardNoMT opacity-60">${data.description || "<i>No description or website provided.</i>"}</div>


    <div data-id="${data.full_name || 'NOT_FOUND'}" onclick="window.open('https://github.com/${data.full_name || elevenvac}')" class="oal-comps-xl-card rounded-cxl mt-3">
        <p class="section-regular-text-b oal-comps-xl-card-link">elevenvac/</a>${data.full_name || "No data"}</p>
        <p class="section-regular-text opacity-80">${data.language || "Undefined"} <span class="ml-1 mr-1">•</span> ${data.stargazers_count || "0"}
            Stars <span class="ml-1 mr-1">•</span> ${data.forks || "0"} Forks</p>
        <p class="section-regular-text opacity-80">${data.description || "<i>No description or website provided.</i>"}</p>
    </div>
*/