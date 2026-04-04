// import { Grid } from '@/components/Grid'
// import configPromise from '@payload-config'
// import { getPayload } from 'payload'
// import Link from 'next/link'
// import React from 'react'
//
// export const metadata = {
//   description: 'Search for products in the store.',
//   title: 'Shop',
// }
//
// type SearchParams = { [key: string]: string | string[] | undefined }
//
// type Props = {
//   searchParams: Promise<SearchParams>
// }
//
// export default async function ShopPage({ searchParams }: Props) {
//   // Дістаємо те, що юзер ввів у пошук
//   const { q: searchValue } = await searchParams
//   const payload = await getPayload({ config: configPromise })
//
//   // 1. ЧИСТИЙ ЗАПИТ БЕЗ ЗАЙВИХ ФІЛЬТРІВ
//   const products = await payload.find({
//     collection: 'products',
//     limit: 50,
//     // Якщо є пошук — шукаємо по Title або SubTitle
//     ...(searchValue
//       ? {
//           where: {
//             or: [{ title: { like: searchValue } }, { subTitle: { like: searchValue } }],
//           },
//         }
//       : {}),
//   })
//
//   const resultsText = products.docs.length > 1 ? 'results' : 'result'
//
//   return (
//     <div className="container mx-auto px-4 py-8">
//       {/* Заголовок або результати пошуку */}
//       {searchValue ? (
//         <p className="mb-8 text-lg">
//           {products.docs?.length === 0
//             ? 'Нічого не знайдено за запитом '
//             : `Показано ${products.docs.length} товарів для `}
//           <span className="font-bold">&quot;{searchValue}&quot;</span>
//         </p>
//       ) : (
//         <h1 className="text-4xl font-black mb-10">Всі товари</h1>
//       )}
//
//       {/* Якщо база порожня */}
//       {!searchValue && products.docs?.length === 0 && (
//         <p className="mb-4 text-gray-500">Товарів поки немає.</p>
//       )}
//
//       {/* СІТКА ТОВАРІВ */}
//       {products?.docs.length > 0 ? (
//         <Grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {products.docs.map((product) => (
//             <Link
//               key={product.id}
//               href={`/products/${product.productCode}`} // <-- Ведемо на артикул!
//               className="group flex flex-col bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//             >
//               {/* Картинка */}
//               <div className="aspect-square bg-gray-50 p-6 flex items-center justify-center relative">
//                 {product.imageUrl ? (
//                   <img
//                     src={product.imageUrl}
//                     alt={product.title}
//                     className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
//                   />
//                 ) : (
//                   <span className="text-gray-400 text-sm">Немає фото</span>
//                 )}
//
//                 {/* Лейбл знижки */}
//                 {product.discountPercentage ? (
//                   <span className="absolute top-3 right-3 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow-sm">
//                     -{product.discountPercentage}%
//                   </span>
//                 ) : null}
//               </div>
//
//               {/* Інформація */}
//               <div className="p-5 flex flex-col flex-grow border-t border-gray-50">
//                 <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
//                   {product.productType}
//                 </p>
//                 <h2 className="text-lg font-bold text-gray-900 mb-1 leading-tight group-hover:text-blue-600 transition-colors">
//                   {product.title}
//                 </h2>
//                 <p className="text-sm text-gray-500 line-clamp-1 mb-4">{product.subTitle}</p>
//
//                 {/* Ціна */}
//                 <div className="mt-auto flex items-end gap-2">
//                   <span className="text-2xl font-black text-gray-900">${product.currentPrice}</span>
//                   {product.initialPrice && product.initialPrice > product.currentPrice && (
//                     <span className="text-sm text-gray-400 line-through mb-1 font-medium">
//                       ${product.initialPrice}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </Grid>
//       ) : null}
//     </div>
//   )
// }
