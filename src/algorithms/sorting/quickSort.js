export function generateQuickSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  // Start the Quick Sort process
  quickSort(arr, 0, arr.length - 1, steps);

  return steps;
}

function quickSort(arr, low, high, steps) {

  // Continue only if the section has more than one element
  if (low < high) {
    const pivotIndex = partition(
      arr,
      low,
      high,
      steps
    );

    // Sort the left and right side of the pivot
    quickSort(arr, low, pivotIndex - 1, steps);
    quickSort(arr, pivotIndex + 1, high, steps);
  }
}

function partition(arr, low, high, steps) {

  // Use the last element as the pivot
  const pivot = arr[high];
  let i = low - 1;

  // Compare elements with the pivot
  for (let j = low; j < high; j++) {

    steps.push({
      type: "compare",
      indices: [j, high],
      array: [...arr],
    });


    // Move smaller elements to the left side
    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];

      // Save the swap step
      steps.push({
        type: "swap",
        indices: [i, j],
        array: [...arr],
      });
    }
  }

  // Place the pivot in its final sorted position
  [arr[i + 1], arr[high]] =
    [arr[high], arr[i + 1]];

  steps.push({
    type: "swap",
    indices: [i + 1, high],
    array: [...arr],
  });

  return i + 1;
}
