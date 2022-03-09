import { MAX_GROUPS, MIN_GROUPS } from './constants.js';
import { shuffle } from './utils.js';


//const buttonColorPickerSubmit = document.getElementById("color-picker-submit");
const inputName = document.getElementById("name-input");
const divNames = document.getElementById("names");
const divRandomNames = document.getElementById("random-names");
const buttonRandomize = document.getElementById("randomize");
const inputGroups = document.getElementById("groups-input");
const formName = document.getElementById("name-form");

let nameId = 0;

function getOnClickDeleteNameHandler(nameListItemId) {
	return () => document.getElementById(nameListItemId).remove();
}

function onSubmitNameForm(e) {
	e.preventDefault();
	const value = inputName.value;
	if (value) {
		const id = `name-${nameId}`;
		nameId++;
		const nameListItemElement = document.createElement("div");
		nameListItemElement.setAttribute("class", "name-list-item");
		nameListItemElement.setAttribute("id", id);
		nameListItemElement.innerHTML = value;

		const deleteIconElement = document.createElement("span");
		deleteIconElement.setAttribute("class", "material-icons-outlined clear-icon");
		deleteIconElement.innerHTML = "clear";
		deleteIconElement.addEventListener("click", getOnClickDeleteNameHandler(id));
		nameListItemElement.appendChild(deleteIconElement);
		divNames.appendChild(nameListItemElement);
		inputName.value = null;
	}
}

function onClickRandomize() {
	divRandomNames.innerHTML = null;
	const names = Array.from(divNames.children).map(namesChild => {
		return Array.from(namesChild.childNodes).filter(child => child.nodeType === Node.TEXT_NODE)[0].textContent
	});
	console.log(names);
	const randomizedNames = shuffle(names, inputGroups.value);
	if (randomizedNames.length === 1) {
		randomizedNames[0].forEach(name => {
			const divName = document.createElement("div");
			divName.innerHTML = name;
			divRandomNames.appendChild(divName);
		});
	} else {
		randomizedNames.forEach((group, index, groups) => {
			const divGroupContainer = document.createElement("div");
			divGroupContainer.classList.add("group");
			if (index === groups.length - 1) {
				divGroupContainer.classList.add("last-group");
			}

			const divGroupTitle = document.createElement("div");
			divGroupTitle.classList.add("group-title");
			divGroupTitle.innerHTML = `Group ${index + 1}`;
			divGroupContainer.appendChild(divGroupTitle);
			group.forEach(name => {
				const divName = document.createElement("div");
				divName.innerHTML = name;
				divGroupContainer.appendChild(divName);
			})
			divRandomNames.appendChild(divGroupContainer);
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

formName.addEventListener("submit", onSubmitNameForm);
buttonRandomize.addEventListener("click", onClickRandomize);
inputGroups.addEventListener("blur", onBlurGroupsInput);
