/* Assignment #2 - Write a function that takes a jwt as input and returns true if the jwt can be DECODED (not verified). Return false otherwise */

const jwt = require('jsonwebtoken');
function assignment2(jwtToken) {
  const decoded = jwt.decode(jwtToken);
  if (decoded) {
    return true;
  }
  return false;
}
