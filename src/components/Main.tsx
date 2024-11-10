import { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Main({ children }: Props) {
  return <main className='main'>{children}</main>
}
