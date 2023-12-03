'use client'

import { Fragment, Suspense, useCallback, useState } from 'react'

import ListItems from '@components/components/item/ListItems'
import Pagination from '@components/components/pagination/Pagination'
import { productsType } from '@components/utils/type'
import Loading from '../loading'
import SearchBar from '@components/components/search/SearchBar'

export default function Page() {
  const [items, setItems] = useState<productsType[] | []>([])

  const handleGetProducts = useCallback((items: productsType[]) => {
    setItems(items)
  }, [])

  return (
    <Fragment>
      <SearchBar />
      <section>
        <ListItems n='3' items={items} gap='4' height='h-full' base={true} />
      </section>
      <section className='flex justify-center'>
        <Pagination onGetProducts={handleGetProducts} />
      </section>
    </Fragment>
  )
}
