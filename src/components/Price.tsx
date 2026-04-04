import React from 'react'

type PriceProps = {
  currentPrice: number
  initialPrice?: number | null
  discountPercentage?: number | null
  currency?: string
  className?: string
}

export const Price = ({
  currentPrice,
  initialPrice,
  discountPercentage,
  currency = 'USD',
  className = '',
}: PriceProps) => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 2,
    }).format(amount)
  }

  return (
    <div className={`flex font-medium ${className}`}>
      <span>{formatPrice(currentPrice)}</span>

      {initialPrice && initialPrice > currentPrice && <span className='text-secondary line-through pl-1.25'>{formatPrice(initialPrice)}</span>}

      {(discountPercentage ?? 0 ) > 0 && <span className='pl-2 text-success'>-{discountPercentage}% off</span>}
    </div>
  )
}
