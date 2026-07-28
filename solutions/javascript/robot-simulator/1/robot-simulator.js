const DIRECTIONS = ['north', 'east', 'south', 'west'];

const MOVES = {
  north: [0, 1],
  east: [1, 0],
  south: [0, -1],
  west: [-1, 0],
};

export class InvalidInputError extends Error {
  constructor(message) {
    super();
    this.message = message || 'Invalid Input';
  }
}

export class Robot {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.direction = 'north';
  }

  get bearing() {
    return this.direction;
  }

  get coordinates() {
    return [this.x, this.y];
  }

  place({ x, y, direction }) {
    if (!DIRECTIONS.includes(direction)) {
      throw new InvalidInputError('Invalid direction');
    }
    if (!Number.isInteger(x) || !Number.isInteger(y)) {
      throw new InvalidInputError('Invalid coordinates');
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  turnRight() {
    const index = DIRECTIONS.indexOf(this.direction);
    this.direction = DIRECTIONS[(index + 1) % 4];
  }

  turnLeft() {
    const index = DIRECTIONS.indexOf(this.direction);
    this.direction = DIRECTIONS[(index + 3) % 4];
  }

  advance() {
    const [dx, dy] = MOVES[this.direction];
    this.x += dx;
    this.y += dy;
  }

  evaluate(instructions) {
    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      switch (instruction) {
        case 'R':
          this.turnRight();
          break;
        case 'L':
          this.turnLeft();
          break;
        case 'A':
          this.advance();
          break;
        default:
          throw new InvalidInputError('Invalid instruction');
      }
    }
  }
}
