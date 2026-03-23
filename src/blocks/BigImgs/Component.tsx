import type { BigImgs as BigImgsType, Media } from '@/payload-types'
import Image from 'next/image'
import React from 'react'
import { SmallWhiteBtn } from '@/components/SmallWhiteBtn/Component'

export const BigImgsBlock: React.FC<BigImgsType> = ({ blocks }) => {
  console.log(blocks[0].img)

  return (
    <section>
      <div className="flex">
        {blocks.map((block) => (
          <div key={block.id} className="relative aspect-square w-full">
            <a href={block.link?.url || undefined} className="absolute z-10 left-0 top-0 w-full h-full cursor-pointer" />
            <Image
              src={(block.img as Media).url!}
              alt={block.title}
              fill
              className="object-cover"
            />
            <div className='absolute left-9 bottom-9'>
              <h3 className='text-3xl'>{block.title}</h3>
              {block.btn && <SmallWhiteBtn
                href={block.link?.url}
                label={block.btn}
                customStyles='mt-4.5 relative z-50'/>
              }
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
