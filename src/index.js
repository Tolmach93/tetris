/**
 * Created by tolmach on 06.06.17.
 */

import './style.css';
import {map} from './figure';
import mp3Theme from './theme.mp3';
import checkMapAudio from './nes-11-05.wav';
import * as objects from './objects';
let mainTheme = document.createElement('audio');
mainTheme.setAttribute('autoplay', 'autoplay');
mainTheme.setAttribute('loop', 'loop');
mainTheme.src = mp3Theme;
document.getElementsByTagName('body')[0].appendChild(mainTheme);
let audioEffect = document.createElement('audio');
audioEffect.setAttribute('autoplay', 'autoplay');
document.getElementsByTagName('body')[0].appendChild(audioEffect);

const widthMap = 'calc(calc(30vw) + calc(30vh))';
const playAudio = audio => {
    audioEffect.src = '';
    audioEffect.src = audio;
};

const tetris = document.getElementById('tetris');

const getRandomInt = (min, max, without) => {
    let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!without || without.indexOf(randomInt) === -1) return randomInt;
    for (let i = randomInt; i <= max; i++) {
        if (without.indexOf(i) === -1) return i;
        if (i === max) i = min - 1;
    }
};

let block = {};
let timer = null;
let historyBlocks = []; // История блоков

let speed = 500;

function createBlock() {
    let objectKeys = Object.keys(objects);
    if (historyBlocks.length === objectKeys.length) historyBlocks = [];
    let index = getRandomInt(0, objectKeys.length - 1, historyBlocks);
    historyBlocks.push(index);
    block = new objects[objectKeys[index]](tetris);
    if (!block.end) {
        timer = setTimeout(move, speed = speed - 10, block);
    } else {
        alert("Вы проиграли! Ваш счёт " + score.innerHTML + ' очков!');
        clearMap();
    }
}
function clearMap() {
    for (let i = 0; i < map.length; i++) {
        let row = map[i];
        for (let j = 0; j < row.length; j++) {
            if (row[j]) {
                row[j].remove();
                row[j] = null;
            }
        }
    }
    speed = 500;
    score.innerHTML = 0;
    createBlock();
}
function move() {
    if (block.move('down')) {
        timer = setTimeout(move, speed, block);
    } else {
        checkMap();
    }
}
const score = document.getElementById('score');
function checkMap() {
    map.forEach((row, index) => {
        if (row.every(cell => cell)) {
            speed = speed + 30;
            map[index] = map[index].map(block => {
                block.remove();
                return null;
            });
            for (let i = index - 1; i >= 0; i--) {
                map[i] = map[i].map((block, index) => {
                    if (block) {
                        block.style.top = 'calc(' + block.style.top + ' + calc(' + widthMap + ' / 12)';
                        map[i + 1][index] = block;
                    }
                    return null;
                });
            }
            playAudio(checkMapAudio);
            score.innerHTML = +score.innerHTML + 50;
        }
    });
    createBlock();
}
createBlock();

let speedObject = {};
for (let i = 37; i < 41; i++) {
    speedObject[i] = {
        direction: i === 37 ? 'left' : i === 38 ? 'overturn' : i === 39 ? 'right' : 'down',
        timer: null,
        timer2: null
    }
}
speedObject.nowPress = null;
let goMoreDown = () => {
    clearTimeout(timer);
    move();
};

let onKeyUp = (event) => {
    if (speedObject.nowPress !== event.keyCode) return;
    document.onkeydown = onKeyDown;
    document.onkeyup = null;
    clearTimeout(speedObject[event.keyCode].timer);
    clearInterval(speedObject[event.keyCode].timer2);
    if (!speedObject[event.keyCode].timer2) {
        if (speedObject[event.keyCode].direction === 'down') {
            goMoreDown();
        } else {
            block.move(speedObject[event.keyCode].direction);
        }
    }
    speedObject[event.keyCode].timer = null;
    speedObject[event.keyCode].timer2 = null;
};

let onKeyDown = (event) => {
    if (event.keyCode === 32) {

    }
    if (~Object.keys(speedObject).indexOf(event.keyCode.toString()) && !block.end) {
        speedObject.nowPress = event.keyCode;
        document.onkeyup = onKeyUp;
        document.onkeydown = null;
        speedObject[event.keyCode].timer = setTimeout(() => {
            if (speedObject[event.keyCode].direction === 'down') {
                speedObject[event.keyCode].timer2 = setInterval(goMoreDown, 50);
            } else {
                speedObject[event.keyCode].timer2 = setInterval(() => {
                    block.move(speedObject[event.keyCode].direction);
                }, 50);
            }
        }, 200);
    }
};

document.onkeydown = onKeyDown;