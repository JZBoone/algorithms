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

  const onKeyPress = e => {
    switch (e.which) {
      case 37:
        // left arrow
        if (disablePrevious()) {
          return;
        }
        return previous();
      case 39:
        // right arrow
        if (disableNext()) {
          return;
        }
        return next();
      case 8:
        // backspace
        return startOver();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyPress);
    return () => {
      document.removeEventListener('keydown', onKeyPress);
    };
  });

  const previous = () => {
    setCurrentStateIndex(currentStateIndex - 1);
  };

  const next = () => {
    setCurrentStateIndex(currentStateIndex + 1);
  };

  const startOver = () => {
    setCurrentStateIndex(0);
  };

  const disablePrevious = () => {
    return currentStateIndex === 0;
  };

  const disableNext = () => {
    return currentStateIndex >= states.length - 1;
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
      <div className={styles.row} style={{ marginBottom: 20, marginLeft: -40 }}>
        {state.arr.map((number, i) => (
          <div className={styles.boxEmpty} key={i}>
            {i === state.pivotIndex && 'p'}
            {i === state.i && 'i'}
            {i === state.j && 'j'}
          </div>
        ))}
        <div className={styles.boxEmpty}>
          {state.i === state.arr.length && 'i'}
          {state.j === state.arr.length && 'j'}
        </div>
      </div>
      <div className={styles.row}>
        Step {currentStateIndex + 1} of {states.length}
      </div>
      <div className={styles.row}>
        <button onClick={previous} className={styles.button} disabled={disablePrevious()}>
          Previous
        </button>
        <button onClick={next} className={styles.button} disabled={disableNext()}>
          Next
        </button>
        <button onClick={startOver} className={styles.button}>
          Start Over
        </button>
      </div>
    </div>
  );
}

export default App;
