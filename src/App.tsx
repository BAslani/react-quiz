import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import ErrorElement from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import { QuestionType } from './types'

export type StatusType = 'loading' | 'error' | 'ready' | 'active' | 'finished'

type QuestionsStateType = {
  questions: QuestionType[]
  status: StatusType
  currIndex: number
  answer: number | null
  points: number
}

export type Action =
  | { type: 'dataReceived'; payload: QuestionType[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }

const initialState: QuestionsStateType = {
  questions: [],
  status: 'loading',
  currIndex: 0,
  answer: null,
  points: 0,
}

function reducer(
  state: QuestionsStateType,
  action: Action
): QuestionsStateType {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      }
    case 'dataFailed':
      return {
        ...state,
        status: 'error',
      }
    case 'start':
      return {
        ...state,
        status: 'active',
      }
    case 'newAnswer': {
      const question = state.questions[state.currIndex]
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
    }
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [{ questions, status, currIndex, answer }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const numberOfQuestions = questions.length

  useEffect(() => {
    fetch('http://localhost:8000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch(() => dispatch({ type: 'dataFailed' }))
  }, [])

  return (
    <div className='app'>
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <ErrorElement />}
        {status === 'ready' && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === 'active' && (
          <Question
            question={questions[currIndex]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}
