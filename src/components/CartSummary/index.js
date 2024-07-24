// Write your code here

import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let total = 0
      cartList.forEach(eachItem => {
        total += eachItem.price * eachItem.quantity
      })

      return (
        <>
          <div className="summary-container">
            <h1 className="order-total-value">
              <span className="order-label">Order Total:</span> Rs {total}/-
            </h1>
            <p className="total-items">{cartList.length} Items in cart</p>
            <button type="button" className="chekout-btn">
              Checkout
            </button>
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
