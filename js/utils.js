/**
 * Returns a new 2-dimensional array with the contents of the input array randomized and separated into the specified number of groups.
 * @param {Array} array The array to shuffle.
 * @param {number} groups The number of groups to separate the array into.
 */
export function shuffle(array, groups=1) {
    const arrayCopy = [...array];
    const newArray = []
    for (let i = 0; i < groups; i++) {
        newArray[i] = [];
    }
    let groupIndex = 0;
    while(arrayCopy.length) {
        if (groupIndex >= groups) {
            groupIndex = 0;
        }
        const index = Math.floor(Math.random() * (arrayCopy.length));
        newArray[groupIndex].push(arrayCopy[index]);
        arrayCopy.splice(index, 1);
        groupIndex++
    }
    return newArray;
}