import './globals.css'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'

import SessionProviders from '../helpers/SessionProvider'
import Loading from './loading'
// import { getCategories } from '../utils/api/server'
import { CartProvider } from '../context/CartContex'
import { CheckoutProvider } from '../context/CheckoutContex'
import { getData } from '../utils/helpers'

const Navbar = dynamic(() => import('../components/navbar/Navbar'))
const Footer = dynamic(() => import('../components/footer/Footer'))
const NavbarBottom = dynamic(() => import('../components/navbar/NavbarBottom'))

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body>
        {/* <SessionProviders> */}
        <CartProvider>
          <div className='px-4 sm:px-8 md:px-16 bg-primer text-sekunder md:py-8 uppercase'>
            <Suspense fallback={<Loading />}>
              <Navbar />
              <CheckoutProvider>
                <main className='flex flex-col gap-y-8 md:pb-10'>
                  {children}
                </main>
                <NavbarBottom />
              </CheckoutProvider>
              <Footer />
            </Suspense>
          </div>
        </CartProvider>
        {/* </SessionProviders> */}
      </body>
    </html>
  )
}
