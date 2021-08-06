const sleep = (time) => new Promise((res) => setTimeout(() => res(time), time));
const log = ({ currPos, newPos, isSnake, isLadder, diceFace }) =>
  console.log(
    `[Rolled ${diceFace}]: ${currPos} - ${
      isSnake ? "snake" : isLadder ? "ladder" : ""
    }${newPos}`
  );

const start = async () => {
  let currPos = 1;

  while (currPos !== 100) {
    await sleep(500);

    const diceFace = Math.floor(Math.random() * 6) + 1;
    let newPos = currPos + diceFace;
    const isSnake = newPos % 9 === 0;
    const isLadder = [25, 55].includes(newPos);
    const isOverflowNearEnd = newPos > 100;

    if (isSnake) newPos -= 3;
    else if (isLadder) newPos += 10;
    else if (isOverflowNearEnd) newPos = currPos;

    log({ currPos, newPos, isSnake, isLadder, diceFace });
    currPos = newPos;
  }
};

start();
