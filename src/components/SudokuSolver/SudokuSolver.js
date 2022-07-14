import React, { useState, useEffect } from "react";

import styles from "./SudokuSolver.module.css";

const SudokuSolver = (props) => {
  const initialBoard = props.board.map((row) => [...row]);
  const [sudokuBoard, setSudokuBoard] = useState(
    props.board.map((row) => [...row])
  );
  const [selectedCell, setSelectedCell] = useState({ i: -1, j: -1 });
  const [isSolving, setIsSolving] = useState(false);
  const [isSolved, setIsSolved] = useState(false);

  const checkInput = (value) => {
    let regex =
      /^\d*$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 9;
    return !regex ? value.replace(value, "") : value;
  };

  const handleUpdateCell = (i, j, value) => {
    const newSudokuBoard = [...sudokuBoard.map((row) => [...row])];
    newSudokuBoard[i][j] = +value;
    setSudokuBoard(newSudokuBoard);
  };

  const handleInputChange = (e, i, j) => {
    const val = e.key === "Backspace" ? "0" : checkInput(e.key);
    if (!val?.length) return;
    handleUpdateCell(i, j, val);
    if (isSolved) setIsSolved(false);
    setSelectedCell({ i: -1, j: -1 });
  };

  const handleReset = () => {
    if (isSolving) return;
    const newSudokuBoard = [...initialBoard.map((row) => [...row])];
    setSudokuBoard(newSudokuBoard);
    setIsSolved(false);
    props.setIsSolving(false);
  };

  const solveSudokuBoard = (board) => {
    let emptyCell = findEmptyCell(board);
    let row = emptyCell[0];
    let col = emptyCell[1];

    if (row === -1 || col === -1) {
      return board;
    }

    let num = 1;
    do {
      if (checkValue(board, row, col, num)) {
        board[row][col] = num;
        solveSudokuBoard(board);
      }
    } while (++num <= 9);

    if (findEmptyCell(board)[0] !== -1) {
      board[row][col] = 0;
    }

    return board;
  };

  const handleSolve = () => {
    handleReset();
    setIsSolving(true);
    const board = [...initialBoard.map((row) => [...row])];
    const solvedBoard = solveSudokuBoard(board);
    setSudokuBoard(solvedBoard);
    setIsSolving(false);
    setIsSolved(true);
  };

  function checkColumn(board, column, value) {
    for (let i = 0; i < board.length; i++) {
      if (board[i][column] === value) {
        return false;
      }
    }

    return true;
  }

  function checkRow(board, row, value) {
    for (let i = 0; i < board[row].length; i++) {
      if (board[row][i] === value) {
        return false;
      }
    }

    return true;
  }

  function checkSquare(board, row, column, value) {
    let squareRow = Math.floor(row / 3) * 3;
    let squareCol = Math.floor(column / 3) * 3;

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[squareRow + i][squareCol + j] === value) return false;
      }
    }

    return true;
  }

  function checkValue(board, row, column, value) {
    if (
      checkRow(board, row, value) &&
      checkColumn(board, column, value) &&
      checkSquare(board, row, column, value)
    ) {
      return true;
    }

    return false;
  }

  function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }

    return [-1, -1];
  }

  useEffect(() => {
    if (props.isSolving) {
      handleSolve();
    }
  }, [props.isSolving]);

  return (
    <div className={styles.container}>
      <h1>Sudoku Solver</h1>
      <p>Try saying: "Solve this Sudoku board"</p>

      <>
        <div className={`${styles.sudoku} ${isSolving ? styles.disabled : ""}`}>
          {sudokuBoard.map((row, i) => (
            <div className={styles.row}>
              {row.map((val, j) => {
                return (
                  <>
                    {j === 3 || j === 6 ? (
                      <div className={styles.partition}></div>
                    ) : (
                      ""
                    )}
                    <input
                      className={`${styles.cell} ${
                        i === selectedCell.i && j === selectedCell.j
                          ? styles.selected
                          : ""
                      } ${isSolved ? styles.solved : ""}`}
                      disabled={
                        val !== 0 && initialBoard[i][j] === sudokuBoard[i][j]
                      }
                      value={val}
                      onKeyDown={(e) => handleInputChange(e, i, j)}
                      onClick={() => setSelectedCell({ i, j })}
                    />
                  </>
                );
              })}
            </div>
          ))}
        </div>
        <div className={styles.buttons}>
          <button onClick={handleReset}>Reset</button>
          <button onClick={handleSolve}>Solve</button>
        </div>
      </>
    </div>
  );
};

export default SudokuSolver;
