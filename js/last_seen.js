const seenEl = document.querySelector('#lastseen');

function updateSeen() {
    fetch("https://api.github.com/users/tusharmurali/events")
  .then(response => {
    if (!response.ok) throw new Error("Network response was not ok");
    return response.json();
  })
  .then(json => {
    if (!Array.isArray(json)) return;

    const lastSeen = json.find(event => event.type === "PushEvent");
    if (lastSeen && lastSeen.repo) {
      seenEl.innerHTML = `I was last seen working on <a href="http://github.com/${lastSeen.repo.name}" class="d gray" target="_blank">${lastSeen.repo.name.split("/")[1]}<span class="underline gray-bg"></span></a>.`;
    } else {
      seenEl.innerText = "I'm not working on anything right now.";
    }
  })
  .catch(() => {});

}

setInterval(updateSeen, 60 * 1000);
updateSeen();