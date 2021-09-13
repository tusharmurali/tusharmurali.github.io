const seenEl = document.querySelector('#lastseen');

function updateSeen() {
    fetch("https://api.github.com/users/tusharmurali/events").then(response => response.text()).then(response => {
        let json = JSON.parse(response);
        if (json[0].repo) {
            seenEl.innerHTML = `I was last seen working on <a href="http://github.com/${json[0].repo.name}" class="d" target="_blank"
            style="color:#949494;">${json[0].repo.name.split("/")[1]}<span class="underline" style="background-color:#949494;"></span></a>.`;
        } else {
            seenEl.innerText = "I'm not working on anything right now."
        }
    }).catch(console.log);
}

setInterval(updateSeen, 60 * 1000);
updateSeen();