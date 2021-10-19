const langs = ["eng"];
let selectedLanguage = langs[0],
    lang = null;


function loadLanguage() {
    fetch(`/dates.${selectedLanguage}.json`).then((res) => {
        res.json().then((language) => {
            lang = language;
            update();
        });
    })
}

loadLanguage();

function getDateEnding(dayOfMonth) {
    if (dayOfMonth < 11 || dayOfMonth > 19) {
        if (dayOfMonth.toString().endsWith("1")) {
            return "st";
        } else if (dayOfMonth.toString().endsWith("2")) {
            return "nd";
        } else if (dayOfMonth.toString().endsWith("3")) {
            return "rd";
        }
    }
    return "th";
}

let currentTime = new Date(),
    timeOut = document.getElementById("timeReadout"),
    dateOut = document.getElementById("dateReadout");

function pad(text, len) {
    if (arguments.length < 2) {
        len = 2;
    }
    if (typeof text !== "string") {
        text = text.toString();
    }

    while (text.length < len) {
        text = "0" + text;
    }

    return text;
}

function updateTime() {
    currentTime = new Date();
}

function updateDigital() {
    const hours = pad(currentTime.getHours()),
        mins = pad(currentTime.getMinutes()),
        secs = pad(currentTime.getSeconds());

    timeOut.innerHTML = `${hours} : ${mins} : ${secs}`;

    if (lang) {
        const dayOfWeek = lang.daysOfWeek[currentTime.getDay()],
            dayOfMonth = currentTime.getDate(),
            monthName = lang.months[currentTime.getMonth()],
            year = currentTime.getFullYear(),
            ending = getDateEnding(dayOfMonth);

        dateOut.innerHTML = `${dayOfWeek} &nbsp; ${dayOfMonth}${ending} &nbsp; ${monthName} ${year}`;
    }
}

function updateAnalog() {
    const
        hourPercent = currentTime.getHours() / 12,
        minPercent = currentTime.getMinutes() / 60,
        hourHand = document.getElementById("hours"),
        minHand = document.getElementById("minutes"),

        hourDegrees = simplifyRotation(hourPercent * 360),
        minuteDegrees = simplifyRotation(minPercent * 360);

    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    minHand.style.transform = `rotate(${minuteDegrees}deg)`;
}

function update() {
    updateTime();

    updateDigital();

    updateAnalog();
}

// update();

window.setInterval(update, 1000);
