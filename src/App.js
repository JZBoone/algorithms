import React, { useState, useEffect, useReducer } from 'react';
import styles from './App.module.css';
import QuickSort, { swap } from './QuickSort';
import classNames from 'classnames';

const quickSort = new QuickSort();

const array = [5, 3, 9, 7, 1, 4, 8, 6, 2];
// const array = [5, 3, 9, 7];

const actions = quickSort.getActions(array);
console.log(actions);

const reducer = (state, action) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        ...action.data
      };
    case 'swap':
      const arrayWithSwap = [...state.array];
      swap(arrayWithSwap, action.swapData.i, action.swapData.j);
      return {
        ...state,
        ...action.data,
        array: arrayWithSwap
      };
    default:
      return state;
  }
};

function App() {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, { array });

  useEffect(() => {
    dispatch(actions[currentActionIndex]);
  }, [currentActionIndex]);

  const previous = () => {
    setCurrentActionIndex(currentActionIndex - 1);
  };

  const next = () => {
    setCurrentActionIndex(currentActionIndex + 1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.row}>{state.message}</div>
      <div className={styles.row}>
        {state.array.map((number, i) => (
          <div
            className={classNames(
              [styles.box],
              {
                [styles.start]: i === state.start
              },
              {
                [styles.end]: i === state.end
              },
              {
                [styles.partition]: i === state.pivotIndex
              },
              {
                [styles.smaller]: i >= state.start && i < state.i
              },
              {
                [styles.larger]: i >= state.i && i < state.j
              }
            )}
            key={i}
          >
            {number}
            <div className={styles.index}>{i}</div>
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {state.array.map((number, i) => (
          <div className={styles.boxEmpty} key={i}>
            {i === state.pivotIndex && 'p'}
            {i === state.i && 'i'}
            {i === state.j && 'j'}
          </div>
        ))}
        <div className={styles.boxEmpty} style={{ marginLeft: -20 }}>
          {state.i === array.length && 'i'}
          {state.j === array.length && 'j'}
        </div>
      </div>
      <div className={styles.row}>
        Step {currentActionIndex + 1} of {actions.length}
      </div>
      <div className={styles.row}>
        <button onClick={previous} className={styles.button} disabled={currentActionIndex === 0}>
          Previous
        </button>
        <button
          onClick={next}
          className={styles.button}
          disabled={currentActionIndex >= actions.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
