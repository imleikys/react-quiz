import {combineReducers} from 'redux'
import quizReducer from './quiz'
import createReducer from './createQuiz'

export default combineReducers({
  quiz: quizReducer,
  quizCreator: createReducer
})