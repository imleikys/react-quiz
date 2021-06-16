import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './QuizList.module.css';

export default class QuizList extends React.Component {

  renderQuizes() {
    return [1,2,3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={'/quiz/' + quiz}>
            Тест {quiz}
          </NavLink>
        </li>
      )
    }); 
  }

  render() {
    return(
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>

          <ul>
            {this.renderQuizes()}
          </ul>
        </div>
      </div>
    );
  }
}
