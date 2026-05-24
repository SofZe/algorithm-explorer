export function generateMergeSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  // Start the Merge Sort process
  mergeSort(arr, 0, arr.length - 1, steps);

  return steps;
}

function mergeSort(arr, left, right, steps) {
  // Stop when the array is split into single elements
  if (left >= right) return;

  const middle = Math.floor((left + right) / 2);

  // Split the array into two halves
  mergeSort(arr, left, middle, steps);
  mergeSort(arr, middle + 1, right, steps);

  // Merge the sorted halves together
  merge(arr, left, middle, right, steps);
}

function merge(arr, left, middle, right, steps) {

  // Create temporary arrays for the left and right side
  const leftArray = arr.slice(left, middle + 1);
  const rightArray = arr.slice(middle + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

  // Compare elements from both arrays and place the smaller one
  while (i < leftArray.length && j < rightArray.length) {
    steps.push({
      type: "compare",
      indices: [left + i, middle + 1 + j],
      array: [...arr],
    });

    if (leftArray[i] <= rightArray[j]) {
      arr[k] = leftArray[i];
      i++;
    } else {
      arr[k] = rightArray[j];
      j++;
    }

    // Save the updated array state
    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...arr],
    });

    k++;
  }

  // Add remaining elements from the left array
  while (i < leftArray.length) {
    arr[k] = leftArray[i];

    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...arr],
    });

    i++;
    k++;
  }

  // Add remaining elements from the right array
  while (j < rightArray.length) {
    arr[k] = rightArray[j];

    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...arr],
    });

    j++;
    k++;
  }
}
