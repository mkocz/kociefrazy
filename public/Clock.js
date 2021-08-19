class Clock {
    constructor() {
        this.timer = document.querySelector(".timer");
        this.seconds = 0;
        this.indexTiming = setInterval(this.startClock.bind(this), 1000);
    }

    startClock() {
        this.seconds++;
        this.minutes = Math.floor(this.seconds / 60);
        const minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
        const seconds = (this.seconds % 60) < 10 ? "0" + (this.seconds % 60) : (this.seconds % 60);
        this.timer.textContent = minutes + ":" + seconds;
    }

    getTime() {
        if (this.minutes) {
            return this.minutes + "min " + (this.seconds % 60) + "s"
        } else {
            return this.seconds + "s";
        }
    }

    clear() {
        clearInterval(this.indexTiming);
    }

}