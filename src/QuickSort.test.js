import QuickSort from './QuickSort';

const quickSort = new QuickSort();

describe('QuickSort.getStates', () => {
  const unsorted = [5, 3, 9, 7, 1, 4, 8, 6, 2];
  const states = quickSort.getStates(unsorted);
  it('the starting state should contain the unsorted array', () => {
    expect(states[0].arr).toEqual([5, 3, 9, 7, 1, 4, 8, 6, 2]);
  });
  it('the ending state should contain the sorted array', () => {
    const endIndex = states.length - 1;
    expect(states[endIndex].arr).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});
