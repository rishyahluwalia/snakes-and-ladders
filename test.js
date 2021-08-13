const {
  checkSnake,
  checkLadder,
  checkOverflowNearEnd,
  calculateNewPosition,
} = require("./game.js");

const describe = (description, test) => {
  console.log(`\n${description}:`);
  test();
};
const it = (description, conditions) => {
  const passed = conditions.every((test) => !!test);
  console.log(`${description}: ${passed ? "PASSED" : "FAILED"}`);
};

describe("checkSnake()", () => {
  it("corectly determines if the specified position is a snake", [
    checkSnake(0) === false,
    checkSnake(9) === true,
    checkSnake(15) === false,
    checkSnake(18) === true,
    checkSnake(27) === true,
    checkSnake(100) === false,
  ]);
});

describe("checkLadder()", () => {
  it("corectly determines if the specified position is a ladder", [
    checkLadder(0) === false,
    checkLadder(10) === false,
    checkLadder(25) === true,
    checkLadder(40) === false,
    checkLadder(55) === true,
    checkLadder(100) === false,
  ]);
});

describe("checkOverflowNearEnd()", () => {
  it("corectly determines if the specified position went beyond 100", [
    checkOverflowNearEnd(0) === false,
    checkOverflowNearEnd(10) === false,
    checkOverflowNearEnd(91) === false,
    checkOverflowNearEnd(99) === false,
    checkOverflowNearEnd(100) === false,
    checkOverflowNearEnd(105) === true,
  ]);
});

describe("calculateNewPosition()", () => {
  const snakePos = { currPos: 7, proposedPos: 9 };
  const ladderPos = { currPos: 20, proposedPos: 25 };
  const overflowPos = { currPos: 96, proposedPos: 102 };
  const normalPos = { currPos: 70, proposedPos: 76 };

  it("calculates the next position for the player with a snake position", [ calculateNewPosition(snakePos) === 6 ]);
  it("calculates the next position for the player with a ladder position", [ calculateNewPosition(ladderPos) === 35 ]);
  it("calculates the next position for the player with an overflow position", [ calculateNewPosition(overflowPos) === 96 ]);
  it("calculates the next position for the player with a normal position", [ calculateNewPosition(normalPos) === 76 ]);
});
