// import { Phrase } from './Phrase.js';
// import { Presentation } from './Presentation.js';
// import { Statistics } from './Statistics.js';
// import { Clock } from './Clock.js';


class Game {
    constructor() {
        this.letters = document.querySelectorAll(".alphabetContainer button");
        this.btnNext = document.querySelector(".next");
        this.btnStats = document.querySelector(".stats");
        this.passedLetters = 0;
        this.gameTime = 0;
        this.catLives = 5;
        this.result;
        this.start();
    }

    setPhrase() {
        this.phrase = Phrase.getPhrase();
        this.phrasesToGuess = Phrase.getPhrasesNumber()
        this.presentation.createPhraseElements(this.phrase);
        this.phraseSpaces = this.phrase.split(" ").length - 1;
        this.phraseLetters = this.phrase.length - this.phraseSpaces;
        this.phraseElements = document.querySelectorAll('.phraseContainer .word div');
    }

    checkLetter(ev) {
        console.log("pppp");
        if (ev.target.classList.contains("active")) {
            let phrase = this.phrase.toUpperCase();
            ev.target.style.cursor = "default";
            ev.target.classList.remove('active');
            if (phrase.includes(ev.target.textContent)) {
                ev.target.classList.add('passLetter');
                for (let i = 0; i < phrase.length; i++) {
                    if (ev.target.textContent === phrase[i]) {
                        this.phraseElements[i].innerHTML = phrase[i];
                        this.passedLetters++;
                    }
                }
                if (this.passedLetters === this.phraseLetters) {
                    this.result = 1;
                    this.finishPhraseGuess();
                } else {
                    this.presentation.startCatAnimation();
                }
            } else {
                ev.target.classList.add('failLetter');
                this.removeCatLife();
                this.presentation.cryCat();
            }
        }
    }

    removeCatLife() {
        this.catLives -= 1;
        this.presentation.removeCatLife();
        if (this.catLives === 0) {
            this.result = 0;
            this.presentation.showPhrase(this.phrase, this.phraseElements);
            this.finishPhraseGuess();
        }
    }

    finishPhraseGuess() {
        this.gameTime = this.clock.getTime();
        this.clock.clear();
        this.statistics.addGameToStatistics(this.phrase, this.gameTime, this.catLives, this.result);
        this.presentation.finalView(this.result, this.btnNext, this.btnStats);
        this.letters.forEach(letter => {
            letter.removeEventListener("click", this.checkLetter);
            letter.classList.remove('active');
        });
        if (this.phrasesToGuess === 0) {
            this.presentation.endGame(this.btnNext);
            this.btnNext.style.display = "none";
        }
    }

    nextPhrase() {
        this.passedLetters = 0;
        this.catLives = 5;
        this.presentation.removePhraseElements();
        this.letters.forEach(letter => {
            letter.classList.add('active');
            letter.classList.remove('passLetter');
            letter.classList.remove('failLetter');
            letter.style.cursor = "pointer";
        });
        this.presentation.resetStyles(this.btnNext, this.btnStats);
        this.setPhrase();
        this.letters.forEach(letter => letter.addEventListener("click", this.checkLetter));
        this.clock = new Clock();
    }

    start() {
        this.presentation = new Presentation();
        this.presentation.headerAnimation();
        this.setPhrase();
        this.statistics = new Statistics();
        this.letters.forEach(litera => litera.addEventListener("click", ev => this.checkLetter(ev)));
        this.clock = new Clock();
        this.btnNext.addEventListener("click", ev => this.nextPhrase(ev));
        this.btnStats.addEventListener("click", () => this.statistics.showGameStatistics());
    }
}

new Game();