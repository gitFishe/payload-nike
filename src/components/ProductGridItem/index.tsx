import type { Product, Variant } from '@/payload-types'

import Link from 'next/link'
import React from 'react'
import clsx from 'clsx'
import { Media } from '@/components/Media'
import { Price } from '@/components/Price'

type Props = {
  product: Partial<Product>
}

export const ProductGridItem: React.FC<Props> = ({ product }) => {
  const { imageUrl, title, subTitle, currentPrice, initialPrice, discountPercentage, currency } =
    product

  // const image =
  //   gallery?.[0]?.image && typeof gallery[0]?.image !== 'string' ? gallery[0]?.image : false


  return (
    <Link className="relative w-[calc((100%-2rem)/3)]" href={`/products/${product.productCode}`}>
      {imageUrl && imageUrl.startsWith('http') ? (
        <Media
          className={clsx('relative aspect-square bg-primary-foreground')}
          imgClassName={clsx('object-cover transition duration-300 ease-in-out group-hover:scale-102')}
          fill
          src={imageUrl}
        />
      ) : (
        <div>
          <span>Image Is Not Found</span>
        </div>
      )}

      <div className="pt-3 min-h-55">
        <div>
          <span>{title}</span>
        </div>
        <div className="text-base text-secondary">
          <span>{subTitle}</span>
        </div>

        <div className="">
          <Price
            currentPrice={currentPrice || 0}
            initialPrice={initialPrice || null}
            discountPercentage={discountPercentage || null}
            currency={currency || 'USD'}
          />
        </div>
      </div>
    </Link>
  )
}
