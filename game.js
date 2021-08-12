const checkSnake = (pos) => pos > 0 && pos % 9 === 0;
const checkLadder = (pos) => [25, 55].includes(pos);
const checkOverflowNearEnd = (pos) => pos > 100;
const sleep = (time) => new Promise((res) => setTimeout(() => res(time), time));

const rollDice = () => {
  return new Promise(async (res) => {
    await sleep(1000);
    res(Math.floor(Math.random() * 6) + 1);
  });
};

const calculateNewPosition = ({ currPos, proposedPos }) => {
  if (checkSnake(proposedPos)) return proposedPos - 3;
  else if (checkLadder(proposedPos)) return proposedPos + 10;
  else if (checkOverflowNearEnd(proposedPos)) return currPos;

  return proposedPos;
};

const start = async (browser = true) => {
  let currPos = 1;
  browser && (await draw(currPos));
  browser && (await clear(currPos));

  while (currPos !== 100) {
    const diceFace = await rollDice();
    const proposedPos = currPos + diceFace;
    const isSnake = checkSnake(proposedPos);
    const isLadder = checkLadder(proposedPos);
    const isOverflowNearEnd = checkOverflowNearEnd(proposedPos);

    browser && !isOverflowNearEnd && (await draw(proposedPos));
    browser && !isOverflowNearEnd && (await clear(proposedPos));

    const newPos = calculateNewPosition({ currPos, proposedPos });

    await logToConsole({ currPos, newPos, isSnake, isLadder, diceFace });
    browser && (await log({ currPos, newPos, isSnake, isLadder, diceFace }));
    browser && (await draw(newPos));
    browser && (await clear(newPos));

    currPos = newPos;
  }
};

const logToConsole = ({ currPos, newPos, isSnake, isLadder }) => {
  return new Promise((res) => {
    const text = `${currPos} - ${
      isSnake ? "snake" : isLadder ? "ladder" : ""
    }${newPos}`;
    console.log(text);
    res(text);
  });
};

const log = ({ currPos, newPos, isSnake, isLadder, diceFace }) => {
  return new Promise((res) => {
    const text = `[Rolled ${diceFace}]: ${currPos} - ${
      isSnake ? "snake" : isLadder ? "ladder" : ""
    }${newPos}`;
    const para = document.createElement("p");
    const node = document.createTextNode(`${text}`);
    para.appendChild(node);
    const consoleSection = document.getElementById("console");
    consoleSection.appendChild(para);
    consoleSection.scrollTop = consoleSection.scrollHeight;
    res(text);
  });
};

const clear = (pos) => {
  return new Promise(async (res) => {
    await sleep(500);
    const square = document.getElementById(`square-${pos}`);
    square.className = checkSnake(pos)
      ? "snake-square"
      : checkLadder(pos)
      ? "ladder-square"
      : "";
    return res();
  });
};

const draw = (pos) => {
  return new Promise(async (res) => {
    const square = document.getElementById(`square-${pos}`);
    square.className = "player-square";
    return res();
  });
};

const populateBoard = () => {
  const table = document.createElement("table");
  let id = 100;
  for (let i = 0; i < 10; i++) {
    const tr = document.createElement("tr");
    const flip = (i + 1) % 2 === 0;
    const toFlip = [];
    for (let j = 0; j < 10; j++) {
      const td = document.createElement("td");
      const isSnake = checkSnake(id);
      const isLadder = checkLadder(id);
      td.id = `square-${id}`;
      td.className = isSnake ? "snake-square" : isLadder ? "ladder-square" : "";
      td.innerText = id;
      toFlip.push(td);
      id--;
    }
    flip ? tr.append(...toFlip.reverse()) : tr.append(...toFlip);
    table.appendChild(tr);
  }
  document.getElementById("board").appendChild(table);
};

try {
  window.onload = (event) => { populateBoard() };
} catch {
  console.log("No window available to draw board.");
}

try {
  module.exports = { start, checkSnake, checkLadder, checkOverflowNearEnd, calculateNewPosition };
} catch {
  console.log("Not running within Node JS");
}
