import { Fragment } from 'react'
import Main from '../components/main/Main'
import About from '../components/about/About'
import Newin from '../components/newin/Newin'
import { getData } from '../utils/helpers'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default async function Page() {
  const data: any = await getData(`${apiUrl}/products`)

  const aboutProduct = data.slice(1, 3)
  const newInProduct = data.slice(4, 9)
  const mainProduct = data.slice(0, 1)

  return (
    <Fragment>
      <Main newProduct={mainProduct} />
      <About aboutProduct={aboutProduct} />
      <Newin newInProduct={newInProduct} />
    </Fragment>
  )
}

export const convertArray = (array1: [] | any, array2: [] | any) => {
  return array1.map((item: any, index: number) => array2[index])
}
