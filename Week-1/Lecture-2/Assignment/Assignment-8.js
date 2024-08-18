//Also tell the user if they are legal to vote or not
function greet(user) {
  let vote;
  if (user.age >= 18) {
    vote = "You are legal to vote";
  } else {
    vote = "You are not legal to vote";
  }
  console.log(`Hi Mr ${user.name}, your age is ${user.age} and ${vote}`);
}
let user = {
  name: "Nayan",
  age: 20,
};
greet(user);
