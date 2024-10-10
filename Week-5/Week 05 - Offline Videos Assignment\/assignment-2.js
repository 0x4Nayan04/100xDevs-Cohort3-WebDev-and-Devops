// Assignment #2 - Create a map functions that takes an array and a transform function as input and returns the transformed array as output
function map(arr, transformationFunction) {
  const transformedArr = [];
  for (let i = 0; i < arr.length; i++) {
    transformedArr.transformationFunction(arr[i]);
  }
  return transformedArr;
}
