import configPromise from '@payload-config'
import { getPayload } from 'payload'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { ProductGallery } from '@/components/ProductGallery'

type Args = {
  params: Promise<{
    slug: string
  }>
}

// 1. ШУКАЄМО ПО PRODUCT CODE (Артикулу), А НЕ ПО SLUG
const queryProductBySlug = async ({ slug }: { slug: string }) => {
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'products',
    limit: 1,
    where: {
      productCode: {
        // <--- ТЕПЕР ШУКАЄМО ПРАВИЛЬНО
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
}

// 2. ГОЛОВНА СТОРІНКА ТОВАРУ
export default async function ProductPage({ params }: Args) {
  const { slug } = await params
  const product = await queryProductBySlug({ slug })

  if (!product) return notFound()

  const images = product.imageUrl
    ? Array.from({ length: 5 }, () => product.imageUrl as string)
    : []


  return (
    <div className="container mx-auto px-4 pb-20 pt-12 bg-white">
      <Link href="/shop" className="text-gray-500 hover:text-black mb-8 inline-block">
        ← Всі товари
      </Link>

      <div className="mx-auto max-w-280 flex justify-between gap-12">
        {/* Галерея */}
        <div>
          {images.length > 0 ? (
            <ProductGallery images={images} alt={product.title ?? ''} />
          ) : (
            <div className="h-[560px] bg-gray-50 rounded-xl flex items-center justify-center text-gray-400">
              Немає фото
            </div>
          )}
        </div>

        {/* Інформація */}
        <div className="lg:w-1/2 flex flex-col">
          <div className="max-w-100 mb-2">
            <h1 className="text-xl font-medium font-black text-primary">{product.title}</h1>
            <span className="text-lg text-secondary mb-8">{product.subTitle}</span>
          </div>

          <div className="flex items-baseline gap-2 mb-8 text-base font-medium">
            <span className="text-primary">${product.currentPrice}</span>
            {product.initialPrice! > product.currentPrice && (
              <span className="text-gray-400 line-through">${product.initialPrice}</span>
            )}
            {product.discountPercentage ? (
              <span className="font-semibold text-sale">-{product.discountPercentage}% off</span>
            ) : null}
          </div>

          <button className="bg-black text-white py-4 px-8 rounded-full text-lg font-bold hover:bg-gray-800 transition-colors">
            Додати в кошик
          </button>
        </div>
      </div>
    </div>
  )
}
