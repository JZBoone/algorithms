import React, { useState, useEffect } from 'react';
import styles from './App.module.css';
import QuickSort from './QuickSort';
import classNames from 'classnames';

const quickSort = new QuickSort();

const array = [5, 3, 9, 7, 1, 4, 8, 6, 2];

function App() {
  const [currentStateIndex, setCurrentStateIndex] = useState(0);
  const [partitionMethod, setPartitionMethod] = useState('firstElement');
  const [states, setStates] = useState(quickSort.getStates([...array], partitionMethod));
  const [state, setState] = useState(states[0]);
  const [animation, setAnimation] = useState(null);
  const [lastClickDirection, setLastClickDirection] = useState(null);

  useEffect(() => {
    const needsAnimation = () => {
      if (lastClickDirection === 'next' && states[currentStateIndex].swapped) {
        return true;
      }
      if (lastClickDirection === 'previous') {
        if (currentStateIndex === states.length - 1) {
          return false;
        }
        return states[currentStateIndex + 1].swapped;
      }
    };
    if (needsAnimation()) {
      const swapStateIndex =
        lastClickDirection === 'next' ? currentStateIndex : currentStateIndex + 1;
      const [numOne, numTwo] = states[swapStateIndex].swapped;
      const elOneRect = getNumberEl(numOne).getBoundingClientRect();
      const elTwoRect = getNumberEl(numTwo).getBoundingClientRect();
      const deltaX = elOneRect.left - elTwoRect.left;
      setAnimation({
        [numOne]: {
          transform: `translate(${deltaX}px, 0px)`,
          transition: '0s'
        },
        [numTwo]: {
          transform: `translate(${deltaX * -1}px, 0px)`,
          transition: '0s'
        }
      });
      setTimeout(() => {
        setAnimation({
          [numOne]: {
            transform: `translate(0px, 0px`,
            transition: '.25s'
          },
          [numTwo]: {
            transform: `translate(0px, 0px`,
            transition: '.25s'
          }
        });
      }, 100);
    } else {
      setAnimation(null);
    }
    setState(states[currentStateIndex]);
  }, [currentStateIndex, states, lastClickDirection]);

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
    setLastClickDirection('previous');
    setCurrentStateIndex(currentStateIndex - 1);
  };

  const getNumberEl = number => {
    return document.getElementById(`qsNumber${number}`);
  };

  const next = () => {
    setLastClickDirection('next');
    setCurrentStateIndex(currentStateIndex + 1);
  };

  const getAnimationStyles = number => {
    if (!animation || !animation[number]) {
      return {};
    }
    return animation[number];
  };

  const startOver = () => {
    setCurrentStateIndex(0);
  };

  const shuffle = () => {
    array.sort(() => Math.random() - 0.5);
    setStates(quickSort.getStates([...array], partitionMethod));
    startOver();
  };

  const sort = () => {
    setStates(quickSort.getStates([...array].sort(), partitionMethod));
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
      <label htmlFor="partitionMethod">Partition Method: </label>
      <select
        id="partitionMethod"
        style={{ marginBottom: 25 }}
        value={partitionMethod}
        onChange={e => {
          setPartitionMethod(e.target.value);
          setStates(quickSort.getStates([...array], e.target.value));
          startOver();
        }}
      >
        <option value="firstElement">First Element</option>
        <option value="randomSelection">Random Selection</option>
      </select>
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
            <div
              className={styles.number}
              id={`qsNumber${number}`}
              style={getAnimationStyles(number)}
            >
              {number}
            </div>
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
      <div className={styles.row} style={{ flexWrap: 'wrap' }}>
        <button onClick={previous} className={styles.button} disabled={disablePrevious()}>
          Last
        </button>
        <button onClick={next} className={styles.button} disabled={disableNext()}>
          Next
        </button>
        <button onClick={startOver} className={styles.button}>
          Restart
        </button>
        <button onClick={shuffle} className={styles.button}>
          Shuffle
        </button>
        <button onClick={sort} className={styles.button}>
          Sort
        </button>
      </div>
      <div className={styles.row}>
        Step {currentStateIndex + 1} of {states.length}
      </div>
      <div className={styles.column}>{state.message}</div>
    </div>
  );
}

export default App;
