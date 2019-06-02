import QuickSort from './QuickSort';

it('should sort an array of integers', () => {
  const unsorted = [5, 3, 9, 7, 1, 4, 8, 6, 2];
  const result = QuickSort.sort(unsorted, 0, 8);
  expect(result).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
