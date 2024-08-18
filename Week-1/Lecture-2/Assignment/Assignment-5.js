function findSum(number) {
  let sum = 0;
  for (let i = 1; i <= number; i++) {
    sum += i;
  }
  console.log(sum);
}

let number = 10;
findSum(number);
