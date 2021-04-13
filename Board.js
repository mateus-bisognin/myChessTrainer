class Board {
  constructor(args) {
    const { div, config } = args;
    this.board = Chessboard(div, config);
    this.loadSquareAttributes();
  }

  displayCountdown = () => {
    return new Promise((resolve) => {
      const overlay = document.createElement("div");
      overlay.classList.add("overlay");

      const board = document.querySelector("#board1");
      board.appendChild(overlay);
      board.classList.add("positionRelative");

      let i = 3;

      overlay.textContent = i;

      const countdown = () => {
        if (i > 0) {
          setTimeout(countdown, 1000);
          overlay.textContent = i;

          i -= 1;
        } else {
          board.removeChild(overlay);
          return resolve();
        }
      };
      countdown();
    });
  };
  flip = () => {
    this.board.flip();
    this.loadSquareAttributes();
  };
  squares = () =>
    Array.from($("div")).filter((div) => div.hasAttribute("data-square"));
  rows = () =>
    Array(8)
      .fill()
      .map((row, index) => {
        return this.squares().filter(
          (square) =>
            square.getAttribute("data-square").indexOf(index + 1) !== -1
        );
      });
  columns = () =>
    Array(8)
      .fill()
      .map((column, index) => {
        const files = "abcdefgh";
        return this.squares().filter(
          (square) =>
            square.getAttribute("data-square").indexOf(files[index]) !== -1
        );
      });

  loadHovers = (direction) => {
    if (direction === "rows") {
      this.rows().forEach((row) => {
        row.forEach((square) => {
          const highlightDiv = document.createElement("div");
          highlightDiv.classList.toggle("hoverSquare");

          square.onmouseover = () => {
            row.forEach((s) => s.classList.add("hoverSquare"));
          };
          square.onmouseleave = () => {
            row.forEach((s) => s.classList.remove("hoverSquare"));
          };
        });
      });
    }

    if (direction === "columns") {
      this.columns().forEach((column) => {
        column.forEach((square) => {
          const highlightDiv = document.createElement("div");
          highlightDiv.classList.toggle("hoverSquare");

          square.onmouseover = () => {
            column.forEach((s) => s.classList.add("hoverSquare"));
          };
          square.onmouseleave = () => {
            column.forEach((s) => s.classList.remove("hoverSquare"));
          };
        });
      });
    }
  };

  loadSquareAttributes = () => {
    this.squares().forEach((square) => {
      const column = square.getAttribute("data-square")[0];
      const row = square.getAttribute("data-square")[1];
      square.setAttribute("columns", column);
      square.setAttribute("rows", row);
    });
  };
}
