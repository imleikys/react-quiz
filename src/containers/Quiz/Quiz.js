import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

export default class Quiz extends Component {
  state = { 
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: 'Какого цвета небо?',
        rightAnswerId: 2,
        id: 1,
        answers: [
          {text: 'Чёрное', id: 1},
          {text: 'Синее', id: 2},
          {text: 'Красное', id: 3},
          {text: 'Зелёное', id:4},
        ]
      },
      {
        question: 'Кто такой Егор Летов?',
        rightAnswerId: 1,
        id: 2,
        answers: [
          {text: 'Музыкант', id: 1},
          {text: 'Актёр', id: 2},
          {text: 'Шафёр', id: 3},
          {text: 'Футболист', id:4},
        ]
      }
    ],
  }

  onAnswerClickHandler = (answerId) => {
    const question = this.state.quiz[this.state.activeQuestion];
    if(question.rightAnswerId === answerId) {

      this.setState({
        answerState: {[answerId]: 'correct'},
      })

      const timeout = window.setTimeout(() => {
        if(this.isQuizFinished()) {
          console.log('finish')
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);

    } else {
      this.setState({
        answerState: {[answerId]: 'wrong'},
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1> 
          <ActiveQuiz 
            answers={this.state.quiz[this.state.activeQuestion].answers} 
            question={this.state.quiz[this.state.activeQuestion].question}  
            onAnswerClick={this.onAnswerClickHandler}
            quizLength={this.state.quiz.length}
            answerNumber={this.state.activeQuestion + 1}
            state={this.state.answerState}
          />
        </div>
      </div>
    );
  }
}