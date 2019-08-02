import React from 'react';

export const swap = (arr, i, j) => {
  const temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
};

class QuickSort {
  states = [];

  partitionMethod = 'firstElement';

  partitionMessageCounter = 0;

  selectFirstElementAsPivot = (arr, start, end) => {
    this.states.push({
      ...this.lastState(),
      swapped: null,
      i: start + 1,
      j: start + 1,
      pivotIndex: start,
      start,
      end,
      message: this.partitionMessage(start, end),
      arr: [...arr]
    });
    this.partitionMessageCounter++;
    return [arr[start], arr];
  };

  selectRandomPivot = (arr, start, end) => {
    const pivotIndex = Math.round(Math.random() * (end - start) + start);
    this.states.push({
      ...this.lastState(),
      swapped: null,
      i: start + 1,
      j: start + 1,
      pivotIndex,
      start,
      end,
      message: this.partitionMessage(start, end, arr[pivotIndex]),
      arr: [...arr]
    });
    this.partitionMessageCounter++;
    if (pivotIndex !== start) {
      swap(arr, start, pivotIndex);
      this.states.push({
        ...this.lastState(),
        swapped: [arr[start], arr[pivotIndex]],
        pivotIndex: start,
        message: 'We move the pivot to the start index.',
        arr: [...arr]
      });
    }
    return [arr[start], arr];
  };

  selectPivot = (arr, start, end) => {
    switch (this.partitionMethod) {
      case 'firstElement':
        return this.selectFirstElementAsPivot(arr, start, end);
      case 'randomSelection':
        return this.selectRandomPivot(arr, start, end);
      default:
        throw new Error('Unsupported pivot selection method');
    }
  };

  compareMessageCallCounter = 0;

  compareMessage = (arr, pivot, j) => {
    const messages = [
      <span>
        Partition compares the pivot element with the other elements in the array. If the pivot
        element ({pivot}) is smaller than the compared element ({arr[1]}), then we know that
        ultimately the compared element will fall to the left of the pivot. Likewise, if the
        compared element is larger than the pivot element, then it will fall to the right. We
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

  partitionMessage = (start, end, pivot) => {
    const partitionMethodSpecificBlurb =
      this.partitionMethod === 'firstElement' ? (
        <span>
          In this version of the algorithm we simply select the first element of the array as the
          pivot. Other methods of selecting the pivot (e.g., random selection) boost performance.
          This is because choosing a good pivot (as close to the median as possible) divides the
          problem up faster. In fact, if we were to choose the worst pivot every time (i.e., the
          highest or lowest number), then the time complexity would be n<sup>2</sup>. Note that if
          the array were sorted, then choosing the first element as the pivot would in fact be the
          worst pivot every time and would significantly slow down the algorithm.
        </span>
      ) : (
        <span>
          In this version of the algorithm we randomly select the pivot, which in this case is{' '}
          {pivot}.
        </span>
      );
    const randomSelectionMessage = `. The pivot, ${pivot}, is randomly selected.`;
    const messages = [
      <>
        <span>
          <pre>
            partition({start}, {end})
          </pre>
        </span>
        <span>
          The partition method is where the magic happens. Like quickSort, partition takes the
          array, start, and end indices as arguments. Partition's first task is to select a "pivot"
          element. {partitionMethodSpecificBlurb}
        </span>
      </>,
      <span>
        <pre>
          partition(array, {start}, {end})
        </pre>
        <span>Call partition again{randomSelectionMessage}</span>
        <div />
      </span>
    ];
    return this.partitionMessageCounter === 0 ? messages[0] : messages[1];
  };

  partition = (array, start, end) => {
    let i = start + 1;
    const [pivot, arr] = this.selectPivot(array, start, end);

    for (let j = start + 1; j <= end; j++) {
      if (arr[j] < pivot) {
        this.states.push({
          ...this.lastState(),
          swapped: null,
          message: this.compareMessage(arr, pivot, j),
          i,
          j
        });
        if (i !== j) {
          swap(arr, i, j);
          this.states.push({
            ...this.lastState(),
            pivotIndex: start,
            message: `Swap the compared element (${arr[i]}) with the element at the ith index (${
              arr[j]
            }) and increment the i index.`,
            i: i + 1,
            j: j + 1,
            arr: [...arr],
            swapped: [arr[i], arr[j]]
          });
        } else {
          this.states.push({
            ...this.lastState(),
            swapped: null,
            i: i + 1,
            j: j + 1,
            message: `When the compared element (${
              arr[j]
            }) is less than the pivot element (${pivot}), move both pointers forward.`,
            pivotIndex: start
          });
        }
        i++;
      } else {
        this.states.push({
          ...this.lastState(),
          swapped: null,
          message: `The compared element (${
            arr[j]
          }) is greater than or equal to the pivot element (${pivot}).`,
          i,
          j
        });
        this.states.push({
          ...this.lastState(),
          swapped: null,
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
      swapped: [arr[start], arr[i - 1]],
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
            quickSort(array, {start}, {end})
          </pre>
        </span>
        <span>
          The algorithm kicks off with a call to quickSort, our primary method that takes an array
          of numbers, a start index, and an end index as its arguments. This first call passes 0 as
          the start index and {end} as the end index (i.e., the entire array). Quick Sort is a
          divide and conquer algorithm that splits the problem into smaller and smaller pieces until
          all of the work is done. Its time complexity is n*log(n).
        </span>
        <div>
          <br />
          <em>Tip: use the left and right keys instead of the previous and next buttons.</em>
        </div>
      </>,
      <span>
        <pre>
          quickSort(array, {start}, {end})
        </pre>
        <span>Call quickSort again</span>
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
        swapped: null,
        message: 'Return because the elements are sorted (this is the base case).'
      });
      return;
    }
    const pivotPosition = this.partition(arr, start, end);
    this.qSort(arr, start, pivotPosition - 1);
    this.qSort(arr, pivotPosition + 1, end);
  };

  getStates = (arr, partitionMethod = 'firstElement') => {
    this.partitionMethod = partitionMethod;
    this.states = [];
    this.qSortMessageCounter = 0;
    this.partitionMessageCounter = 0;
    this.compareMessageCallCounter = 0;
    this.qSort(arr, 0, arr.length - 1);
    return this.states;
  };
}

export default QuickSort;
