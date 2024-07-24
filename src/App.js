import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(PrevState => ({
      cartList: PrevState.cartList.map(eachItem => {
        if (eachItem.id === id) {
          const updatedQuantitys = eachItem.quantity + 1
          return {...eachItem, quantity: updatedQuantitys}
        }
        return eachItem
      }),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === id)

    if (productObject.quantity > 1) {
      this.setState(PrevState => ({
        cartList: PrevState.cartList.map(eachItem => {
          if (eachItem.id === id) {
            const updatedQuantitys = eachItem.quantity - 1
            return {...eachItem, quantity: updatedQuantitys}
          }
          return eachItem
        }),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const prodObject = cartList.filter(eachItem => eachItem.id !== id)

    this.setState({cartList: prodObject})
  }

  addCartItem = product => {
    const {cartList} = this.state
    const productObject = cartList.find(eachItem => eachItem.id === product.id)

    if (productObject) {
      this.setState(PrevState => ({
        cartList: PrevState.cartList.map(eachItem => {
          if (productObject.id === eachItem.id) {
            const updatedQuantity = eachItem.quantity + product.quantity

            return {...eachItem, quantity: updatedQuantity}
          }
          return eachItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, product]
      this.setState({cartList: updatedCartList})
    }
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
