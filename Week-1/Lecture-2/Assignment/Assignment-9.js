function CheckGender(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].gender === "Male") {
      console.log(`Mr. ${array[i].name}`);
    }
  }
}

let array = [
  {
    name: "Nayan",
    age: 18,
    gender: "Male",
  },
  {
    name: "Hakriat",
    age: 35,
    gender: "Male",
  },
  {
    name: "Mansi",
    age: 23,
    gender: "Female",
  },
];
CheckGender(array);
