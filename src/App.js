import React, { useState, useEffect, useReducer } from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import QuickSort, { swap } from './QuickSort';

const quickSort = new QuickSort();

// const array = [5, 3, 9, 7, 1, 4, 8, 6, 2];
const array = [5, 3, 9, 7];

const actions = quickSort.getActions(array);
console.log(actions);

const reducer = (state, action) => {
  switch (action.type) {
    case 'quickSort':
      return {
        ...state,
        start: action.data.start,
        end: action.data.start,
        message: action.message
      };
    case 'info':
      return {
        ...state,
        message: action.message
      };
    case 'partition':
      return {
        ...state,
        i: action.data.i,
        j: action.data.j,
        pivot: action.data.pivot,
        start: action.data.start,
        end: action.data.end,
        message: action.message
      };
    case 'swap':
      const arrayWithSwap = [...state.array];
      swap(arrayWithSwap, action.data.i, action.data.j);
      return {
        ...state,
        array: arrayWithSwap,
        message: action.message
      };
    case 'incrementI':
      return {
        ...state,
        i: state.i + 1
      };
    case 'incrementJ':
      return {
        ...state,
        j: state.j + 1
      };
  }
};

function App() {
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [currentAction, setCurrentAction] = useState({});
  const [state, dispatch] = useReducer(reducer, { array });

  useEffect(() => {
    setCurrentAction(actions[currentActionIndex]);
    dispatch(actions[currentActionIndex]);
  }, [currentActionIndex]);
  const previous = () => {
    setCurrentActionIndex(currentActionIndex - 1);
  };

  const next = () => {
    setCurrentActionIndex(currentActionIndex + 1);
  };

  return (
    <>
      <div className={styles.row}>
        {state.array.map((number, i) => (
          <div className={styles.box} key={i}>
            {number}
          </div>
        ))}
      </div>
      <div className={styles.row}>
        {currentActionIndex + 1} of {actions.length}
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
      <div className={styles.row}>{currentAction.message}</div>
    </>
  );
}

export default App;
