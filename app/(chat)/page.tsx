import { getMissingKeys } from '@/app/actions'
import { auth } from '@/auth'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { Session } from '@/lib/types'
import { nanoid } from '@/lib/utils'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'AI Chatbot'
}

export default async function IndexPage() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()

  if (!session) {
    redirect('/login')
  }

  return (
    <AI initialAIState={{ chatId: id, messages: [] }}>
      <Chat id={id} session={session} missingKeys={missingKeys} />
    </AI>
  )
}
