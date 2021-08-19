class Statistics {
    constructor() {
        this.gameResults = [];
        this.spanHeader = document.querySelector("h1");
        this.divStats = document.querySelector(".statistics");
        this.stats = document.querySelector(".phrases");
        this.btnStatsClose = document.querySelector(".close");
        this.tableCreated = false;
    }

    createTable() {
        this.stats.innerHTML = '';
        this.table = document.createElement('table');
        this.thead = document.createElement('thead');
        this.thead.innerHTML = '<tr><th>Fraza</th><th>czas</th><th>życia</th><th>rezultat</th></tr>';
        this.tbody = document.createElement('tbody');
        this.table.appendChild(this.thead);
        this.table.appendChild(this.tbody);
        this.stats.appendChild(this.table);
        this.tableCreated = true;
    }

    addGameToStatistics(phrase, time, lifes, result) {
        let gameResult = {
            phrase: phrase,
            time: time,
            lifes: lifes,
            result: result
        }
        this.gameResults.push(gameResult);
        if (this.tableCreated === false) {
            this.createTable();
        }
        //   const resultIcon = result ? '<i class="icon-ok"></i>' : '<i class="icon-cancel"></i>';
        const resultIcon = result ? '<i class="fas fa-check"></i>' : '<i class="icon-cancel"></i>';
        let row = document.createElement('tr');
        row.innerHTML = `<td>${phrase}</td><td>${time}</td><td>${lifes}</td><td>${resultIcon}</td>`;
        this.tbody.appendChild(row);
    }

    showGameStatistics() {
        this.divStats.classList.remove('hideStats');
        this.btnStatsClose.addEventListener("click", () => this.divStats.classList.add('hideStats'));
    }

}