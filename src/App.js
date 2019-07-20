import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import QuickSort from './QuickSort';
import classNames from 'classnames';

const quickSort = new QuickSort();

const array = [5, 3, 9, 7, 1, 4, 8, 6, 2];

function App() {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [states, setStates] = useState(quickSort.getStates(array));
  const [state, setState] = useState(states[0]);

  useEffect(() => {
    setState(states[currentStateIndex]);
  }, [currentStateIndex, states]);

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
      default:
        return;
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

  const shuffle = () => {
    array.sort(() => Math.random() - 0.5);
    setStates(quickSort.getStates(array));
    startOver();
  };

  const disablePrevious = () => {
    return currentStateIndex === 0;
  };

  const disableNext = () => {
    return currentStateIndex >= states.length - 1;
  };

  return (
    <div className={styles.root}>
      <h2>Quick Sort Algorithm</h2>
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
            <span
              className={classNames(styles.number, {
                [styles.highlighted]: state.pivotIndex === i || state.j === i
              })}
            >
              {number}
            </span>
            <div className={styles.index}>{i}</div>
          </div>
        ))}
        <div className={styles.boxEmpty} />
      </div>
      <div className={styles.row}>
        {state.arr.map((number, i) => (
          <div className={styles.boxEmpty} key={i}>
            {i === state.pivotIndex && 'p'}
            {i === state.i && 'i'}
            <div className="ps-flex" />
            {i === state.j && 'j'}
          </div>
        ))}
        <div className={styles.boxEmpty}>
          {state.i === state.arr.length && 'i'}
          {state.j === state.arr.length && 'j'}
        </div>
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
        <button onClick={shuffle} className={styles.button}>
          Shuffle
        </button>
      </div>
      <div className={styles.row}>
        Step {currentStateIndex + 1} of {states.length}
      </div>
      <div className={styles.row} />
      <div className={styles.column}>{state.message}</div>
    </div>
  );
}

export default App;
