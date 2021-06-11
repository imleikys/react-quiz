import React from 'react';
import styles from './FinishedQuiz.module.css';
import Button from '../UI/Button/Button';

const FinishedQuiz = (props) => { 
  const correctCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'correct') {
      total++;
    }

    return total;
  }, 0)

  return (
    <div className={styles.FinishedQuiz}>
      <ul>
        {props.quiz.map((quizItem, index) => {
          const classes = [
            'fa', 
            props.results[quizItem.id] === 'wrong' ? 'fa-times' : 'fa-check',
            styles[props.results[quizItem.id]],
          ]
          return (
            <li key={index}>
              <strong>{index + 1}. </strong>
              {quizItem.question}
              <i className={classes.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>Правильно {correctCount} из {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetry} type="primary">Повторить</Button>
        <Button type="correct">Перейти в список тестов</Button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
