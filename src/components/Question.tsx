import { Dispatch } from 'react'
import { QuestionType } from '../types'
import Options from './Options'
import { Action } from '../App'

type Props = {
  question: QuestionType
  answer: number | null
  dispatch: Dispatch<Action>
}

export default function Question({ question, answer, dispatch }: Props) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  )
}
