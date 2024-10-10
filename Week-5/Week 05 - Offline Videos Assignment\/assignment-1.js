// Assignment #1 - Create a map functions that takes 2 inputs an array and a transformation callback/function and transform the array into a new one using transformation function

function map(arr, transformationFunction) {
  const transformedArr = [];
  for (let i = 0; i < arr.length; i++) {
    transformedArr.transformationFunction(arr[i]);
  }
  return transformedArr;
}
