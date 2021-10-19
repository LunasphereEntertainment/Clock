class DateFormatter {
    constructor(lang) {
        this._selectedLanguage = lang || "eng";
        this._language = {
            daysOfWeek: [],
            months: []
        }

        this.loadLanguage();
    }

    setLanguage(lang) {
        this._selectedLanguage = lang;
    }

    loadLanguage(onsuccess) {
        const self = this;

        fetch(`/dates.${this._selectedLanguage}.json`).then((res) => {
            res.json().then((language) => {

                self._language = language;
                // /lang = language;
                // update();
                if (typeof onsuccess === "function") {
                    onsuccess();
                }
            });
        })
    }

    _getDateEnding(dayOfMonth) {
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

    format(date) {
        const dayOfWeek = this._language.daysOfWeek[date.getDay()] || date.getDay(),
            dayOfMonth = date.getDate(),
            monthName = this._language.months[date.getMonth()] || date.getMonth(),
            year = date.getFullYear(),
            ending = this._getDateEnding(dayOfMonth) || '';

        return `${dayOfWeek} &nbsp; ${dayOfMonth}${ending} &nbsp; ${monthName} ${year}`
    }
}
