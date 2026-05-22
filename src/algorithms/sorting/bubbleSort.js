export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {

      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...arr]
      });

      if (arr[j] > arr[j + 1]) {

        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];

        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr]
        });
      }
    }
  }

  return steps;
}