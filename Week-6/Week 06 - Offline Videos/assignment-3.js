/* Assignment #3 - Write a function that takes a jwt as input and returns true if the jwt can be VERIFIED. Return false otherewise */
const jwt = require('jsonwebtoken');

function assignment3(jwtToken, secret) {
  try {
    const decoded = jwt.verify(jwtToken, secret);
    return true;
  } catch (error) {
    return false;
  }
}
