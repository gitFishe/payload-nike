import { BasePopup } from '@/components/CustomPopup'
import { useEffect, useState } from 'react'
import { CartItemType } from '@/components/CartItem'
import { Swiper, SwiperSlide } from 'swiper/react'

import type { Swiper as SwiperType } from 'swiper'
import { SummaryArrow } from '@/components/icons/SummaryArrow'
import { CustomInput } from '@/components/CustomInput'

type CartPopupProps = {
  isShown: boolean
  onClose: () => void
  item: CartItemType
  onUpdate: (size: number) => void
}

export const CartPopup = ({ isShown, onClose, item, onUpdate }: CartPopupProps) => {

  const images = item.imageUrl ? Array(5).fill(item.imageUrl) : []

  const [swiper, setSwiper] = useState<SwiperType | null>(null)
  const [isBeginning, setIsBeginning] = useState(false)
  const [isEnd, setIsEnd] = useState(true)

  const [selectedSize, setSelectedSize] = useState(7)

  const updateSizeHandler = (size: number) => {
    if (selectedSize !== size) {
      setSelectedSize(size)
    }
  }

  useEffect(() => {
    if (!isShown) return
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [isShown])


  return (
    <BasePopup
      isShown={isShown}
      onClose={onClose}
      className="max-w-232 max-h-130 max-h-[80%] w-full"
    >
      <div className="flex items-stretch h-130">
        <h2>Edit Password</h2>
        <div>
          <CustomInput />
          <CustomInput />
          <CustomInput />
        </div>
        <div>
          <div className="relative pl-7">
            <span>Password requirements:</span>
          </div>
          <div className="relative pl-7">
            <div className="bg-black w-6 h-6 absolute left-0 top-0"></div>
            <span>Minimum of 8 characters</span>
          </div>
          <div className="relative pl-7">
            <div className="bg-black w-6 h-6 absolute left-0 top-0"></div>
            <span>Uppercase, lowercase letters, and one number</span>
          </div>
        </div>
      </div>
    </BasePopup>
  )
}
