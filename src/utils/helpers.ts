import axios, { AxiosResponse, AxiosError } from 'axios'
import { itemType } from '../context/CartContex'
import { useSWR } from 'swr'
export const actionADD = (oldItems: itemType[], newItems: itemType) => {
  // cek data array
  console.log('oldItems', oldItems)
  console.log('newItems', newItems)

  const lengthOldItems = oldItems.length
  let theItem: itemType | any
  let updatedItem: itemType | any
  let updatedItems: itemType[] | any
  updatedItems = [...oldItems]

  if (lengthOldItems === 0) {
    console.log('lenghtOldItems === 0')
    return [newItems]
  }

  const idOldItems = oldItems.filter((item) => item.id === newItems.id)
  console.log('idOldItems', idOldItems)
  if (idOldItems.length === 0) {
    console.log('idOldItems.length === 0')
    const items = updatedItems.concat(newItems)
    return items
  }

  const sizeItems = idOldItems.filter((item) => item.size === newItems.size)
  console.log('sizeItems', sizeItems)
  if (sizeItems.length === 0) {
    console.log('sizeItems.length === 0')
    console.log('updatedItems size', updatedItems)
    const items = updatedItems.concat(newItems)
    return items
  }

  const colorItems = sizeItems.filter((item) => item.color === newItems.color)
  console.log('colorItems', colorItems)
  if (colorItems.length === 0) {
    console.log('colorItems.length === 0')
    const items = updatedItems.concat(newItems)
    return items
  }

  theItem = colorItems.find((item) => item.color === newItems.color)
  console.log('theItem', theItem)
  updatedItem = { ...theItem, qty: theItem.qty + newItems.qty }
  const theIndex = oldItems.findIndex(
    (item) =>
      item.color === theItem.color &&
      item.size === theItem.size &&
      item.id === theItem.id,
  )
  console.log('theIndex', theIndex)
  updatedItems[theIndex] = updatedItem
  //   const items = (oldItems[theIndex] = updatedItems)
  console.log('outside')
  console.log('theItems', theItem)
  console.log('updatedItems', updatedItems)
  return updatedItems
}

export const getData = async (url: string) => {
  try {
    const response: any = await axios.get(url)
    return response.data
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const getProductDetail = async (url: string) => {
  try {
    const response: AxiosResponse = await axios.get(url)
    return response.data
  } catch (error) {
    handleApiError(error)
    return null
  }
}

export const useDetail = (url: string) => {
  const result = useClient(url, fetcher)
  return result
}

const useClient = (url: string, fetcher: any) => {
  const { data, error, isValidating: isLoading } = useSWR(url, fetcher)
  return { data, error, isLoading }
}

const fetcher = async (url: string) => {
  const response = await axios.get(url)
  return response.data
}

export const handleApiError = (error: AxiosError | any) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      console.error('API error', error.response.status, error.response.data)
    } else if (error.request) {
      console.error('No response from the server')
    } else {
      console.error('Request failed to sent : ', error.message)
    }
  } else {
    // No an Axios erro (possibly a JavaScript error)
    // console.error('Unexpected eror', error.message)
    console.error('Unexpected eror : ', error)
  }
}

export function useProduct(
  page?: number | undefined,
  amount?: number | undefined,
  url?: string,
) {
  let fetcher: any

  if (page) {
    const perPage = page ? page : '1'
    fetcher = async (url: string) => {
      const response = await axios.get(
        `${url}?page=${perPage}&amount=${amount}`,
      )
      return response.data
    }
  } else {
    fetcher = async (url: string) => {
      const response = await axios.get(`${url}`)
      return response.data
    }
  }

  const { data, error, isValidating: isLoading } = useSWR(url, fetcher)

  return {
    data,
    isLoading,
    isError: error,
  }
}
