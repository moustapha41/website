document.addEventListener('DOMContentLoaded', () => {
    // Éléments du chronomètre
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const millisecondsElement = document.getElementById('milliseconds');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resetBtn = document.getElementById('resetBtn');
    const themeToggle = document.getElementById('theme-toggle');
    const languageSelect = document.getElementById('language-select');

    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;

    // Traductions
    const translations = {
        fr: {
            start: "Démarrer",
            stop: "Arrêter",
            reset: "Réinitialiser",
            firewall: "Pare-feu Actif",
            encryption: "Chiffrement 256-bit",
            network: "Réseau Sécurisé"
        },
        en: {
            start: "Start",
            stop: "Stop",
            reset: "Reset",
            firewall: "Firewall Active",
            encryption: "256-bit Encryption",
            network: "Secure Network"
        }
    };

    // Fonction pour mettre à jour les traductions
    function updateTranslations(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            element.textContent = translations[lang][key];
        });
        
        // Mettre à jour les boutons
        if (isRunning) {
            startBtn.textContent = translations[lang].start;
            stopBtn.textContent = translations[lang].stop;
            resetBtn.textContent = translations[lang].reset;
        } else {
            startBtn.textContent = translations[lang].start;
            stopBtn.textContent = translations[lang].stop;
            resetBtn.textContent = translations[lang].reset;
        }
    }

    // Gestion du thème
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }

    // Initialisation du thème
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    }

    // Gestion du changement de langue
    function changeLanguage() {
        const lang = languageSelect.value;
        localStorage.setItem('language', lang);
        updateTranslations(lang);
    }

    // Initialisation de la langue
    const savedLanguage = localStorage.getItem('language') || 'fr';
    languageSelect.value = savedLanguage;
    updateTranslations(savedLanguage);

    // Événements
    themeToggle.addEventListener('change', toggleTheme);
    languageSelect.addEventListener('change', changeLanguage);

    // Fonctions du chronomètre
    function startTimer() {
        if (!isRunning) {
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(updateTimer, 10);
            isRunning = true;
        }
    }

    function stopTimer() {
        if (isRunning) {
            clearInterval(timerInterval);
            isRunning = false;
        }
    }

    function resetTimer() {
        clearInterval(timerInterval);
        elapsedTime = 0;
        updateDisplay();
        isRunning = false;
    }

    function updateTimer() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime;
        updateDisplay();
    }

    function updateDisplay() {
        const hours = Math.floor(elapsedTime / 3600000);
        const minutes = Math.floor((elapsedTime % 3600000) / 60000);
        const seconds = Math.floor((elapsedTime % 60000) / 1000);
        const milliseconds = elapsedTime % 1000;

        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        millisecondsElement.textContent = milliseconds.toString().padStart(3, '0');
    }

    // Événements des boutons
    startBtn.addEventListener('click', startTimer);
    stopBtn.addEventListener('click', stopTimer);
    resetBtn.addEventListener('click', resetTimer);

    // Effet de scan
    const scanLines = document.querySelectorAll('.scan-line');
    scanLines.forEach((line, index) => {
        line.style.animationDelay = `${index * 2}s`;
    });
});