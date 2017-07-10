/**
 * Created by tolmach on 09.07.17.
 */
import { Figure } from './figure';

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export class Cube extends Figure {
    constructor(tetris, left = getRandomInt(0, 10)) {
        super(tetris, [
            {
                cord: [0, left],
                upheaval: [1, 2]
            },
            {
                cord: [0, left + 1],
                upheaval: [2, 3]
            },
            {
                cord: [1, left],
                upheaval: [0, 1]
            },
            {
                cord: [1, left + 1],
                upheaval: [0, 3]
            }
        ], true);
    }
}

export class AngleReverse extends Figure {
    constructor(tetris, left = getRandomInt(0, 9)) {
        super(tetris, [
            {
                cord: [1, left + 1],
                upheaval: [3, 1],
                canOverturn: true
            },
            {
                cord: [0, left + 2],
                upheaval: [2],
                canOverturn: false
            },
            {
                cord: [1, left],
                upheaval: [1],
                canOverturn: false
            },
            {
                cord: [1, left + 2],
                upheaval: [0, 3],
                canOverturn: false
            }
        ]);
    }
}

export class Angle extends Figure {
    constructor(tetris, left = getRandomInt(0, 9)) {
        super(tetris, [
            {
                cord: [1, left + 1],
                upheaval: [3, 1],
                canOverturn: true
            },
            {
                cord: [0, left],
                upheaval: [2],
                canOverturn: false
            },
            {
                cord: [1, left],
                upheaval: [0, 1],
                canOverturn: false
            },
            {
                cord: [1, left + 2],
                upheaval: [3],
                canOverturn: false
            }
        ]);
    }
}
export class Balk extends Figure {
    constructor(tetris, left = getRandomInt(0, 8)) {
        super(tetris, [
            {
                cord: [1, left + 1],
                upheaval: [1, 3],
                canOverturn: true
            },
            {
                cord: [1, left],
                upheaval: [1],
                canOverturn: false
            },
            {
                cord: [1, left + 2],
                upheaval: [1, 3],
                canOverturn: false
            },
            {
                cord: [1, left + 3],
                upheaval: [3],
                canOverturn: false
            }
        ]);
    }
}

export class Scaffold extends Figure {
    constructor(tetris, left = getRandomInt(1, 10)) {
        super(tetris, [
            {
                cord: [1, left],
                upheaval: [0, 1, 3],
                canOverturn: true
            },
            {
                cord: [0, left],
                upheaval: [2],
                canOverturn: true
            },
            {
                cord: [1, left - 1],
                upheaval: [1],
                canOverturn: false
            },
            {
                cord: [1, left + 1],
                upheaval: [3],
                canOverturn: true
            }
        ]);
    }
}