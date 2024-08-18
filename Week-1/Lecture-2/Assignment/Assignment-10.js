//Write a function that takes an array of numbers as input, and returns a new array with only even values.
function evenNumbers(array) {
  let newArray = [];
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 === 0) {
      newArray.push(array[i]);
    }
  }
  return newArray;
}

let array = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(evenNumbers(array));
