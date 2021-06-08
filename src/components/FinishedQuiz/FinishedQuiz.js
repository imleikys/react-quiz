import React from 'react';
import classes from './FinishedQuiz.module.css';

const FinishedQuiz = (props) => { 

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        <li>
          <strong>1. </strong>
          How are you
          <i className={'fa fa-times ' + classes.wrong}/>
        </li>
        <li>
          <strong>1. </strong>
          How are you
          <i className={'fa fa-check ' + classes.correct}/>
        </li>
      </ul>

      <p>Правильно 2 из 2</p>

      <div>
        <button>Повторить</button>
      </div>
    </div>
  );
}

export default FinishedQuiz;
