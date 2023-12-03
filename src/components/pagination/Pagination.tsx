'use client'

import { useState, useEffect, Fragment } from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import ReactPaginate from 'react-paginate'

import { useProduct } from '../../utils/helpers'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function Pagination(props: {
  onHandleProducts: (items: any) => void
}) {
  const { onHandleProducts } = props

  const router = useRouter()
  const searchParams = useSearchParams().get('page')
  const page = searchParams ? parseInt(searchParams) : 1

  const dataCount = useProduct(undefined, undefined, `${apiUrl}/products/count`)
  const { data: amountOfPage } = dataCount

  const products: any = useProduct(page, 10, `${apiUrl}/products`)
  const { data, isLoading, isError } = products

  const [pageCount, setPageCount] = useState<number>(0)

  useEffect(() => {
    if (!isError) {
      const result = {
        data: data,
        isLoading: isLoading,
      }
      onHandleProducts(result)
    }
  }, [data, onHandleProducts, isLoading, isError])

  useEffect(() => {
    setPageCount(Math.ceil(amountOfPage / 10))
  }, [amountOfPage])

  const handlePageClick = (e: any) => {
    const url = window.location.href.toString()
    const newUrl = url.replace(/page=\d+/, `page=${e.selected + 1}`)
    router.push(newUrl)
  }

  return (
    <Fragment>
      <ReactPaginate
        nextLabel='>>'
        onPageChange={handlePageClick}
        pageRangeDisplayed={0}
        marginPagesDisplayed={0}
        pageCount={pageCount}
        previousLabel='<<'
        pageClassName='page-item'
        pageLinkClassName='text-sekunder btn bg-primer border-none rounded-none hover:bg-primer'
        previousClassName=''
        previousLinkClassName='text-sekunder join-item btn btn-outline border border-none'
        nextClassName=''
        nextLinkClassName='text-sekunder join-item btn btn-outline border border-none'
        breakLabel=''
        breakClassName='page-item'
        breakLinkClassName='page-link'
        containerClassName='join'
        activeClassName='active'
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </Fragment>
  )
}
