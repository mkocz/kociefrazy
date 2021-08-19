//import { Animation, animations } from './Animation.js';

class Presentation {
    constructor() {
        this.headerText = "Podaj frazy z kociej bazy";
        this.spanHeader = document.querySelector("h1");
        this.buttons = document.querySelector(".buttons");
        this.phraseContainer = document.querySelector(".phraseContainer");
        this.livesContainer = document.querySelector(".livesContainer");
        this.lives = document.querySelectorAll(".livesContainer div");
        this.cat = document.querySelector('svg');
        this.catOpacity = 1;
        this.finalTxt = document.querySelector(".finalInfo");
        this.timer = document.querySelector(".timer");
        this.tears = document.querySelectorAll('.tear');
        this.animationIndex;
    }

    headerAnimation() {
        this.addLetter = this.addLetterStart();
        this.indexTyping = setInterval(this.addLetter, 100);
    }

    addLetterStart() {
        let index = 0;
        return () => {
            this.spanHeader.textContent += this.headerText[index];
            index++;
            if (index === this.headerText.length) {
                clearInterval(this.indexTyping);
            }
        }
    }

    createPhraseElements(phrase) {
        let wordElement = document.createElement("div");
        wordElement.classList.add("word");
        this.phraseContainer.appendChild(wordElement);
        for (let i = 0; i < phrase.length; i++) {
            let charElement = document.createElement("div");
            wordElement.appendChild(charElement);
            if (phrase[i] == " ") {
                charElement.classList.add("empty");
                charElement.innerText = "*";
                wordElement = document.createElement('div');
                wordElement.classList.add("word");
                this.phraseContainer.appendChild(wordElement);
            } else {
                charElement.classList.add("letter");
                charElement.innerText = "_";
            }
        }
    }

    removeCatLife() {
        let life = document.querySelectorAll(".alive")[0];
        life.classList.remove('alive');
        this.catOpacity = this.catOpacity - 0.2;
        this.cat.style.opacity = this.catOpacity;
    }

    showPhrase(phrase, phraseElements) {
        phraseElements.forEach((letter, index) => {
            if (letter.textContent === "_") {
                letter.textContent = phrase[index].toUpperCase();
                letter.style.color = "darkred";
            }
        });
    }

    startGrow() {
        let repeat = 0;
        return () => {
            this.finalTxt.classList.toggle('grow');
            repeat++;
            if (repeat === 8) {
                clearInterval(this.indexGrowing);
            }
        }
    }

    finalView(result, btnNext, btnStats) {
        if (result) {
            this.finalTxt.textContent = "Brawo Ty!";
            this.finalTxt.classList.add('pass');
            this.startCatAnimation(result);
        } else {
            this.finalTxt.textContent = "Straciłeś kocie życia!";
            this.finalTxt.classList.add('fail');
        }
        this.grow = this.startGrow();
        this.indexGrowing = setInterval(this.grow, 300);
        this.finalTxt.style.opacity = 1;
        btnNext.style.display = "block";
        btnStats.style.display = "block";
        this.livesContainer.style.display = "none";
    }

    removePhraseElements() {
        while (this.phraseContainer.firstChild) {
            this.phraseContainer.removeChild(this.phraseContainer.firstChild);
        }
    }

    resetStyles(btnNext, btnStats) {
        this.finalTxt.textContent = "";
        this.finalTxt.style.opacity = 0;
        this.finalTxt.classList.remove('pass');
        this.finalTxt.classList.remove('fail');
        this.livesContainer.style.display = "flex";
        this.timer.style.display = "block";
        btnNext.style.display = "none";
        btnStats.style.display = "none";
        this.lives.forEach(life => life.classList.add('alive'));
        this.timer.textContent = "00:00";
        this.catOpacity = 1;
        this.cat.style.opacity = this.catOpacity;
    }

    endGame() {
        this.spanHeader.textContent = "Koniec gry!";
    }

    cryCat() {
        const eyeIndex = Math.floor(Math.random() * 2);
        Animation.cryCat(this.tears[eyeIndex]);
    }

    animateCat(result) {
        const tweens = TweenMax.getAllTweens();
        for (let tween of tweens) {
            if (tween.isActive()) {
                return;
            }
        }
        clearInterval(this.indexTweenning);
        if (result === 1) {
            Animation.finalDance();
        } else {
            this.animationIndex = Math.floor(Math.random() * animations.length);
            animations[this.animationIndex]();
        }
    }

    startCatAnimation(result = 0) {
        this.indexTweenning = setInterval(this.animateCat(result), 300);
    }

}