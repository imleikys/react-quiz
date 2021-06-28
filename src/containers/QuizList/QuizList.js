import React from 'react';
import {NavLink} from 'react-router-dom';
import styles from './QuizList.module.css';
import Loader from '../../components/UI/Loader/Loader';
import { connect } from 'react-redux';
import {fetchQuizes} from '../../redux/actions/quiz';


class QuizList extends React.Component {

  

  renderQuizes() {
    return this.props.quizes.map((quiz, index) => {
      return (
        <li key={quiz.id}>
          <NavLink to={'/quiz/' + quiz.id}>
            Тест {index}
          </NavLink>
        </li>
      )
    }); 
  }

  componentDidMount() {
    this.props.fetchQuizes();
  }

  render() {
    return(
      <div className={styles.QuizList}>
        <div>
          <h1>Список тестов</h1>

          {
            this.props.loading ?
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

function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    loading: state.quiz.loading,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)
