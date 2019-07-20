import React from 'react';

export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

class QuickSort {
  states = [];

  selectPivot = (arr, start, end) => {
    this.states.push({
      ...this.lastState(),
      i: start + 1,
      j: start + 1,
      pivotIndex: start,
      start,
      end,
      message: this.partitionMessage(start, end),
      arr: [...arr]
    });
    this.partitionMessageCounter++;
    return arr[start];
  };

  partitionMessageCounter = 0;

  compareMessageCallCounter = 0;

  compareMessage = (arr, pivot, j) => {
    const messages = [
      <span>
        Partition compares the pivot element with the other elements in the array. If the pivot
        element ({pivot}) is smaller than the compared element ({arr[1]}), then we know that
        ultimately the compared element will fall to the left of the pivot. Likewise, if the
        compared element is larger than then pivot element, then it will fall to the right. We
        maintain 2 pointers, called i and j, that can be thought of as boundaries. To the left of i,
        all elements are smaller than the pivot. To the right of i, and until j, all elements are
        larger than the pivot element.
      </span>,
      <span>
        The compared element ({arr[j]}) is less than the pivot ({pivot}).
      </span>
    ];
    const message = this.compareMessageCallCounter === 0 ? messages[0] : messages[1];
    this.compareMessageCallCounter++;
    return message;
  };

  partitionMessage = (start, end) => {
    const messages = [
      <>
        <span>
          <pre>
            partition({start}, {end})
          </pre>
        </span>
        <span>
          The partition method is where the magic happens. Partition's first task is to select a
          "pivot" element. In this version of the algorithm we simply select the first element of
          the array as the pivot. Other methods of selecting the pivot (e.g., random selection)
          boost performance. Like qSort, partition takes the array, start, and end indices as
          parameters.
        </span>
      </>,
      <span>
        <pre>
          partition(arr, {start}, {end})
        </pre>
        <span>Call partition again</span>
        <div />
      </span>
    ];
    return this.partitionMessageCounter === 0 ? messages[0] : messages[1];
  };

  partition = (arr, start, end) => {
    let i = start + 1;
    const pivot = this.selectPivot(arr, start, end);

    for (let j = start + 1; j <= end; j++) {
      if (arr[j] < pivot) {
        this.states.push({
          ...this.lastState(),
          message: this.compareMessage(arr, pivot, j),
          i,
          j
        });
        if (i !== j) {
          swap(arr, i, j);
          this.states.push({
            ...this.lastState(),
            pivotIndex: start,
            message: 'Swap the compared element with the element before the i pointer.',
            i: i + 1,
            j: j + 1,
            arr: [...arr]
          });
        } else {
          this.states.push({
            ...this.lastState(),
            i: i + 1,
            j: j + 1,
            message:
              'When the compared element is less than the pivot element, move both pointers forward.',
            pivotIndex: start
          });
        }
        i++;
      } else {
        this.states.push({
          ...this.lastState(),
          message: 'The compared element is greater than or equal to the pivot element.',
          i,
          j
        });
        this.states.push({
          ...this.lastState(),
          i,
          j: j + 1,
          message: 'Move the j pointer ahead.',
          pivotIndex: start
        });
      }
    }
    swap(arr, start, i - 1);
    this.states.push({
      ...this.lastState(),
      arr: [...arr],
      message:
        'Place the pivot. Everything to the left is smaller, and everything to the right is bigger.',
      pivotIndex: i - 1
    });
    return i - 1;
  };

  lastState = () => {
    return this.states[this.states.length - 1];
  };

  qSortMessageCounter = 0;

  qSortMessage = (start, end) => {
    const messages = [
      <>
        <span>
          <pre>
            qSort(arr, {start}, {end})
          </pre>
        </span>
        <span>
          The algorithm kicks off with a call to qSort, our primary method that takes an array of
          numbers, a start index, and an end index as its parameters. This first call passes 0 as
          the start index and {end} as the end index (i.e., the entire array). Quick Sort is a
          divide and conquer algorithm that splits the problem into smaller and smaller pieces until
          all of the work is done. It's time complexity is n*log(n).
        </span>
        <div>
          <br />
          <em>Tip: use the left and right keys instead of the previous and next buttons.</em>
        </div>
      </>,
      <span>
        <pre>
          qSort(arr, {start}, {end})
        </pre>
        <span>Call qSort again</span>
      </span>
    ];
    const message = this.qSortMessageCounter === 0 ? messages[0] : messages[1];
    this.qSortMessageCounter++;
    return message;
  };

  qSort = (arr, start, end) => {
    this.states.push({
      arr: [...arr],
      start,
      end,
      message: this.qSortMessage(start, end),
      i: null,
      j: null,
      pivotIndex: null
    });
    if (start >= end) {
      this.states.push({
        ...this.lastState(),
        message: 'Return because the elements are sorted (this is the base case).'
      });
      return;
    }
    const pivotPosition = this.partition(arr, start, end);
    this.qSort(arr, start, pivotPosition - 1);
    this.qSort(arr, pivotPosition + 1, end);
  };

  getStates = arr => {
    this.states = [];
    this.qSortMessageCounter = 0;
    this.partitionMessageCounter = 0;
    this.compareMessageCallCounter = 0;
    this.qSort(arr, 0, arr.length - 1);
    return this.states;
  };
}

export default QuickSort;
