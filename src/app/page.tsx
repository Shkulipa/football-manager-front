import { Btn } from '@/components/btn/btn'

export default function Home() {
  return (
    <div>
      {process.env.TEST}
      <Btn>
        Some Text
      </Btn>
    </div>
  )
}
