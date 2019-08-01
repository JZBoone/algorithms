import QuickSort from './QuickSort';
import { swap } from './QuickSort';

const quickSort = new QuickSort();

describe('QuickSort.getStates with firstElement partition method', () => {
  const unsorted = [5, 3, 9, 7, 1, 4, 8, 6, 2];
  const states = quickSort.getStates(unsorted, 'firstElement');
  it('the starting state should contain the unsorted array', () => {
    expect(states[0].arr).toEqual([5, 3, 9, 7, 1, 4, 8, 6, 2]);
  });
  it('the ending state should contain the sorted array', () => {
    const endIndex = states.length - 1;
    expect(states[endIndex].arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('QuickSort.getStates with randomSelection partition method', () => {
  const unsorted = [5, 3, 9, 7, 1, 4, 8, 6, 2];
  const states = quickSort.getStates(unsorted, 'randomSelection');
  it('the starting state should contain the unsorted array', () => {
    expect(states[0].arr).toEqual([5, 3, 9, 7, 1, 4, 8, 6, 2]);
  });

  it('the ending state should contain the sorted array', () => {
    const endIndex = states.length - 1;
    expect(states[endIndex].arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

describe('swap', () => {
  it('swaps two adjacent elements in an array', () => {
    const arr = [2, 1];
    swap(arr, 0, 1);
    expect(arr).toEqual([1, 2]);
  });
  it('swaps any two elements in an array', () => {
    const arr = [2, 1, 4, 9, 8];
    swap(arr, 1, 3);
    expect(arr).toEqual([2, 9, 4, 1, 8]);
  });
});
