'use client'

import { Fragment, useCallback, useState } from 'react'
import staticImage from '../../../public/images/rectangle1.jpg'
import SearchBar from '../../components/search/SearchBar'
import Pagination from '../../components/pagination/Pagination'
import ImageComp from '../../components/image/ImageComp'

import { productsType } from '../../utils/type'
import Link from 'next/link'

const defaultArray: {}[] = new Array(10).fill({
  key: 0,
  base: false,
  text: null,
  image: staticImage,
  price: 0,
  keyItem: 0,
})

export default function Page() {
  const [products, setProducts]: any = useState({ data: undefined })

  const handleProducts = useCallback(
    (products: any) => setProducts(products),
    [],
  )
  // href={`/shop/${product.idProduct}`}

  return (
    <Fragment>
      <SearchBar />
      <section className='flex flex-col gap-y-8'>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5  gap-x-2 gap-y-12'>
          {products.data &&
            products.data.map((product: any) => {
              return (
                <div key={product.id}>
                  <Link href={`/shop/${product.id}`}>
                    <div className='h-[30vh] sm:h-[40vh] col-span-1'>
                      <div className='w-full h-full mx-auto overflow-hidden relative'>
                        <ImageComp
                          src={product.image}
                          alt='about-image-2'
                          sizes='(min-width: 780px) calc(20vw - 30px), (min-width: 640px) calc(50vw - 120px), calc(50vw - 24px)'
                          className='object-cover'
                          quality={100}
                          priority={true}
                        />
                        <p className='text-end'>02</p>
                      </div>
                      <p className='truncate w-[60%]'>{product.name}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
        </div>
        <section className='flex justify-center'>
          <Pagination onHandleProducts={handleProducts} />
        </section>
      </section>
    </Fragment>
  )
}
