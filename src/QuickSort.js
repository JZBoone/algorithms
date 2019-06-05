export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

class QuickSort {
  states = [];
  partition = (arr, start, end) => {
    let i = start + 1;
    const pivot = arr[start];
    this.states.push({
      ...this.lastState(),
      i: start + 1,
      j: start + 1,
      pivotIndex: start,
      start,
      end,
      message: `Call partition and select ${arr[start]} as the pivot`
    });
    this.states.push({
      ...this.lastState(),
      message: `Call partition and select ${arr[start]} as the pivot`,
      pivotIndex: start,
      arr: [...arr]
    });
    for (let j = start + 1; j <= end; j++) {
      if (arr[j] < pivot) {
        this.states.push({
          ...this.lastState(),
          message: `The jth position is less than the pivot (${arr[j]} < ${pivot})`,
          i,
          j
        });
        if (i !== j) {
          swap(arr, i, j);
          this.states.push({
            ...this.lastState(),
            pivotIndex: start,
            message: 'Swap i and j, and increment i and j',
            i: i + 1,
            j: j + 1,
            arr: [...arr]
          });
        } else {
          this.states.push({
            ...this.lastState(),
            i: i + 1,
            j: j + 1,
            message: 'Increment i and j',
            pivotIndex: start
          });
        }
        i++;
      } else {
        this.states.push({
          ...this.lastState(),
          message: 'The jth position is greater than or equal to the pivot',
          i,
          j
        });
        this.states.push({
          ...this.lastState(),
          i,
          j: j + 1,
          message: 'Increment j',
          pivotIndex: start
        });
      }
    }
    swap(arr, start, i - 1);
    this.states.push({
      ...this.lastState(),
      arr: [...arr],
      message:
        'Place the pivot (everything to the left is smaller, everything to the right is bigger)',
      pivotIndex: i - 1
    });
    return i - 1;
  };

  lastState = () => {
    return this.states[this.states.length - 1];
  };

  qSort = (arr, start, end) => {
    this.states.push({
      arr: [...arr],
      start,
      end,
      message: `Call Quick Sort with start index ${start} and end index ${end}`,
      i: null,
      j: null,
      pivotIndex: null
    });
    if (start >= end) {
      this.states.push({
        ...this.lastState(),
        message: 'Return because the elements are sorted (base case)'
      });
      return;
    }
    const pivotPosition = this.partition(arr, start, end);
    this.qSort(arr, start, pivotPosition - 1);
    this.qSort(arr, pivotPosition + 1, end);
  };

  getStates = arr => {
    this.states = [];
    this.qSort(arr, 0, arr.length - 1);
    return this.states;
  };
}

export default QuickSort;
