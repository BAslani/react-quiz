import { Dispatch } from 'react'
import { Action } from '../App'

type Props = {
  idx: number
  numberOfQuestions: number
  answer: number | null
  dispatch: Dispatch<Action>
}

export default function NextButton({
  answer,
  dispatch,
  idx,
  numberOfQuestions,
}: Props) {
  if (answer === null) return null
  if (idx < numberOfQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'nextQuestion' })}
      >
        Next
      </button>
    )
  }
  if (idx === numberOfQuestions - 1) {
    return (
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'finish' })}
      >
        Finish
      </button>
    )
  }
}
