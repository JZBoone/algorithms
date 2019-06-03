export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

class QuickSort {
  history = [];
  partition = (arr, start, end) => {
    let i = start + 1;
    const pivot = arr[start];
    this.history.push({
      type: 'set',
      data: {
        i: start + 1,
        j: start + 1,
        pivotIndex: start,
        start,
        end,
        message: `Call partition and select ${arr[start]} as the pivot`
      }
    });
    for (let j = start + 1; j <= end; j++) {
      if (arr[j] < pivot) {
        this.history.push({
          type: 'set',
          data: {
            message: `The jth position is less than the pivot (${arr[j]} < ${pivot})`,
            i,
            j
          }
        });
        if (i !== j) {
          swap(arr, i, j);
          this.history.push({
            data: {
              pivotIndex: start,
              message: 'Swap i and j',
              i,
              j
            },
            swapData: {
              i,
              j
            },
            type: 'swap'
          });
        }
        this.history.push({
          type: 'set',
          data: { i: i + 1, j: j + 1, message: 'Increment i and j', pivotIndex: start }
        });
        i++;
      } else {
        this.history.push({
          data: {
            message: 'The jth position is greater than or equal to the pivot',
            i,
            j
          },
          type: 'set'
        });
        this.history.push({
          type: 'set',
          data: { i, j: j + 1, message: 'Increment j', pivotIndex: start }
        });
      }
    }
    swap(arr, start, i - 1);
    this.history.push({
      data: {
        i: null,
        j: null,
        pivotIndex: i - 1,
        message:
          'Place the pivot (everything to the left is smaller, everything to the right is bigger)'
      },
      swapData: {
        i: start,
        j: i - 1
      },
      type: 'swap'
    });
    return i - 1;
  };

  qSort = (arr, start, end) => {
    this.history.push({
      data: {
        start,
        end,
        message: `Call Quick Sort with a start of ${start} and an end of ${end}`,
        i: null,
        j: null,
        pivotIndex: null
      },
      type: 'set'
    });
    if (start >= end) {
      this.history.push({
        type: 'set',
        data: {
          message: 'Return because the elements are sorted (base case)'
        }
      });
      return;
    }
    const pivotPosition = this.partition(arr, start, end);
    this.qSort(arr, start, pivotPosition - 1);
    this.qSort(arr, pivotPosition + 1, end);
  };

  getActions = arr => {
    this.history = [];
    const copy = [...arr];
    this.qSort(copy, 0, copy.length - 1);
    return this.history;
  };
}

export default QuickSort;
