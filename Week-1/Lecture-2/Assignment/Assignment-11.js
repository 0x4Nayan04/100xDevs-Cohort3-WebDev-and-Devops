// Write a function that takes an array of users as input and returns only the users who are more than 18 years old
function checkAgeAndReturn(array) {
  const result = []; // Initialize an empty array to store users who are older than 18
  for (let i = 0; i < array.length; i++) {
    if (array[i].age > 18) {
      result.push(array[i].name); // Add the user's name to the result array
    }
  }
  return result; // Return the array containing the names of users who are older than 18
}

const users = [
  {
    name: "Harkirat",
    age: 21,
  },
  {
    name: "Raman",
    age: 22,
  },
];

console.log(checkAgeAndReturn(users)); // Output will be ["Harkirat", "Raman"]
