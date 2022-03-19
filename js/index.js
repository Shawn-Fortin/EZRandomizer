import { GROUPS_INPUT_TYPE_NUMBER_OF_GROUPS, MAX_GROUPS, MIN_GROUPS } from './constants.js';
import { shuffleIntoGroups } from './utils.js';

const nameInput = document.getElementById("name-input");
const namesDiv = document.getElementById("names");
const randomNamesDiv = document.getElementById("random-names");
const randomizeButton = document.getElementById("randomize");
const groupsInput = document.getElementById("groups-input");
const nameForm = document.getElementById("name-form");
const numberOfGroupsRadioButton = document.getElementById("number-of-groups");
const membersPerGroupRadioButton = document.getElementById("members-per-group");
const groupInputTypeRadioGroup = Array.of(numberOfGroupsRadioButton, membersPerGroupRadioButton);

let nameId = 0;

nameForm.addEventListener("submit", handleNameFormSubmition);
randomizeButton.addEventListener("click", shuffleNamesIntoGroups);
groupsInput.addEventListener("blur", correctGroupsInputValue);

function handleNameFormSubmition(e) {
	e.preventDefault();
	const name = nameInput.value;
	if (name) {
		namesDiv.appendChild(createNameListItemElement(name));
		nameInput.value = null;
	}
}

function createNameListItemElement(name) {
	const nameListItemId = getAndIncrementNameId();
	const nameListItemElement = document.createElement("div");
	nameListItemElement.setAttribute("class", "name-list-item");
	nameListItemElement.setAttribute("id", nameListItemId);
	nameListItemElement.innerHTML = name;
	nameListItemElement.appendChild(createNameListItemDeleteIcon(nameListItemId));
	return nameListItemElement;
}

function getAndIncrementNameId() {
	return `name-${nameId++}`;
}

function createNameListItemDeleteIcon(nameListItemId) {
	const deleteIconElement = document.createElement("span");
	deleteIconElement.setAttribute("class", "material-icons-outlined clear-icon");
	deleteIconElement.innerHTML = "clear";
	deleteIconElement.addEventListener("click", () => removeElementFromDocument(nameListItemId));
	return deleteIconElement;
}

function removeElementFromDocument(elementId) {
	document.getElementById(elementId).remove();
}

function shuffleNamesIntoGroups() {
	randomNamesDiv.innerHTML = null;
	const names = getNamesFromNamesDiv();
	const numberOfGroups = getNumberOfGroups(names.length);
	const randomizedGroups = shuffleIntoGroups(names, numberOfGroups);
	if (numberOfGroups === 1) {
		populateRandomNamesDivWithSingleGroup(randomizedGroups[0]);
	} else {
		populateRandomNamesDivWithMultipleGroups(randomizedGroups);
	}
}

function getNamesFromNamesDiv() {
	return Array.from(namesDiv.children).map(nameListItem => getNameFromNameListItem(nameListItem));
}

function getNameFromNameListItem(nameListItem) {
	return Array.from(nameListItem.childNodes).filter(child => child.nodeType === Node.TEXT_NODE)[0].textContent;
}

function getNumberOfGroups(numberOfNames) {
	const groupInputType = groupInputTypeRadioGroup.find(radioInput => radioInput.checked).value;
	return groupInputType === GROUPS_INPUT_TYPE_NUMBER_OF_GROUPS ? Number.parseInt(groupsInput.value) : calculateNumberOfGroups(numberOfNames);
}

function calculateNumberOfGroups(numberOfNames) {
	return Math.ceil(numberOfNames / groupsInput.value);
}

function populateRandomNamesDivWithSingleGroup(group) {
	group.forEach(name => {
		const divName = document.createElement("div");
		divName.innerHTML = name;
		randomNamesDiv.appendChild(divName);
	});
}

function populateRandomNamesDivWithMultipleGroups(randomizedGroups) {
	randomizedGroups.forEach((nameGroup, index, groups) => {
		appendGroupToRandomNamesDiv(index, groups, nameGroup);
	});
}

function appendGroupToRandomNamesDiv(index, groups, nameGroup) {
	const divGroupContainer = document.createElement("div");
	divGroupContainer.classList.add("group");
	if (index === groups.length - 1) {
		divGroupContainer.classList.add("last-group");
	}
	divGroupContainer.appendChild(createGroupTitleElement(index));
	nameGroup.forEach(name => {
		divGroupContainer.appendChild(createNameElement(name));
	});
	randomNamesDiv.appendChild(divGroupContainer);
}

function createGroupTitleElement(groupIndex) {
	const divGroupTitle = document.createElement("div");
	divGroupTitle.classList.add("group-title");
	divGroupTitle.innerHTML = `Group ${groupIndex + 1}`;
	return divGroupTitle;
}

function createNameElement(name) {
	const divName = document.createElement("div");
	divName.innerHTML = name;
	return divName;
}

function correctGroupsInputValue() {
	const value = groupsInput.value;
	if (Number.parseInt(value) > MAX_GROUPS) {
		groupsInput.value = `${MAX_GROUPS}`;
	} else if (Number.parseInt(value) < MIN_GROUPS) {
		groupsInput.value = `${MIN_GROUPS}`;
	} else if (!isWholeNumber(value)) {
		groupsInput.value = `${Math.floor(Number.parseFloat(value))}`
	}
}

function isWholeNumber(value) {
	return Number.parseFloat(value) % 1 === 0;
}

