'use client'

import { useParams } from 'next/navigation'
import { Fragment, useState } from 'react'

import SwiperType from '../../../components/swiper/Swiper'
import { useCartContext } from '../../../context/CartContex'
import { useDetail } from '../../../utils/helpers'

import Main from '../../../components/main/Main'
import { convertArray } from '../../page'

const sizes = ['s', 'm', 'l', 'xl', 'xxl']
const colors = ['red', 'blue', 'green', 'yellow', 'whit', 'black', 'purple']
const categories = [
  'T-Shirt',
  'Polo',
  'Dress Shirt',
  'Hoddie',
  'Sweater',
  'Jeans',
  'Cardigan',
  'Shorts',
  'Trousers',
]
const collections = [
  'all',
  'spring',
  'summer',
  'fall',
  'winter',
  'capsule',
  'trend',
]

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Page() {
  const params = useParams()
  const id = params.shopId
  const product = useDetail(`${apiUrl}/products/${id}`)
  console.log('product', product)

  const [size, setSize] = useState<string>('s')
  const [color, setColor] = useState<string>('white')

  const { dispatch } = useCartContext()

  const handleSize = (e: any) => {
    const selectedSize = e.target.value
    setSize(selectedSize)
  }

  const handleColor = (e: any) => {
    const selectedColor = e.target.value
    setColor(selectedColor)
  }

  const {
    id: idProduct,
    name,
    image,
    description,
    price,
    stock,
    sizes: sizesProduct,
    images,
    colors: colorsProduct,
    categories: categoriesProduct,
    collections: collectionsProduct,
  } = product.data ? product.data : []

  let sizesP
  let colorsP
  let collectionsP: any
  let categoriesP: any

  if (product.data) {
    sizesP = convertArray(sizesProduct, size)
    colorsP = convertArray(colorsProduct, colors)
    collectionsP = convertArray(collectionsProduct, collections)
    categoriesP = convertArray(categoriesProduct, categories)
  }

  const handleAddCartLocal = () => {
    const data = {
      id: idProduct,
      name: name,
      image: image,
      description: description,
      price: price,
      stock,
      sizes: size,
      colors: color,
      categories: categoriesP,
      collections: collectionsP,
    }
  }

  // dispatch({ type: 'ADD', item: data })
  // dispatch({ type: 'LOCAL' })

  return (
    <Fragment>
      <section className='grid grid-cols-1 sm:grid-cols-12 gap-x-8 border-b pb-8 md:py-12'>
        <div className='sm:col-span-6 lg:col-span-5 md:h-[90vh] h-[80vh] col-span-1'>
          <SwiperType data={images} />
        </div>
        <div className='col-span-1 sm:col-span-6 lg:col-span-7 flex flex-col'>
          <h1 className='text-sm sm:text-base'>outwear</h1>
          <h2 className='text-2xl sm:text-3xl md:text-4xl font-extrabold my-2 sm:my-4 md:my-8'>
            {name}
          </h2>
          <h3 className='text-xs sm:text-sm'>{description}</h3>
          <div className='flex flex-col w-full my-8'>
            <div className='flex sm:flex-col justify-between py-4 border-y'>
              <div className='flex gap-x-4'>
                <h4 className='font-bold text-sm sm:text-base'>collection</h4>
                <h4 className='normal-case font-light text-sm text capitalize'>
                  {collectionsP}
                </h4>
              </div>
              <div className='flex gap-x-4'>
                <h4 className='font-bold text-sm sm:text-base'>stock</h4>
                <h4 className='normal-case font-light text-sm sm:text-base'>
                  {stock}
                </h4>
              </div>
            </div>
            <h3 className='text-end text-lg sm:text-xl'>${price}</h3>
            <div className='grid grid-cols-2 sm:grid-cols-1 sm:gap-y-2 my-2 sm:my-2 gap-x-2 sm:gap-x-8 lg:grid-cols-2'>
              <button className='btn rounded-none text-xs bg-slate-800 hover:bg-slate-900 text-sekunder'>
                add to wishlist
              </button>
              <form action={handleAddCartLocal} className='w-full'>
                <button className='btn rounded-none text-xs w-full bg-slate-800 hover:bg-slate-900 text-sekunder'>
                  add to chart
                </button>
              </form>
            </div>
            <div className='grid grid-cols-2 my-2 sm:my-0 md:my-4 gap-x-2 md:gap-x-8'>
              <select
                className='bg-slate-800 select w-full rounded-none text-sekunder uppercase text-center text-xs hover:bg-slate-900'
                defaultValue={'size'}
                onChange={handleSize}>
                {sizesP &&
                  sizesP.map((size: any, i: number) => (
                    <option key={i} value={size}>
                      Size : {size}
                    </option>
                  ))}
              </select>
              <select
                className='bg-slate-800  select w-full rounded-none text-sekunder uppercase text-center text-xs hover:bg-slate-900'
                defaultValue={'size'}
                onChange={handleColor}>
                {colorsP &&
                  colorsP.map((color: any, i: number) => (
                    <option key={i} value={color}>
                      color : {color}
                    </option>
                  ))}
              </select>
            </div>
            <div className='grid grid-cols-2 my-2 sm:my-0 md:my-4 gap-x-2 md:gap-x-8'>
              <button className='btn rounded-none text-xs bg-slate-800 hover:bg-slate-900 text-sekunder'>
                customize
              </button>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}
