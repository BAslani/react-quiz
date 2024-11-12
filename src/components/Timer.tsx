import { Dispatch, useEffect } from 'react'
import { Action } from '../App'

type Props = {
  dispatch: Dispatch<Action>
  remainingTime: number | null
}

function formatTimer(sec: number | null) {
  if (sec) {
    const mins = Math.floor(sec / 60)
    const seconds = sec % 60
    return `${mins < 10 ? `0${mins}` : mins}:${
      seconds < 10 ? `0${seconds}` : seconds
    }`
  }
  return 0
}

export default function Timer({ dispatch, remainingTime }: Props) {
  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)

    return () => clearInterval(timerId)
  }, [dispatch])
  return <div className='timer'>{formatTimer(remainingTime)}</div>
}
