const pieceUnicode = {
  blank: ".",
  p: "\u265F",
  n: "\u265E",
  b: "\u265D",
  r: "\u265C",
  q: "\u265B",
  k: "\u265A",
  P: "\u2659",
  N: "\u2658",
  B: "\u2657",
  R: "\u2656",
  Q: "\u2655",
  K: "\u2654",
};

class ASCIIBoard {
  constructor() {
    // const position = fen.split(" ")[0];
    // const colorToMove = fen.split(" ")[1] || null;
    const position = "7p/6Q1/8/8/8/8/8/8";
    const ranks = position.split("/");

    const mainDiv = document.querySelector("div.asciiChess");
    const rankDivs = new Array(8).fill();
    const squares = new Array(64).fill().map((square, i) => {
      const p = document.createElement("p");
      p.classList.add("asciiChess");
      return p;
    });

    const ranksWithPieces = ranks.map((rank) => {
      const rankInfo = rank.split("");
      return rankInfo
        .map((info) => {
          const number = parseInt(info);
          if (number) {
            return new Array(number).fill("blank");
          }
          return info;
        })
        .flat();
    });

    squares.forEach((square, i) => {
      const rankIndex = Math.floor(i / 8);
      const columnIndex = i % 8;

      const rank = ranksWithPieces[rankIndex];
      const piece = rank[columnIndex];
      const color = (rankIndex + columnIndex) % 2 == 0 ? "light" : "dark";
      square.classList.add(color);

      if (piece == "blank") square.classList.add("blank");
      square.innerText = pieceUnicode[piece];

      if (columnIndex == 0) {
        const rankDiv = document.createElement("div");
        rankDiv.classList.add("boardRank");
        rankDivs[rankIndex] = rankDiv;
        mainDiv.appendChild(rankDiv);
      }
      rankDivs[rankIndex].appendChild(square);
    });
  }
}
