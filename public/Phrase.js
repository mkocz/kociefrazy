const phrases = [
    "Żyć jak pies z kotem",
    "Drzeć z kimś koty",
    "Biegać jak kot z pęcherzem",
    "Kupić kota w worku",
    "Tyle co kot napłakał",
    "Obracać kota ogonem",
    "Napędzić komuś kota",
    "Bawić się w kotka i myszkę",
    "Pierwsze koty za płoty",
    "Gdy kota nie ma myszy harcują"
];

class Phrase {
    static getPhrase() {
        let index = Math.floor(Math.random() * phrases.length);
        let phrase = phrases[index];
        phrases.splice(index, 1);
        console.log(phrase)
        return phrase;

    }

    static getPhrasesNumber() {
        return phrases.length;
    }
}