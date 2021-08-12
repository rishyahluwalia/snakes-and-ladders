const {
  checkSnake,
  checkLadder,
  checkOverflowNearEnd,
  calculateNewPosition,
} = require("./game.js");

console.log(
  "checkSnake() corectly determines if the specified position is a snake: ",
  [
    checkSnake(0) === false,
    checkSnake(9) === true,
    checkSnake(15) === false,
    checkSnake(18) === true,
    checkSnake(27) === true,
    checkSnake(100) === false,
  ].every((val) => val === true)
    ? "PASSED"
    : "FAILED"
);

console.log(
  "checkLadder() corectly determines if the specified position is a ladder: ",
  [
    checkLadder(0) === false,
    checkLadder(10) === false,
    checkLadder(25) === true,
    checkLadder(40) === false,
    checkLadder(55) === true,
    checkLadder(100) === false,
  ].every((val) => val === true)
    ? "PASSED"
    : "FAILED"
);

console.log(
  "checkOverflowNearEnd() corectly determines if the specified position went beyond 100: ",
  [
    checkOverflowNearEnd(0) === false,
    checkOverflowNearEnd(10) === false,
    checkOverflowNearEnd(91) === false,
    checkOverflowNearEnd(99) === false,
    checkOverflowNearEnd(100) === false,
    checkOverflowNearEnd(105) === true,
  ].every((val) => val === true)
    ? "PASSED"
    : "FAILED"
);

const snakePos = {
  currPos: 7,
  proposedPos: 9,
};

const ladderPos = {
  currPos: 20,
  proposedPos: 25,
};

const overflowPos = {
  currPos: 96,
  proposedPos: 102,
};

const normalPos = {
  currPos: 70,
  proposedPos: 76,
};

console.log(
  "calculateNewPosition() corectly calculates the next position for the player: ",
  [
    calculateNewPosition(snakePos) === 6,
    calculateNewPosition(ladderPos) === 35,
    calculateNewPosition(overflowPos) === 96,
    calculateNewPosition(normalPos) === 76,
  ].every((val) => val === true)
    ? "PASSED"
    : "FAILED"
);
