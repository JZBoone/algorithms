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
      type: 'partition',
      data: {
        i,
        j: i,
        pivot,
        start,
        end
      },
      message: 'Call partion'
    });
    for (let j = start + 1; j <= end; j++) {
      if (arr[j] < pivot) {
        this.history.push({
          type: 'info',
          message: 'The jth position is less than the pivot'
        });
        if (i !== j) {
          swap(arr, i, j);
          this.history.push({
            data: {
              i,
              j
            },
            type: 'swap',
            message: 'Swap i and j'
          });
        }
        i++;
        this.history.push({
          type: 'incrementI',
          message: 'Increment i'
        });
      } else {
        this.history.push({
          message: 'The jth position is greater than or equal to the pivot',
          type: 'info'
        });
      }
      this.history.push({
        type: 'incrementJ',
        message: 'Increment j'
      });
    }
    swap(arr, start, i - 1);
    this.history.push({
      data: {
        i: start,
        j: i - 1
      },
      type: 'swap',
      message: 'Place the pivot'
    });
    return i - 1;
  };

  qSort = (arr, start, end) => {
    this.history.push({
      data: {
        start,
        end
      },
      type: 'quickSort',
      message: 'Call Quick Sort'
    });
    if (start >= end) {
      this.history.push({
        type: 'info',
        message: 'Return because start is greater than or equal to end (base case)'
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
