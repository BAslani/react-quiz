type Props = {
  idx: number
  numberOfQuestions: number
  points: number
  maxPoints: number
  answer: number | null
}

export default function Progress({
  idx,
  numberOfQuestions,
  points,
  maxPoints,
  answer,
}: Props) {
  return (
    <header className='progress'>
      <progress max={numberOfQuestions} value={idx + Number(answer !== null)} />
      <p>
        Question <strong>{idx + 1}</strong> / {numberOfQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {maxPoints}
      </p>
    </header>
  )
}
