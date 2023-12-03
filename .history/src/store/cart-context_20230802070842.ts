import React from 'react'
import { createContext, useContext } from 'react'

type CartContextType = {
  items: []
  totalAmount: number
  addItem: (id: number) => void
  removeItem: (id: number) => {}
}

const CartContext = createContext<CartContextType>({
  addItem: (id: number) => {},
})

export default CartContext