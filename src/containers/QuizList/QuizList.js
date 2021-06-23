import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './QuizList.module.css';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';


export default class QuizList extends React.Component {

  state = {
    quizes: [],
    loading: true,
  }

  renderQuizes() {
    return this.state.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            Тест {index}
          </NavLink>
        </li>
      )
    }); 
  }

  async componentDidMount() {
    try {
      const response = await axios.get('quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          index: `Тест №${index + 1}`,
        })
      });

      this.setState({
        quizes, loading: false,
      })
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return(
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {
            this.state.loading ?
              <Loader /> :
              <ul>
                {this.renderQuizes()}
              </ul>
          }
          
        </div>
      </div>
    );
  }
}
