/**
 * Returns a new 2-dimensional array with the contents of the input array randomized and separated into the specified number of groups.
 * @param {Array} array The array to shuffle.
 * @param {number} numberOfGroups The number of groups to separate the array into.
 */
export function shuffleIntoGroups(array, numberOfGroups) {
    const arrayCopy = [...array];
    const groups = createPopulatedArray(numberOfGroups, createEmptyArray);
    let groupIndex = 0;
    while(arrayCopy.length) {
        if (groupIndex >= numberOfGroups) {
            groupIndex = 0;
        }
        const index = Math.floor(Math.random() * (arrayCopy.length));
        groups[groupIndex].push(arrayCopy[index]);
        arrayCopy.splice(index, 1);
        groupIndex++
    }
    return groups;
}

/**
 * Create an array of a specified size, populated with elements returned from the createElementFunction.
 * @param {number} size The size of the array to create.
 * @param {function} createElementFunction Function to create elements that should populate the array.
 * @returns Array of elements.
 */
function createPopulatedArray(size, createElementFunction) {
    const newArray = [];
    for (let i = 0; i < size; i++) {
        newArray[i] = createElementFunction();
    }
    return newArray;
}

function createEmptyArray() {
    return [];
}
