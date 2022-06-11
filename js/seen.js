const seenEl = document.querySelector('#lastseen');

function updateSeen() {
    fetch("https://api.github.com/users/tusharmurali/events").then(response => response.text()).then(response => {
        let json = JSON.parse(response);
        lastSeen = json.find(event => event.type === "PushEvent")
        if (lastSeen.repo) {
            seenEl.innerHTML = `I was last seen working on <a href="http://github.com/${lastSeen.repo.name}" class="d" target="_blank"
            style="color:#949494;">${lastSeen.repo.name.split("/")[1]}<span class="underline" style="background-color:#949494;"></span></a>.`;
        } else {
            seenEl.innerText = "I'm not working on anything right now."
        }
    }).catch(console.log);
}

setInterval(updateSeen, 60 * 1000);
updateSeen();