import axios from "../../axios/axios-quiz"
import {
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCESS, 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZ_SUCCESS,
  QUIZ_SET_STATE,
  FINISH_QUIZ,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY
} from '../actions/actionTypes'


export function fetchQuizes() {

  return async (dispatch) => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get('/quizes.json');
      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        })
      });

      dispatch(fetchQuizesSuccess(quizes))

    } catch (e) {
      dispatch(fetchQuizesError(e))
    }

  }
}

export function fetchQuizByID(quizID) {
  return async (dispatch) => {
    dispatch(fetchQuizesStart)

    try {
      const response = await axios(`/quizes/${quizID}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  }
}

export function quizAnswerClick(answerID) {

  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === 'correct') {
        return;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if(question.rightAnswerId === answerID) {
      if (!results[question.id]){
        results[question.id] = 'correct';
      }

      dispatch(quizSetState({[answerID]: 'correct'}, results))
     
      const timeout = window.setTimeout(() => {
        if(isQuizFinished(state)) {
          dispatch(finishQuiz())
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1))
        }

        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'wrong';
      dispatch(quizSetState({[answerID]: 'wrong'}, results));
    }
  }
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  }
}

export function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length; 
}

export function quizNextQuestion(activeQuestion) {
  return {
    type: QUIZ_NEXT_QUESTION,
    activeQuestion,
  }
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ,
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, 
    results,
  }
}

export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz,
  }
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START,
  }
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes,
  }
}

export function fetchQuizesError(error) {
  return {
    type: FETCH_QUIZES_ERROR,
    error,
  }
}
