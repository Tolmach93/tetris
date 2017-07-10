const upheaval = {'up': [0, -1, 0], 'right': [1, 0, 1], 'down': [2, 1, 0], 'left': [3, 0, -1]};
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const widthMap = 'calc(calc(30vw) + calc(30vh))';
const getRandomColor = () => {
    let arrayRgb = [getRandomInt(0, 255), getRandomInt(0, 255), getRandomInt(0, 255)];
    for (; 540 < arrayRgb[0] + arrayRgb[1] + arrayRgb[2];) {
        let index = getRandomInt(0, 2);
        arrayRgb[index] = getRandomInt(0, arrayRgb[index] - 1);
    }
    return `rgb(${arrayRgb[0]}, ${arrayRgb[1]}, ${arrayRgb[2]})`
};
const map = new Array(13);
for (let i = 0; i < map.length; i++) {
    map[i] = new Array(12);
    for (let z = 0; z < map[i].length; z++) {
        map[i][z] = null;
    }
} // Создали карту
export {map}
export class Figure {
    constructor(tetris, dots, neverOverturn = false) {
        let color = getRandomColor();
        this.neverOverturn = neverOverturn;
        let end = false;
        this.dots = dots.map(dot => {
            if(end || map[dot.cord[0]][dot.cord[1]]) return end = true;
            let block = document.createElement('div');
            block.classList.add('block');
            block.style.top = 'calc(' + widthMap + ' / 12 * ' + (dot.cord[0] - 1) + ')';
            block.style.left = 'calc(' + widthMap + ' / 12 * ' + dot.cord[1] + ')';
            block.style.background = color;
            map[dot.cord[0]][dot.cord[1]] = block;
            dot.node = block;
            tetris.appendChild(block);
            return dot;
        });
        this.end = end;
    }

    canMove(direction) {
        return this.dots.every(dot => {
            return ~dot.upheaval.indexOf(upheaval[direction][0])
                || (map[upheaval[direction][1] + dot.cord[0]]
                && map[upheaval[direction][1] + dot.cord[0]][upheaval[direction][2] + dot.cord[1]] === null);
        });
    }

    move(direction) {
        if (direction === 'overturn') return this.overturn();
        if (!this.canMove(direction)) return false;
        return this.dots.every(dot => {
            map[dot.cord[0]][dot.cord[1]] = dot.node === map[dot.cord[0]][dot.cord[1]] ? null : map[dot.cord[0]][dot.cord[1]];
            map[dot.cord[0] = dot.cord[0] + upheaval[direction][1]][dot.cord[1] = dot.cord[1] + upheaval[direction][2]] = dot.node;
            dot.node.style.top = 'calc(' + widthMap + ' / 12 * ' + (dot.cord[0] - 1) + ')';
            dot.node.style.left = 'calc(' + widthMap + ' / 12 * ' + dot.cord[1] + ')';
            return true;
        });
    }

    canOverturn() {
        if (this.neverOverturn) return false;
        return this.dots.every((dot, index, dots) => {
            if (index === 0) return true;
            let top = dot.cord[0] + (dots[0].cord[1] - dot.cord[1]) + (dots[0].cord[0] - dot.cord[0]);
            let left = (dot.cord[1] - (dots[0].cord[0] - dot.cord[0])) + (dots[0].cord[1] - dot.cord[1]);
            return dot.canOverturn
                || (map[top]
                && map[top][left] === null);
        });
    }

    overturn() {
        if (!this.canOverturn()) {
            return false;
        }
        this.dots.forEach((dot, index, dots) => {
            dot.upheaval = dot.upheaval.map(pos => pos ? pos - 1 : 3);
            if (index === 0) return;
            let top = dot.cord[0] + (dots[0].cord[1] - dot.cord[1]) + (dots[0].cord[0] - dot.cord[0]);
            let left = (dot.cord[1] - (dots[0].cord[0] - dot.cord[0])) + (dots[0].cord[1] - dot.cord[1]);
            map[dot.cord[0]][dot.cord[1]] = dot.node === map[dot.cord[0]][dot.cord[1]] ? null : map[dot.cord[0]][dot.cord[1]];
            map[dot.cord[0] = top][dot.cord[1] = left] = dot.node;
            dot.node.style.top = 'calc(' + widthMap + ' / 12 * ' + (dot.cord[0] - 1) + ')';
            dot.node.style.left = 'calc(' + widthMap + ' / 12 * ' + dot.cord[1] + ')';
        });
    }
}