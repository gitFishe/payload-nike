import React from 'react'

export const SmallWhiteBtn = ({
  href,
  label,
  type = 'link',
  key,
  customStyles,
}: {
  customStyles?: string
  key?: string
  href: string | undefined | null
  label: string
  type?: 'link' | 'video'
}) => {
  let inside: React.ReactNode = ''

  if (type === 'link') {
    inside = <a href={href || undefined}>{label}</a>
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
      className={`px-4 py-1.5 bg-white rounded-[30px] text-black inline-block font-medium cursor-pointer hover:bg-[#CACACB] ${customStyles}`}
    >
      {inside}
    </button>
  )
}
