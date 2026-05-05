'use client'

import { Media } from '@/payload-types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useEffect, useState } from 'react'
import type { SmallCategories } from '@/payload-types'

export const SmallCategoriesBlock = (data: SmallCategories) => {
  const [isActive, setIsActive] = useState<number | null>(null)

  const blocks = data.blocks
  console.log(blocks)
  
  useEffect(() => {
    if (isActive === null) return

    const close = () => setIsActive(null)

    window.addEventListener('scroll', close, { passive: true })
    window.addEventListener('click', close)

    return () => {
      window.removeEventListener('scroll', close)
      window.removeEventListener('click', close)
    }
  }, [isActive])

  return (
    <section className="flex gap-3">
      <div className="container">
        <Swiper
          slidesPerView={1.5}
          spaceBetween={16}
          breakpoints={{
            990: {
              slidesPerView: blocks.length,
              spaceBetween: 16,
            },
          }}
        >
          {blocks.map((block, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full aspect-3/4">
                <a href={block.link?.url ?? '#'} className='absolute left-0 top-0 w-full h-full cursor-pointer z-10'/>
                <div className="h-full w-full">
                  {typeof block.img === 'object' && block.img.url && (
                    <Image
                      className="object-cover"
                      fill
                      src={block.img.url}
                      alt={block.img.alt ?? ''}
                    />
                  )}
                </div>
                <div
                  // onMouseLeave={() => setIsActive(null)}
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsActive(i)
                  }}
                  className="bg-white z-20 inline-block py-2 px-3.5 absolute bottom-6 left-8 rounded-[20px] hover:bg-gray-400 cursor-pointer text-primary font-semibold"
                >
                  <span className="">{block.btnLabel}</span>
                  <div
                    className={`absolute bottom-0 left-0 w-full rounded-[20px] bg-white min-w-33.25 overflow-hidden ${isActive === i ? 'opacity-100' : 'opacity-0 -z-50'}`}
                  >
                    <ul>
                      {block.tabLinks?.map((item, j) => {
                        const timing = j * 20

                        return (
                          <li
                            key={j}
                            style={{
                              transform: isActive === i ? 'translateX(0)' : 'translateX(-100%)',
                              opacity: isActive === i ? 1 : 0,
                              transition: `transform 600ms ${250 + timing}ms, opacity 950ms ${200 + timing}ms`,
                            }}
                            className="px-7 py-2 pt-3"
                          >
                            <a href={item.link.url ?? '#'}>{item.LinkName}</a>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}