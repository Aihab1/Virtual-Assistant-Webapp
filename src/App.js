import React, { useState, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

import wordsToNumbers from "words-to-numbers";

import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles.js";
import SudokuSolver from "./components/SudokuSolver/SudokuSolver";

const alanKey = process.env.REACT_APP_SECRET_KEY;

const App = () => {
  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(-1);
  const classes = useStyles();
  const articlesNotPresent =
    !newsArticles || (newsArticles && !newsArticles.length);
  const [isSudokuSolverOpened, setIsSudokuSolverOpened] = useState(false);
  const [sudokuBoard, setSudokuBoard] = useState(false);
  const [isSolvingSudoku, setIsSolvingSudoku] = useState(false);

  useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, savedArticles, number }) => {
        if (command === "newHeadlines") {
          console.log(savedArticles);
          setNewsArticles(savedArticles);
          setActiveArticle(-1);
          if (!savedArticles || savedArticles.length === 0) {
            setIsSudokuSolverOpened(false);
          }
        } else if (command === "highlight") {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if (command === "open") {
          const parsedNumber =
            number.length > 2
              ? wordsToNumbers(number, { fuzzy: true })
              : number;
          const article = savedArticles && savedArticles[parsedNumber - 1];

          if (parsedNumber > 20) {
            alanBtn().playText("Please try that again.");
          } else if (article) {
            window.open(article.url, "_blank");
            alanBtn().playText("Opening...");
          }
        } else if (command === "sudoku") {
          setIsSudokuSolverOpened(true);
        } else if (command === "solveSudoku") {
          setIsSolvingSudoku(true);
        }
      },
    });
  }, []);

  useEffect(() => {
    fetch("https://sugoku.herokuapp.com/board?difficulty=easy", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        if (!data?.board) return;
        setSudokuBoard(data.board);
      });
    });
  }, []);

  return (
    <div>
      {isSudokuSolverOpened ? (
        <>
          <button
            className={classes.backButton}
            onClick={() => {
              setIsSudokuSolverOpened(false);
            }}
          >
            CLICK or <i>Try Saying: "Go back"</i>
          </button>
          <SudokuSolver
            board={sudokuBoard}
            isSolving={isSolvingSudoku}
            setIsSolving={setIsSolvingSudoku}
          />
        </>
      ) : (
        <>
          {articlesNotPresent && (
            <div className={classes.outerContainer}>
              <h1 className={classes.topHeading}>
                Give your keyboard a break already.
              </h1>
              <p className={classes.desc}>
                Use your voice to search for news, get answers to basic math
                queries, know about bitcoin price fluctuations, get weather
                forecasts and more!
              </p>
              <a href="#explore">
                <button className={classes.exploreButton}>Let's Explore</button>
              </a>
            </div>
          )}
          <div id="explore">
            {!articlesNotPresent && (
              <button
                className={classes.backButton}
                onClick={() => {
                  setNewsArticles([]);
                  setActiveArticle(-1);
                }}
              >
                CLICK or <i>Try Saying: "Go back"</i>
              </button>
            )}

            <NewsCards articles={newsArticles} activeArticle={activeArticle} />
          </div>
        </>
      )}
    </div>
  );
};

export default App;
