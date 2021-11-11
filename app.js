const canvas = document.querySelector('#jsCanvas');
const colors = document.querySelectorAll('.jsColor');
const fill = document.querySelector('#jsMode');
const range = document.querySelector('#jsRange');
const save = document.querySelector('#jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.height = CANVAS_SIZE;
canvas.width = CANVAS_SIZE;

const ctx = canvas.getContext('2d');

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.lineWidth = 2.5;
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMouseMove(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function onMouseDown(e) {
    painting = true;
}

function handleCanvasClick() {
    if (filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleContextMenu(e) {
    e.preventDefault();
}

function handleSaveCanvas() {
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = 'image';
    link.href = image;
    link.click();
}

if (canvas) {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('mouseup', stopPainting);
    canvas.addEventListener('mouseleave', stopPainting);
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('contextmenu', handleContextMenu);
}

function handleChangeColor(e) {
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

colors.forEach((color) => color.addEventListener('click', handleChangeColor));

function handleChangeRange(e) {
    const rangeValue = e.target.value;
    ctx.lineWidth = rangeValue;
}

if (range) {
    range.addEventListener('input', handleChangeRange)
}

function handleFillClick() {
    if (filling) {
        filling = false;
        fill.textContent = 'Заливка';
    } else {
        filling = true;
        fill.textContent = 'Рисование';
    }
}

if (fill) {
    fill.addEventListener('click', handleFillClick);
}

if (save) {
    save.addEventListener('click', handleSaveCanvas)
}