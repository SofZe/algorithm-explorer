export function generateMergeSortSteps(inputArray) {
  const arr = [...inputArray];
  const steps = [];

  mergeSort(arr, 0, arr.length - 1, steps);

  return steps;
}

function mergeSort(arr, left, right, steps) {
  if (left >= right) return;

  const middle = Math.floor((left + right) / 2);

  mergeSort(arr, left, middle, steps);
  mergeSort(arr, middle + 1, right, steps);

  merge(arr, left, middle, right, steps);
}

function merge(arr, left, middle, right, steps) {
  const leftArray = arr.slice(left, middle + 1);
  const rightArray = arr.slice(middle + 1, right + 1);

  let i = 0;
  let j = 0;
  let k = left;

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

    steps.push({
      type: "overwrite",
      indices: [k],
      array: [...arr],
    });

    k++;
  }

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