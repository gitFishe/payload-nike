'use client'

import React, { useRef, useState, useCallback } from 'react'

type Props = {
  images: string[]
  alt: string
}

export const ProductGallery: React.FC<Props> = ({ images, alt }) => {
  const [active, setActive] = useState(0)
  const thumbnailsRef = useRef<HTMLDivElement>(null)

  // Claude code mouse handler for better interaction
  const handleThumbnailMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = thumbnailsRef.current
    if (!container) return
    const { top } = container.getBoundingClientRect()
    const relY = e.clientY - top + container.scrollTop
    // each thumbnail: 80px (h-20) + 8px gap (gap-2)
    const itemHeight = 88
    const index = Math.floor(relY / itemHeight)
    const clamped = Math.max(0, Math.min(images.length - 1, index))
    setActive((prev) => (prev === clamped ? prev : clamped))
  }, [images.length])

  const GalleryBtnNext = () => (
    <button
      onClick={() => setActive((prev) => (prev + 1) % images.length)}
      className="w-9 h-9 rounded-full bg-white flex justify-center items-center cursor-pointer"
    >
      <img src={'/icon/swiper-arrow-right.svg'} />
    </button>
  )

  const GalleryBtnPrev = () => (
    <button
      onClick={() => setActive((prev) => (prev - 1 + images.length) % images.length)}
      className="w-9 h-9 rounded-full bg-white flex justify-center items-center cursor-pointer"
    >
      <img className='rotate-180' src={'/icon/swiper-arrow-right.svg'} />
    </button>
  )


  return (
    <div className="flex gap-4 h-140">
      <div
        ref={thumbnailsRef}
        onMouseMove={handleThumbnailMouseMove}
        className="flex flex-col gap-2 overflow-y-auto w-20 shrink-0"
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`w-20 h-20 shrink-0 border-2 rounded-md overflow-hidden transition-none ${
              active === i ? 'border-black' : 'border-transparent'
            }`}
          >
            <img src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      <div className="relative rounded-xl overflow-hidden h-full aspect-[4/5]">
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
            style={{ opacity: active === i ? 1 : 0 }}
          />
        ))}
        <div className="absolute right-10 bottom-10 flex gap-2">
          <GalleryBtnPrev />
          <GalleryBtnNext />
        </div>
      </div>
    </div>
  )
}
