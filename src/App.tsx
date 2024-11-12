import { useEffect, useReducer } from 'react'
import Header from './components/Header'
import Main from './components/Main'
import Loader from './components/Loader'
import ErrorElement from './components/Error'
import StartScreen from './components/StartScreen'
import Question from './components/Question'
import { QuestionType } from './types'
import NextButton from './components/NextButton'
import Progress from './components/Progress'
import FinishedScreen from './components/FinishedScreen'
import Footer from './components/Footer'
import Timer from './components/Timer'

export type StatusType = 'loading' | 'error' | 'ready' | 'active' | 'finished'

type QuestionsStateType = {
  questions: QuestionType[]
  status: StatusType
  currIndex: number
  answer: number | null
  points: number
  highScore: number
  remainingTime: number | null
}

export type Action =
  | { type: 'dataReceived'; payload: QuestionType[] }
  | { type: 'dataFailed' }
  | { type: 'start' }
  | { type: 'newAnswer'; payload: number }
  | { type: 'nextQuestion' }
  | { type: 'finish' }
  | { type: 'restart' }
  | { type: 'tick' }

const SECONDS_PER_QUESTIONS = 20

const initialState: QuestionsStateType = {
  questions: [],
  status: 'loading',
  currIndex: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingTime: null,
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
        remainingTime: state.questions.length * SECONDS_PER_QUESTIONS,
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
    case 'nextQuestion':
      return {
        ...state,
        currIndex: state.currIndex + 1,
        answer: null,
      }
    case 'finish':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        highScore: state.highScore,
        status: 'ready',
        questions: state.questions,
      }
    case 'tick':
      return {
        ...state,
        remainingTime: state.remainingTime ? state.remainingTime - 1 : null,
        status: state.remainingTime === 0 ? 'finished' : state.status,
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    default:
      throw new Error('Action unknown')
  }
}

export default function App() {
  const [
    { questions, status, currIndex, answer, points, highScore, remainingTime },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numberOfQuestions = questions.length
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  )

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
          <>
            <Progress
              idx={currIndex}
              points={points}
              numberOfQuestions={numberOfQuestions}
              maxPoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={questions[currIndex]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingTime={remainingTime} />
              <NextButton
                answer={answer}
                dispatch={dispatch}
                idx={currIndex}
                numberOfQuestions={numberOfQuestions}
              />
            </Footer>
          </>
        )}
        {status === 'finished' && (
          <FinishedScreen
            maxPoints={maxPossiblePoints}
            points={points}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}
