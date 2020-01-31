export const randomNumberInRange = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const randomUniqueNumbersInRange = (min, max, minNumOfNumbers, maxNumOfNumbers) => {
  const result = [];
  const numOfNumbers = randomNumberInRange(minNumOfNumbers, maxNumOfNumbers);

  while (result.length < numOfNumbers) {
    const randomNum = randomNumberInRange(min, max);
    if (result.indexOf(randomNum) === -1) result.push(randomNum);
  }

  return result;
};
