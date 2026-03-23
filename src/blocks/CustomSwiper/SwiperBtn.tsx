import React from 'react'

export const swiperBtn = ({
  href,
  label,
  type,
  key,
}: {
  key: string,
  href: string
  label: string
  type: 'link' | 'video'
}) => {
  let inside: React.ReactNode = ''

  if (type === 'link') {
    inside = <a href={href}>{label}</a>
  } else {
    inside = (
      <div className="flex items-center">
        <span>{label}</span>
        <img src="/icon/swiper-video-arrow.svg" />
      </div>
    )
  }

  return (
    <button
      key={key}
      className={`px-4 py-1.5 bg-white rounded-[30px] text-black inline-block font-medium cursor-pointer`}
    >
      {inside}
    </button>
  )
}