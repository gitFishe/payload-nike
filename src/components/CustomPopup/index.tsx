'use client'
import { useEffect, ReactNode } from 'react'
import { CrossIcon } from '@/components/icons/CrossIcon'

type ModalProps = {
  isShown: boolean
  onClose: () => void
  children: ReactNode
  className?: string
}

export const BasePopup = ({ isShown, onClose, children, className = '' }: ModalProps) => {
  useEffect(() => {
    if (!isShown) return
    document.body.style.overflow = 'hidden'
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onEsc)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onEsc)
    }
  }, [isShown, onClose])

  return (
    <div
      onClick={onClose}
      className={`w-screen h-screen flex items-center justify-center bg-black/50 left-0 top-0 z-50 
  overflow-hidden ${isShown ? 'fixed' : 'hidden'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`relative rounded-2xl bg-white overflow-y-auto no-scrollbar ${className}`}
      >
        <button
          onClick={onClose}
          className="absolute right-9 top-9 z-10 w-9 h-9 flex items-center justify-center rounded-full
  bg-light-gray hover:bg-dark-gray cursor-pointer"
        >
          <CrossIcon />
        </button>
        {children}
      </div>
    </div>
  )
}
