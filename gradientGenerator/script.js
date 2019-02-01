//
var color1 = document.querySelector('.color1');
var color2 = document.querySelector('.color2');
var css = document.querySelector('h3');
var body = document.querySelector('body');
var button = document.querySelector('button');

function changeColor() {
	body.style.background = 'linear-gradient(to right, ' + color1.value + ', ' + color2.value + ')';
	css.textContent = body.style.background + ';';
}

function randomHex() {

    const hexValues = '0123456789ABCDEF';
    let hex = '#';
    for (let i = 0; i < 6; i++) {
        hex += hexValues[Math.floor(Math.random() * 16)];
    }
    return hex;
}

function randomize() {
	var random1 = randomHex();
	var random2 = randomHex();
	body.style.background = 'linear-gradient(to right, ' + random1 + ', ' + random2 + ')';
	css.textContent = body.style.background + ';';
	color1.value = random1;
	color2.value = random2;
}

color1.addEventListener('input', changeColor);
color2.addEventListener('input', changeColor);
button.addEventListener('click', randomize);
