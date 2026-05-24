// Function that creates all the steps of Bubble Sort
export function generateBubbleSortSteps(inputArray) {
  const arr = [...inputArray];
  // Stores all compare and swap actions
  const steps = [];

  // Repeat passes through the array
  for (let i = 0; i < arr.length; i++) {
    // Compare neighboring elements
    for (let j = 0; j < arr.length - i - 1; j++) {

      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...arr]
      });

      if (arr[j] > arr[j + 1]) {

        [arr[j], arr[j + 1]] =
          [arr[j + 1], arr[j]];

        // Save the swap step
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr]
        });
      }
    }
  }

  // Return all Bubble Sort steps
  return steps;
}
