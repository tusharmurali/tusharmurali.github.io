let header = document.querySelector('#intro');
let anim = [
    { t: " ", ms: 200 },
    { t: "_", ms: 200 },
    { t: " ", ms: 200 },
    { t: "_", ms: 200 },
    { t: "T_", ms: 100 },
    { t: "TU_", ms: 100 },
    { t: "TUS_", ms: 100 },
    { t: "TUSH_", ms: 100 },
    { t: "TUSHA_", ms: 100 },
    { t: "TUSHAR_", ms: 100 },
    { t: "TUSHAR _", ms: 100 },
    { t: "TUSHAR M_", ms: 100 },
    { t: "TUSHAR MU_", ms: 100 },
    { t: "TUSHAR MUR_", ms: 100 },
    { t: "TUSHAR MURA_", ms: 100 },
    { t: "TUSHAR MURAL_", ms: 100 },
    { t: "TUSHAR MURALI_", ms: 100 },
    { t: "TUSHAR MURALID_", ms: 100 },
    { t: "TUSHAR MURALIDH_", ms: 100 },
    { t: "TUSHAR MURALIDHA_", ms: 100 },
    { t: "TUSHAR MURALIDHAR_", ms: 100 },
    { t: "TUSHAR MURALIDHARA_", ms: 100 },
    { t: "TUSHAR MURALIDHARAN_", ms: 100 },
    { t: "TUSHAR MURALIDHARAN\u00A0", ms: 200 },
    { t: "TUSHAR MURALIDHARAN_", ms: 200 },
    { t: "TUSHAR MURALIDHARAN\u00A0", ms: 200 },
    { t: "TUSHAR MURALIDHARAN_", ms: 200 },
    { t: "TUSHAR MURALIDHARAN", ms: 200 },
    { t: "TUSHAR MURALIDHARAN", ms: 200 }
];

let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator;

let i = 0;
let update = () => {
    let step = anim[i];
    header.innerText = step.t;
    i++;

    if (i < anim.length)
        setTimeout(update, step.ms / stepDenominator);
    else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            anim1();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
}
update();