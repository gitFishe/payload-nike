import { CrossIcon } from '@/components/icons/CrossIcon'
import { useEffect, useState } from 'react'
import { CartItemType } from '@/components/CartItem'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Swiper as SwiperType } from 'swiper'
import { SummaryArrow } from '@/components/icons/SummaryArrow'

type CartPopupProps = {
  isShown: boolean
  onClose: () => void
  item: CartItemType
  onUpdate: (size:number) => void
}

export const CartPopup = ({isShown, onClose, item, onUpdate}:CartPopupProps) => {


  const images = item.imageUrl ? Array(5).fill(item.imageUrl) : []

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(false)
  const [isEnd, setIsEnd] = useState(true)

  const [selectedSize, setSelectedSize] = useState(7)


  const updateSizeHandler = (size:number) => {
    if (selectedSize !== size) {
      setSelectedSize(size)
    }
  }

  useEffect(() => {
    if (!isShown) return
    document.body.style.overflow = 'hidden'
    return () => {document.body.style.overflow = ''}
  },[isShown])

  return (
    <div
      onClick={onClose}
      className={`w-screen h-screen flex items-center justify-center bg-black/50 left-0 top-0 z-50 overflow-hidden ${isShown ? 'fixed' : 'hidden'}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-2xl max-w-232 max-h-130 max-h-[80%] w-full bg-white overflow-y-auto no-scrollbar"
      >
        <div className="flex items-stretch h-130">
          <div className="shrink-0 w-1/2 relative">
            <Swiper
              allowTouchMove={false}
              onSwiper={(s) => {
                setSwiper(s)
                setIsBeginning(s.isBeginning)
                setIsEnd(s.isEnd)
              }}
              onSlideChange={(s) => {
                setIsBeginning(s.isBeginning)
                setIsEnd(s.isEnd)
              }}
              className="h-full w-full"
            >
              {images.map((src, i) => (
                <SwiperSlide key={i}>
                  <img className="h-full w-full object-cover" src={src} />
                </SwiperSlide>
              ))}
            </Swiper>
            {!isBeginning && (
              <button
                onClick={() => swiper?.slidePrev()}
                className="w-12 h-12 z-50 bg-border absolute right-24 top-[calc(100%-72px)] flex items-center justify-center rounded-full cursor-pointer hover:bg-dark-gray"
              >
                <SummaryArrow styles="rotate-90" />
              </button>
            )}
            {!isEnd && (
              <button
                onClick={() => swiper?.slideNext()}
                className="w-12 h-12 z-50 rotate-270 bg-border absolute right-6 top-[calc(100%-72px)] flex items-center justify-center rounded-full cursor-pointer hover:bg-dark-gray"
              >
                <SummaryArrow />
              </button>
            )}
          </div>
          <div className="relative w-1/2 shrink-0 flex flex-col min-h-0 h-full">
            <div className="p-9 relative flex flex-col shrink-0">
              <div
                onClick={onClose}
                className="w-9 h-9 right-9 top-9 flex items-center justify-center rounded-full bg-light-gray cursor-pointer absolute hover:bg-dark-gray"
              >
                <CrossIcon />
              </div>

              <h2 className="font-semibold text-xl">{item.title}</h2>
              <span>Lorem ipsum dolor sit.</span>
              <span className="pt-2">${item.price}</span>
            </div>

            <div className="flex overflow-y-auto  flex-wrap mx-9 gap-1 flex-1 min-h-0 no-scrollbar">
              {Array.from({length:17}, (_, idx) => {
                const size = 7 + idx * 0.5
                return (
                  <div
                    onClick={() => updateSizeHandler(size)}
                    key={idx}
                    className={`w-[calc((100%-8px)/3)] border border-[#cacacb] rounded-[4px] flex justify-center cursor-pointer items-center h-12 ${size === selectedSize ? 'border border-black' : ''}`}
                  >
                    <span>
                      M {size} / W {size + 1.5}
                    </span>
                  </div>
                )
              })}
            </div>

            <div className="border-t px-9 py-6 border-border flex justify-between items-center shrink-0">
              <a className="underline cursor-pointer text-sm underline-offset-4 decoration-2 font-semibold">
                View Full Product
              </a>
              <button
                onClick={() => {
                  onUpdate(selectedSize)
                  onClose()
                }}
                className="bg-black text-white rounded-full px-6 py-3 cursor-pointer hover:bg-[#707072]">
                <span>Update Product</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}