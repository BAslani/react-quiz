import { Dispatch } from 'react'
import { Action } from '../App'

type Props = {
  answer: number | null
  dispatch: Dispatch<Action>
}

export default function NextButton({ answer, dispatch }: Props) {
  if (answer === null) return null
  return (
    <button
      className='btn btn-ui'
      onClick={() => dispatch({ type: 'nextQuestion' })}
    >
      Next
    </button>
  )
}
