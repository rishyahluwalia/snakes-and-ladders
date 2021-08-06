const checkSnake = (pos) => pos % 9 === 0;
const checkLadder = (pos) => [25, 55].includes(pos);
const checkOverflowNearEnd = (pos) => pos > 100;

const sleep = (time) => new Promise((res) => setTimeout(() => res(time), time));

const start = async () => {
  let currPos = 1;
  await draw(currPos);
  await clear({ pos: currPos });

  while (currPos !== 100) {
    await sleep(1000);

    const diceFace = Math.floor(Math.random() * 6) + 1;
    let newPos = currPos + diceFace;

    const isSnake = checkSnake(newPos);
    const isLadder = checkLadder(newPos);
    const isOverflowNearEnd = checkOverflowNearEnd(newPos);

    !isOverflowNearEnd && (await draw(newPos));
    !isOverflowNearEnd && (await clear({ pos: newPos, isSnake, isLadder }));

    if (isSnake) newPos -= 3;
    else if (isLadder) newPos += 10;
    else if (isOverflowNearEnd) newPos = currPos;

    await log({ currPos, newPos, isSnake, isLadder, diceFace });
    await draw(newPos);
    newPos !== 100 && (await clear({ pos: newPos }));

    currPos = newPos;
  }
};

const log = ({ currPos, newPos, isSnake, isLadder, diceFace }) => {
  return new Promise((res) => {
    const text = `[Rolled ${diceFace}]: ${currPos} - ${
      isSnake ? "snake" : isLadder ? "ladder" : ""
    }${newPos}`;
    console.log(text);
    const para = document.createElement("p");
    const node = document.createTextNode(`${text}`);
    para.appendChild(node);
    const consoleSection = document.getElementById("console");
    consoleSection.appendChild(para);
    consoleSection.scrollTop = consoleSection.scrollHeight;
    res(text);
  });
};

const clear = ({ pos, isSnake = false, isLadder = false }) => {
  return new Promise(async (res) => {
    await sleep(500);
    const square = document.getElementById(`square-${pos}`);
    square.className = isSnake
      ? "snake-square"
      : isLadder
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
    console.log({ flip });
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

window.onload = (event) => {
  populateBoard();
};
