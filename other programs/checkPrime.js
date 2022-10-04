function checkPrime(num) {
  if (num <= 1) return `${num} is not a prime number`;
  if (num == 2) return `${num} is a prime number`;

  for (let i = 2; i <= num / 2; i++) {
    if (num % i == 0) {
      return `${num} is not a prime number`;
    }
  }
  return `${num} is a prime number`;
}

console.log(checkPrime(3));
console.log(checkPrime(25));
