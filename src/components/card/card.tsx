import { useEffect, useState } from 'react';

import classes from './card.module.scss';

const DATA = { task: '7 x 8', answers: [56, 65, 48], answer: 56 };
const ANSWER_UI = {
  wrong: 'Не вірно',
  right: 'Вірно',
};

export const Card = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [answer, setAnswer] = useState(null);

  const handleCardClick = (answer: any) => {
    setAnswer(answer);
  };

  const resetBoard = () => {
    setAnswer(null);
    setIsFlipped(false);
  };

  useEffect(() => {
    if (answer) {
      setIsFlipped(true);
    }
  }, [answer]);

  const rightAnswer = answer === DATA.answer;

  return (
    <div className={`${classes.card} ${isFlipped ? classes.flipped : ''}`}>
      <div className={classes.card_inner}>
        <div className={classes.card_front}>
          <p className={classes.task}>7 x 8</p>
          <br />
          <div className={classes.buttons}>
            {DATA.answers.map((answer) => {
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
            <div className={classes.simbol}>{rightAnswer ? '✅' : '❌'}</div>
            <div className={classes.buttons}>
              <button className={classes.buttons_btn} onClick={resetBoard}>
                {rightAnswer ? 'Наступна вправа' : 'Спробувати ще'}
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.card_back}></div>
        )}
      </div>
    </div>
  );
};
