<template>
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <h1>Hi, I'm Eleven</h1>
        <h2>Student, Full-stack Developer & Founder @ Rise Development</h2>
        <div class="links text-center items-center">
          <a target="_blank" href="https://github.com/elevenvac">GitHub</a>
          <a target="_blank" href="https://discord.com/users/689169122604744833">Discord</a>
          <a target="_blank" href="https://www.twitch.tv/elevenvac">Twitch</a>
          <a target="_blank" href="https://www.youtube.com/c/Elevenvac">YouTube</a>
          <a target="_blank" href="https://twitter.com/elevenvac">Twitter</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import"https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;500;700;900&display=swap";

body {
  background-color: #0d0d12;
  padding: 0;
  margin: 0;
  font-family: "Inter";
}

.outer {
  display: table;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  color: white;
  text-align: center;
}

.inner a {
  text-decoration: none;
  color: #272932;
  font-weight: bold;
  margin: 10px;
  transition: 0.2s;
}

.inner a:hover {
  color: #374151;
}

.links {
  display: flex;
}

@media screen and (max-width: 420px) {
  .links {
    display: block;
  }
}
</style>
