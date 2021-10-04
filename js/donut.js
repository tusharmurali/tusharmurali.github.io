// Code by Andy Sloane
// https://www.a1k0n.net/2021/01/13/optimizing-donut.html
(function() {
    const _onload = function () {
        document.getElementById('donut').style.marginBottom = (window.innerHeight - (main.clientTop + main.clientHeight)) / 2 + "px";
        const pretag = document.getElementById('d');
        let tmr1 = undefined;
        let cA = 1, sA = 0, cB = 0, sB = 1;

        // This is copied, pasted, reformatted, and ported directly from my original
        // donut.c code
        const R = function (tanangle, x, y) {
            let tmp = x;
            x -= tanangle * y;
            y += tanangle * tmp;
            tmp = (3 - x * x - y * y) / 2; // renormalize w/ Newton step
            x *= tmp;
            y *= tmp;
            return [x, y];
        };

        const asciiframe = function () {
            const b = [];
            const z = [];
            let xy = R(.04, cA, sA);
            cA = xy[0];
            sA = xy[1];
            xy = R(.02, cB, sB);
            cB = xy[0];
            sB = xy[1];
            for (let k = 0; k < 1760; k++) {
                b[k] = k % 80 === 79 ? "\n" : " ";
                z[k] = 0;
            }
            let sj = 0, cj = 1;
            for (let j = 0; j < 90; j++) {
                let si = 0, ci = 1;
                for (let i = 0; i < 314; i++) {
                    const h = cj + 2,
                        D = 1 / (si * h * sA + sj * cA + 5),
                        t = si * h * cA - sj * sA;

                    const x = 0 | (40 + 30 * D * (ci * h * cB - t * sB)),
                        y = 0 | (12 + 15 * D * (ci * h * sB + t * cB)),
                        o = x + 80 * y,
                        N = 0 | (8 * ((sj * sA - si * cj * cA) * cB - si * cj * sA - sj * cA - ci * cj * sB));
                    if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
                        z[o] = D;
                        b[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
                    }
                    xy = R(.02, ci, si);
                    ci = xy[0];
                    si = xy[1];
                }
                xy = R(.07, cj, sj);
                cj = xy[0];
                sj = xy[1];
            }
            pretag.innerHTML = b.join("");
        };

        window.anim1 = function () {
            if (tmr1 === undefined) {
                tmr1 = setInterval(asciiframe, 50);
            } else {
                clearInterval(tmr1);
                tmr1 = undefined;
            }
        };

        asciiframe();
    };

    if(document.all)
        window.attachEvent('onload',_onload);
    else
        window.addEventListener("load",_onload,false);
})();