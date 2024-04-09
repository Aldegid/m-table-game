import { useEffect, useState } from 'react';

import classes from './card.module.scss';
import error from '../../assets/error.svg';
import success from '../../assets/success.svg';

import { getRandomElement, shuffleArray } from '../../helpers/helpers';

import { LESSONS } from '../../data/lessons';

type Answer = null | number;

export const Card: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState<Answer>(null);
  const [currentLesson, setCurrentLesson] = useState(LESSONS[0]);

  const rightAnswer = answer === currentLesson.answer;

  console.log(answer, currentLesson.answer);

  const handleCardClick = (answer: number) => {
    setAnswer(answer);
  };

  const resetBoard = () => {
    setAnswer(null);
    setIsFlipped(false);
  };

  const getNextLesson = () => {
    setCurrentLesson(getRandomElement(LESSONS));
  };

  const successAction = () => {
    getNextLesson();
    resetBoard();
  };

  useEffect(() => {
    if (answer) {
      setIsFlipped(true);
    }
  }, [answer]);

  const suffleAnswers = shuffleArray(currentLesson.answers);

  return (
    <div className={`${classes.card} ${isFlipped ? classes.flipped : ''}`}>
      <pre>{JSON.stringify(currentLesson, null, 2)}</pre>
      <div className={classes.card_inner}>
        <div className={classes.card_front}>
          <p className={classes.task}>{currentLesson.task}</p>
          <br />
          <div className={classes.buttons}>
            {suffleAnswers.map((answer) => {
              return (
                <button
                  className={classes.buttons_btn}
                  key={answer}
                  onClick={() => handleCardClick(answer)}
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
        {answer ? (
          <div
            className={`${classes.card_back} ${
              rightAnswer && answer
                ? classes.card_back__right
                : classes.card_back__wrong
            }`}
          >
            <div className={classes.simbol}>
              {rightAnswer ? (
                <img src={success} alt='success' />
              ) : (
                <img src={error} alt='error' />
              )}
            </div>
            <div className={classes.buttons}>
              <button
                className={classes.buttons_btn}
                onClick={rightAnswer ? successAction : resetBoard}
              >
                {rightAnswer ? 'Next exercise' : 'Try again'}
              </button>
            </div>
          </div>
        ) : (
          <div className={`${classes.card_back} ${classes.card_blank}`}></div>
        )}
      </div>
    </div>
  );
};
