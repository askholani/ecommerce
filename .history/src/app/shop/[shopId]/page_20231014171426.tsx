'use client'

import axios from 'axios'
import { useParams } from 'next/navigation'
import { Fragment, Suspense, useEffect, useState } from 'react'
import useSWR from 'swr'

import AccordionShop from '../../../components/accordion/AccordionShop'
import SwiperType from '../../../components/swiper/Swiper'
// import Recommended from '../../../components/recomended/Recomended'
import { useCartContext } from '../../../context/CartContex'
import { useDetailProduct as getDetailClient } from '../../../utils/api/client'

/**
 * mengambil data lgs ke db product dengan id bedasarkan id url
 * @date 8/5/2023 - 3:01:31 PM
 *
 * @export
 * @param {?number} [id]
 * @returns {{ data: any; isLoading: any; error: any; }}
 */
const useDetailProduct = getDetailClient

/**
 * mengambil data lgs ke db product_images bedasarkan id di url
 * @date 8/5/2023 - 3:00:20 PM
 *
 * @export
 * @param {?number} [id]
 * @returns {{ data: any; isLoading: any; error: any; }}
 */

export default function Page() {
  const [size, setSize] = useState<string>('s')

  const { dispatch } = useCartContext()
  const params = useParams()

  const id = params.shopId
  console.log('id', id)
  // const imageItems = useProductImages(id)
  const detailItems = useDetailProduct(id)
  // const data = detailItems ? detailItems.data.result : {}
  // const {
  //   categories,
  //   collections,
  //   colors,
  //   description,
  //   idProduct,
  //   image,
  //   name,
  //   price,
  //   images,
  //   stock,
  // } = data
  // console.log('images', images)
  // const productimages = imageItems.data ? imageItems.data.result : ''
  // const productDetail = detailItems.data ? detailItems.data.result : ''

  // const { images } = productimages
  // const {
  //   name,
  //   image,
  //   description,
  //   stock,
  //   price,
  //   id_category,
  //   id_rating,
  //   id_review,
  // } = productDetail

  // let itemProductImages: any[] = productimages
  // if (productimages) {
  //   itemProductImages = Object.values(images ? images : {}).map((a) => a)
  //   itemProductImages.push(image)
  // }

  const handleSize = (e: any) => {
    const selectedSize = e.target.value
    setSize(selectedSize)
  }

  // const handleAddCartCookies = () => {
  //   const data = {
  //     id: id,
  //     name: name,
  //     image: image,
  //     description: description,
  //     price: price,
  //     qty: 1,
  //     size: size,
  //   }
  //   dispatch({ type: 'ADD', item: data })
  //   dispatch({ type: 'COOKIES' })
  // }

  // console.log('productImages', productimages)

  return (
    // <Fragment>
    //   <section className='grid grid-cols-1 sm:grid-cols-12 gap-x-8 border-b pb-8 md:py-12'>
    //     <div className='sm:col-span-6 lg:col-span-5 md:h-[90vh] h-[80vh] col-span-1'>
    //       {/* <SwiperType itemProductImages={itemProductImages} /> */}
    //     </div>
    //     <div className='col-span-1 sm:col-span-6 lg:col-span-7 flex flex-col'>
    //       <h1 className='text-sm sm:text-base'>outwear</h1>
    //       <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold my-2 sm:my-4 md:my-8'>
    //         {name}
    //       </h2>
    //       <h3 className='text-xs sm:text-sm'>{description}</h3>
    //       <div className='flex flex-col w-full my-8'>
    //         <div className='flex sm:flex-col justify-between py-4 border-y'>
    //           <div className='flex gap-x-4'>
    //             <h4 className='font-bold text-sm sm:text-base'>collection</h4>
    //             <h4 className='normal-case font-light text-sm'>
    //               hiking collection
    //             </h4>
    //           </div>
    //           <div className='flex gap-x-4'>
    //             <h4 className='font-bold text-sm sm:text-base'>stock</h4>
    //             <h4 className='normal-case font-light text-sm sm:text-base'>
    //               {stock}
    //             </h4>
    //           </div>
    //         </div>
    //         <h3 className='text-end text-lg sm:text-xl'>${price}</h3>
    //         <div className='grid grid-cols-2 sm:grid-cols-1 sm:gap-y-2 my-2 sm:my-2 gap-x-2 sm:gap-x-8 lg:grid-cols-2'>
    //           <button className='btn rounded-none text-xs'>
    //             add to wishlist
    //           </button>
    //           <form action={handleAddCartCookies} className='w-full'>
    //             <button className='btn rounded-none text-xs w-full'>
    //               add to chart
    //             </button>
    //           </form>
    //         </div>
    //         <div className='grid grid-cols-2 my-2 sm:my-0 md:my-4 gap-x-2 md:gap-x-8'>
    //           <select
    //             className='select w-full rounded-none text-primer uppercase text-center text-xs'
    //             defaultValue={'size'}
    //             onChange={handleSize}>
    //             <option value={`s`}>small {`(s)`}</option>
    //             <option value={`m`}>medium {`(m)`}</option>
    //             <option value={`l`}>large {`(l)`}</option>
    //             <option value={`xl`}>extra large {`xl`}</option>
    //           </select>
    //           <button className='btn rounded-none text-xs'>customize</button>
    //         </div>
    //         {/* <AccordionShop /> */}
    //       </div>
    //     </div>
    //   </section>
    //   {/* <Recommended height='h-[20rem]' /> */}
    // </Fragment>
    <></>
  )
}
