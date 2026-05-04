import { useEffect } from 'react'

export const useLockScroll = (isLocked:boolean) => {
  useEffect((() => {
    if(!isLocked) return

    let body = document.body.style.overflow
    const original = body
    body = 'hidden'

    return(() => {
      body = original;
    })

  }),[isLocked])
}