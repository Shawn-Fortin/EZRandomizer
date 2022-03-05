import { ENTER_KEY, MAX_GROUPS, MIN_GROUPS } from './constants.js';
import { shuffle } from './utils.js';


//const buttonColorPickerSubmit = document.getElementById("color-picker-submit");
const inputName = document.getElementById("name-input");
const buttonNameSubmit = document.getElementById("name-submit");
const divNames = document.getElementById("names");
const divRandomNames = document.getElementById("random-names");
const buttonRandomize = document.getElementById("randomize");
const inputGroups = document.getElementById("groups-input");

function onSubmitColor() {
	const colorPicker = document.getElementById("color-picker");
	const body = document.getElementById("body");
	body.style.backgroundColor = colorPicker.value;
}

function onClickEnterName() {
	const value = inputName.value;
	if (value) {
		divNames.innerHTML += `<div>${value}</div>`;
		inputName.value = null;
	}
}

function checkNameInputKeyup(e) {
	if (e.code === ENTER_KEY) {
		onClickEnterName();
	}
}

function onClickRandomize() {
	divRandomNames.innerHTML = null;
	const nameDivs = divNames.children;
	const names = [];
	for (let i = 0; i < nameDivs.length; i++) {
		names.push(nameDivs.item(i).innerHTML);
	}
	const randomizedNames = shuffle(names, inputGroups.value);
	if (randomizedNames.length === 1) {
		randomizedNames[0].forEach(name => divRandomNames.innerHTML += "<div>" + name + "</div>")
	} else {
		randomizedNames.forEach((group, index) => {
			divRandomNames.innerHTML += "<h1> Group " + (index + 1) + "</h1>";
			group.forEach(name => divRandomNames.innerHTML += "<div>" + name + "</div>");
		})
	}
}

function onBlurGroupsInput() {
	const value = inputGroups.value;
	if (Number.parseInt(value) > MAX_GROUPS) {
		inputGroups.value = `${MAX_GROUPS}`;
	} else if (Number.parseInt(value) < MIN_GROUPS) {
		inputGroups.value = `${MIN_GROUPS}`;
	} else if (Number.parseFloat(value) % 1 !== 0) {
		inputGroups.value = `${Math.floor(Number.parseFloat(value))}`
	}
}

//buttonColorPickerSubmit.addEventListener("click", onSubmitColor);
inputName.addEventListener("keyup", checkNameInputKeyup);
buttonNameSubmit.addEventListener("click", onClickEnterName);
buttonRandomize.addEventListener("click", onClickRandomize);
inputGroups.addEventListener("blur", onBlurGroupsInput);
