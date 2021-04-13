class Challenge {
  constructor(args) {
    const { direction, perspective, time, coordinates, hoverEffect } = args;

    const config = {
      position: "start",
      showNotation: coordinates,
      draggable: false,
    };
    this.totalTime = time;
    this.hoverEffect = hoverEffect;

    this.playDataDiv = document.querySelector("div.playData");
    this.direction = direction;
    this.board = new Board({ div: "board1", config });
    if (!!this.playDataDiv.querySelector("p")) {
      this.clearPlayDataDiv();
    }
    this.createPlayDataDiv();
    if (perspective === "black") {
      this.board.flip();
    }
  }

  clearPlayDataDiv = () => {
    Array.from(this.playDataDiv.children).map((div) =>
      this.playDataDiv.removeChild(div)
    );
  };

  createPlayDataDiv = () => {
    this.score = document.createElement("p");
    this.playDataDiv.appendChild(this.score);
    this.timer = document.createElement("p");
    this.playDataDiv.appendChild(this.timer);
  };

  setupChallenge = async () => {
    await this.board.displayCountdown();
    if (!["rows", "columns"].includes(this.direction)) {
      console.error("direction must be passed");
      return;
    }

    if (this.hoverEffect) {
      this.board.loadHovers(this.direction);
    }
    const cueOverlay = document.createElement("div");
    cueOverlay.classList.add("cue");

    const boardDiv = document.querySelector("#board1");
    boardDiv.classList.add("positionRelative");
    boardDiv.appendChild(cueOverlay);

    let points = 0;
    let tries = 0;
    this.score.innerText = `${points}/${tries}`;
    let gameover = false;
    this.board.squares().forEach((square) => {
      Array.from(square.children).forEach((child) =>
        child.classList.add("notClickable")
      );
    });

    const startTurn = () =>
      new Promise((resolve, reject) => {
        cueOverlay.classList.remove("hidden");
        const startTime = Date.now();
        const endTime = startTime + this.totalTime;
        let time = this.totalTime;

        let stringTime = time.toString().padStart(5, 0);
        this.timer.innerText = `00:${stringTime.slice(0, 2)}.${stringTime.slice(
          2
        )}`;
        const countTimer = () => {
          time = endTime - Date.now();
          stringTime = time.toString().padStart(5, 0);
          this.timer.innerText = `00:${stringTime.slice(
            0,
            2
          )}.${stringTime.slice(2)}`;
          if (time < this.totalTime / 2) {
            cueOverlay.classList.add("hidden");
          }
          if (time <= 0) {
            gameover = true;
            clearTimeout(timerInterval);
            return resolve(gameover);
          }
          timerInterval = setTimeout(countTimer, 10);
        };
        let timerInterval = setTimeout(countTimer, 10);

        const coordinates =
          this.direction === "columns" ? "abcdefgh" : "12345678";
        const cue = coordinates[Math.floor(Math.random() * coordinates.length)];
        cueOverlay.innerText = cue;

        this.board.squares().forEach((square) => {
          square.onclick = (e) => {
            cueOverlay.classList.add("hidden");
            tries += 1;
            if (e.target.getAttribute(this.direction) === cue) {
              points += 1;
            } else {
              if (tries - points === 3) {
                gameover = true;
              }
            }
            this.score.innerText = `${points}/${tries}`;
            clearTimeout(timerInterval);
            return resolve(gameover);
          };
        });
      });

    const delayTurn = () => {
      return new Promise(async (resolve) => {
        const wait = new Promise((res) => setTimeout(res, 100));
        await wait;
        return resolve(startTurn);
      });
    };

    do {
      const turn = await delayTurn();
      await turn();
    } while (!gameover);
    alert("GameOver");
    cueOverlay.innerText = "";
    boardDiv.removeChild(cueOverlay);

    this.board.squares().forEach((square) => {
      square.onclick = () => {};
    });
  };
}
