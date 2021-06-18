import React, {Component} from 'react';
import classes from './Quiz.module.css';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

export default class Quiz extends Component {
  state = { 
    results: {},
    isFinished: false,
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
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'correct') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if(question.rightAnswerId === answerId) {
      if (!results[question.id]){
        results[question.id] = 'correct';
      }

      this.setState({
        answerState: {[answerId]: 'correct'},
        results,
      })

      const timeout = window.setTimeout(() => {
        if(this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }

        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'wrong';
      this.setState({
        answerState: {[answerId]: 'wrong'},
        results,
      })
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    })
  }

  componentDidMount() {
    console.log('Quiz ID: ' + this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1> 

          {
            this.state.isFinished 
              ? <FinishedQuiz 
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
              : 
              <ActiveQuiz 
                answers={this.state.quiz[this.state.activeQuestion].answers} 
                question={this.state.quiz[this.state.activeQuestion].question}  
                onAnswerClick={this.onAnswerClickHandler}
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                state={this.state.answerState}
              />
          }

        </div>
      </div>
    );
  }
}