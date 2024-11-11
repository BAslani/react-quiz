import { Dispatch } from 'react'
import { QuestionType } from '../types'
import { Action } from '../App'

type Props = {
  question: QuestionType
  answer: number | null
  dispatch: Dispatch<Action>
}

export default function Options({ question, answer, dispatch }: Props) {
  const hasAnswered = answer !== null
  return (
    <div className='options'>
      {question.options.map((option, idx) => (
        <button
          className={`btn btn-option ${idx === answer ? 'answer' : ''} ${
            hasAnswered
              ? idx === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          key={idx}
          onClick={() => dispatch({ type: 'newAnswer', payload: idx })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  )
}
