import { Dispatch } from 'react'
import { Action } from '../App'

type Props = {
  points: number
  maxPoints: number
  highScore: number
  dispatch: Dispatch<Action>
}

export default function FinishedScreen({
  maxPoints,
  points,
  highScore,
  dispatch,
}: Props) {
  const score = (points / maxPoints) * 100

  let emoji
  if (score === 100) emoji = '🥇'
  if (score >= 80 && score < 100) emoji = '🥈'
  if (score >= 50 && score < 80) emoji = '🥉'
  if (score < 50) emoji = '🤦🏼‍♂️'
  return (
    <>
      <p className='result'>
        <span>{emoji}</span>You scored <strong>{points}</strong> out of{' '}
        {maxPoints} ({Math.ceil(score)}%)
      </p>
      <p className='highscore'>(High score: {highScore} points)</p>
      <button
        className='btn btn-ui'
        onClick={() => dispatch({ type: 'restart' })}
      >
        Restart
      </button>
    </>
  )
}
