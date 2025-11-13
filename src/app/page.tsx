"use client"
import { useSession, signIn, signOut } from "next-auth/react"

export default function Component() {
  const { data: session } = useSession()

  return session ? (
    <div>
      <h1>Hi {session.user?.name}</h1>
    </div>
  ) : (
    <div>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}
