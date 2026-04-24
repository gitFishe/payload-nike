'use client'

import type { Swiper as SwiperBlock } from '@/payload-types'

import Image from 'next/image'
import { Media } from '@/components/Media'
import React, { useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import { swiperBtn } from '@/blocks/CustomSwiper/SwiperBtn'
import { SmallWhiteBtn } from '@/components/SmallWhiteBtn/Component'

export const CustomSwiperBlock: React.FC<SwiperBlock> = ({ slides }) => {
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isAnimating, setIsAnimating] = useState(false)

  const progressCircle = useRef<SVGCircleElement>(null)

  const handlePrev = () => {
    if(isAnimating) return
    swiperInstance.slidePrev()
  }
  const handleNext = () => {
    if (isAnimating) return
    swiperInstance.slideNext()
  }

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || !slides?.length) return null

  const toggleAutoPlay = () => {
    if(isPlaying) {
      swiperInstance.autoplay.pause()
    } else {
      swiperInstance.autoplay.resume()
    }

    setIsPlaying(!isPlaying)
    return
  }

  const onAutoplayTimeLeft = (s: any, time: number, progress: number) => {
    if (progressCircle.current) {
      progressCircle.current.style.setProperty('--progress', String(progress))
    }
  }

  return (
    <section className="overflow-hidden relative">
      <Swiper
        modules={[Autoplay]}
        onSwiper={setSwiperInstance}
        autoplay={{
          delay: 4000,
          disableOnInteraction:false,
        }}
        loop={true}
        speed={1300}
        allowTouchMove={false}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        onSlideChangeTransitionStart={() => setIsAnimating(true)}
        onSlideChangeTransitionEnd={() => setIsAnimating(false)}
        slidesPerView={1}
        className="relative h-225 [&>.swiper-wrapper]:ease-in overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide
            className="overflow-hidden relative rounded-md bg-card"
            key={slide.id ?? index}
          >
            <Media
              className="absolute h-full w-full left-0 top-0 -z-10"
              imgClassName="h-full w-full object-cover"
              resource={slide.background || undefined}
            />
            <div
              className="w-full flex flex-col justify-center items-center top-[calc(66.66667%-48px)] absolute left-0 z-50
                transition-all duration-1200 ease-out
                in-[.swiper-slide-next]:translate-x-400
                in-[.swiper-slide-prev]:-translate-x-400"
            >
              <h3 className="font-medium text-white text-[76px] select-none">{slide.title}</h3>
              <p className="text-base text-white mt-2 select-none">{slide.description}</p>
              <div className="mt-4.5 flex not-last:mr-1.5 relative z-50">
                {slide.buttonsGroup?.map((button) =>
                  SmallWhiteBtn({
                    key: button.id || undefined,
                    href: button.link?.url || undefined,
                    label: button.label,
                    type: button.buttonType,
                  }),
                )}
              </div>
            </div>
            <a href={slide.link.url || undefined} className="absolute left-0 top-0 w-full h-full cursor-pointer" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="navigation-buttons flex absolute right-6 bottom-6 z-10">
        <button
          className="w-10 h-10 mr-4  rounded-full flex justify-center items-center cursor-pointer relative"
          onClick={toggleAutoPlay}
        >
          <svg
            viewBox="0 0 48 48"
            className="absolute top-0 left-0 w-full h-full -rotate-90 pointer-events-none"
          >
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#fff"
              strokeOpacity=".4"
              strokeWidth="3"
            />
            <circle
              ref={progressCircle}
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="#fff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="138.2"
              strokeDashoffset="calc(138.2 * var(--progress, 1))"
            />
          </svg>
          <img
            alt="play-pause"
            src={isPlaying ? '/icon/swiper-pause.svg' : '/icon/swiper-play.svg'}
            className="w-5 h-5 z-10 pointer-events-none"
          />
        </button>
        <button
          onClick={handlePrev}
          className={`my-prev-btn w-9 h-9 rounded-full flex justify-center items-center mr-2 relative bg-gray-300 ${isAnimating ? 'cursor-auto bg-gray-300' : 'cursor-pointer hover:bg-white'}`}
          disabled={isAnimating}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="rotate-180" alt={'btn'} src="/icon/swiper-arrow-right.svg" />
        </button>
        <button
          onClick={handleNext}
          disabled={isAnimating}
          className={`my-prev-btn w-9 h-9 rounded-full flex justify-center items-center relative bg-gray-300 ${isAnimating ? 'cursor-auto bg-gray-300' : 'cursor-pointer hover:bg-white'}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt={'btn'} src="/icon/swiper-arrow-right.svg" />
        </button>
      </div>
    </section>
  )
}
