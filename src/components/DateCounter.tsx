import { useReducer } from 'react'

type CounterState = { count: number; step: number }
type CounterAction =
  | { type: 'inc' }
  | { type: 'dec' }
  | { type: 'reset' }
  | { type: 'setCount'; payload: number }
  | { type: 'setStep'; payload: number }

const initialState = { count: 0, step: 1 }

function reducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + state.step }
    case 'dec':
      return { ...state, count: state.count - state.step }
    case 'setCount':
      return { ...state, count: action.payload }
    case 'reset':
      return initialState
    case 'setStep':
      return { ...state, step: action.payload }
    default:
      throw new Error('Unknown action')
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { count, step } = state

  // This mutates the date object.
  const date = new Date('june 21 2027')
  date.setDate(date.getDate() + count)

  const defineCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setCount', payload: Number(e.target.value) })
  }

  const defineStep = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'setStep', payload: Number(e.target.value) })
  }

  return (
    <div className='counter'>
      <div>
        <input
          type='range'
          min='0'
          max='10'
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={() => dispatch({ type: 'dec' })}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={() => dispatch({ type: 'inc' })}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    </div>
  )
}
export default DateCounter
