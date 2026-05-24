// Generate Selection Sort animation steps
export function generateSelectionSortSteps(array) {

  // Copy the original array
  const arr = [...array];

  // Store every animation step
  const steps = [];

  // Move through the array
  for (let i = 0; i < arr.length; i++) {

    // Assume the current index is the smallest
    let minIndex = i;

    // Search the remaining array for a smaller value
    for (let j = i + 1; j < arr.length; j++) {

      // Compare current values
      steps.push({
        array: [...arr],
        indices: [minIndex, j],
        type: "compare",
      });

      // Update the smallest value index
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    // Swap values if a smaller value was found
    if (minIndex !== i) {

      [arr[i], arr[minIndex]] = [
        arr[minIndex],
        arr[i],
      ];

      // Save the swap step
      steps.push({
        array: [...arr],
        indices: [i, minIndex],
        type: "swap",
      });
    }
  }

  // Return all animation steps
  return steps;
}
