const Theme = {
    availableThemes: ['pink', 'blue', 'green', 'purple'],

    currentTheme: document.body.getAttribute('data-theme') ?? availableThemes[0],

    setTheme: (theme) => {
        document.body.setAttribute('data-theme', theme);

        Theme.currentTheme = theme;

        Theme.save();
    },

    cycleTheme: () => {
        let idx = Theme.availableThemes.indexOf(Theme.currentTheme);

        if (++idx > Theme.availableThemes.length - 1) idx = 0;

        Theme.setTheme(Theme.availableThemes[idx]);
    },

    save: () => {
        localStorage.setItem('theme', Theme.currentTheme);
    },

    load: () => {
        const savedTheme = localStorage.getItem('theme') ?? Theme.availableThemes[0];

        Theme.setTheme(savedTheme);
    }
}

Theme.load();