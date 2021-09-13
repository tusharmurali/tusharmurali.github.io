const seenEl = document.querySelector('#lastseen');

function updateSeen() {
    fetch("https://api.github.com/users/tusharmurali/events").then(response => response.text()).then(response => {
        let json = JSON.parse(r);
        if (json[0].repo) {
            // if (json[0].repo.url)
                // Please no XSS
                seenEl.innerHTML = `I was last seen working on <a href="http://github.com/${json[0].repo.name}" class="d" target="_blank"
                style="color:#949494;">${json[0].repo.name.split("/")[1]}<span class="underline" style="background-color:#949494;"></span></a>.`;
            // else
            //     seenEl.innerText = 'I was last seen working on ' + json[0].repo.name.split("/")[1] + '.';
        } else {
            seenEl.innerText = "I'm not working on anything right now."
        }
    }).catch(console.log);
    // fetch('seen.json?nocache=' + Math.random().toString().substring(2)).then(r => r.text()).then(r => {
    //     let json = JSON.parse(r);
    //     if (json.project) {
    //         if (json.project_href)
    //             // Please no XSS
    //             seenEl.innerHTML = `I was last seen working on <a href="${json.project_href}" class="d" target="_blank"
    //             style="color:#949494;">${json.project}<span class="underline" style="background-color:#949494;"></span></a>.`;
    //         else
    //             seenEl.innerText = 'I was last seen working on ' + json.project + '.';
    //     } else {
    //         seenEl.innerText = "I'm not working on anything right now."
    //     }
    // }).catch(console.log);
}

setInterval(updateSeen, 60 * 1000);
updateSeen();