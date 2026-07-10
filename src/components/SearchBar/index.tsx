'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useLockScroll } from '@/hooks/useLockScroll'

export const SearchBar = ({ additionalClasses }: { additionalClasses?: string }) => {
  const params = useSearchParams()
  const router = useRouter()

  const [inputValue, setInputValue] = useState(params.get('q') ?? '')
  const [phase, setPhase] = useState<0 | 1 | 2>(0)
  const [recent, setRecent] = useState<string[]>([])

  const wrapperRef = useRef<HTMLDivElement>(null)


  useLockScroll(phase === 2)

  const handleFocus = () => {
    if (phase !== 0) return
    setRecent(readSearchHistory())
    setPhase(1)
    requestAnimationFrame(() => requestAnimationFrame(() => setPhase(2)))
  }

  const handleBlur = () => setPhase(0)

  useEffect(() => {
    if (phase === 0) return

    const onPointerDown = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        handleBlur()
      }
    }

    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [phase])


  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const next = new URLSearchParams(params.toString())
    if (inputValue.trim()) next.set('q', inputValue.trim())
    else next.delete('q')
    router.push(`/shop?${next.toString()}`)

    setPhase(0)
    addLocalStorage(inputValue)
  }


  const closeInput = () => {
    setPhase(0)
    setInputValue('')
  }

  const removeLocalStorage = () => {

  }

  const addLocalStorage = (q:string) => {
    const trimmed = q.trim()
    if(!trimmed) return

    const item = localStorage.getItem('searchHistory')
    const oldData:string[] = item ? JSON.parse(item) : []

    const newData = [trimmed, ...oldData.filter(el => el !== trimmed)].slice(0,5)

    localStorage.setItem('searchHistory',JSON.stringify(newData))
    setRecent(newData)
  }


  useEffect((() => {
    setRecent(readSearchHistory())
  }),[])


  const readSearchHistory = () => {
    try {
      const raw = localStorage.getItem('searchHistory')
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  useEffect(() => console.log(phase), [phase])

  const wrapperPos =
    phase === 0
      ? 'hidden'
      : phase === 1
        ? 'fixed inset-x-0 top-0 translate-x-20 translate-y-10 bg-white w-full h-100'
        : 'fixed inset-x-0 top-0 translate-x-0 translate-y-0 bg-white w-full h-100'


  const formPos =
    phase === 0
      ? 'translate-x-0 translate-y-0 w-42'
      : phase === 1
        ? 'translate-x-100 translate-y-10 w-42'
        : 'translate-x-0 translate-y-3 w-[1746px]'

  const transitionCls =
    phase === 1
      ? ''
      : phase === 2
        ? 'transition-all duration-700 ease-out'
        : 'transition-[width] duration-700 ease-out'

  return (
    <div
      ref={wrapperRef}
      onClick={handleFocus}
      className={`${additionalClasses ?? ''}`}>
      {/*<div onClick={handleBlur} className='absolute bg-gray-500 opacity-30 top-0 left-0 w-full h-screen'/>*/}
      <form
        onSubmit={formHandler}
        className={`h-9 relative will-change-[width] bg-[#f5f5f5] z-50 rounded-3xl flex pr-1 ${transitionCls} ${formPos}`}
      >
        <button
          type="submit"
          className="rounded-full w-9 h-9 hover:bg-gray-300 flex items-center justify-center shrink-0 mr-1 cursor-pointer"
        >
          <img src="/icon/search-icon.svg" />
        </button>
        <div className="w-full">
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search"
            className="placeholder:text-[#707483] text-black w-full h-full focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
        <button
          onClick={closeInput}
          className={`rounded-full w-9 h-9 hover:bg-gray-300 flex items-center justify-center shrink-0 cursor-pointer ${inputValue ? '' : 'hidden'}`}
        >
          <img src="/icon/search-icon.svg" />
        </button>
      </form>
      <div
        className={`transition-all flex duration-700 ease-out ${wrapperPos} text-black w-full`}
      >
        <div className="container">
          <div className="max-w-250 margin-x-auto pt-45">
            <h4>Recent Searches</h4>
            <div>
              {recent.map((item, i) => (
                <div key={i}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}