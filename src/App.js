import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import QuickSort from './QuickSort';
import classNames from 'classnames';

const quickSort = new QuickSort();

const array = [5, 3, 9, 7, 1, 4, 8, 6, 2];
// const array = [5, 3, 9, 7];

const states = quickSort.getStates(array);

function App() {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [state, setState] = useState(states[0]);

  useEffect(() => {
    setState(states[currentStateIndex]);
  }, [currentStateIndex]);

  const previous = () => {
    setCurrentStateIndex(currentStateIndex - 1);
  };

  const next = () => {
    setCurrentStateIndex(currentStateIndex + 1);
  };

  return (
    <div className={styles.root}>
      <div className={styles.row}>{state.message}</div>
      <div className={styles.row} style={{ paddingBottom: 0 }}>
        {state.arr.map((number, i) => (
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
                [styles.inside]: i >= state.start && i <= state.end
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
      <div className={styles.row} style={{ marginBottom: 20 }}>
        {state.arr.map((number, i) => (
          <div className={styles.boxEmpty} key={i}>
            {i === state.pivotIndex && 'p'}
            {i === state.i && 'i'}
            {i === state.j && 'j'}
          </div>
        ))}
        <div className={styles.boxEmpty} style={{ marginLeft: -40 }}>
          {state.i === state.arr.length && 'i'}
          {state.j === state.arr.length && 'j'}
        </div>
      </div>
      <div className={styles.row}>
        Step {currentStateIndex + 1} of {states.length}
      </div>
      <div className={styles.row}>
        <button onClick={previous} className={styles.button} disabled={currentStateIndex === 0}>
          Previous
        </button>
        <button
          onClick={next}
          className={styles.button}
          disabled={currentStateIndex >= states.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
