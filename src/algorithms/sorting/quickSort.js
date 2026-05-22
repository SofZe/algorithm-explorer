export function generateQuickSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  quickSort(arr, 0, arr.length - 1, steps);

  return steps;
}

function quickSort(arr, low, high, steps) {
  if (low < high) {
    const pivotIndex = partition(
      arr,
      low,
      high,
      steps
    );

    quickSort(arr, low, pivotIndex - 1, steps);
    quickSort(arr, pivotIndex + 1, high, steps);
  }
}

function partition(arr, low, high, steps) {
  const pivot = arr[high];
  let i = low - 1;

  for (let j = low; j < high; j++) {

    steps.push({
      type: "compare",
      indices: [j, high],
      array: [...arr],
    });

    if (arr[j] < pivot) {
      i++;

      [arr[i], arr[j]] = [arr[j], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, j],
        array: [...arr],
      });
    }
  }

  [arr[i + 1], arr[high]] =
    [arr[high], arr[i + 1]];

  steps.push({
    type: "swap",
    indices: [i + 1, high],
    array: [...arr],
  });

  return i + 1;
}