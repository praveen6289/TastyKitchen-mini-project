import {Component} from 'react'
import {BiRupee} from 'react-icons/bi'
import {FaStar} from 'react-icons/fa'
import {HiOutlineMinusSm} from 'react-icons/hi'
import {BsPlus} from 'react-icons/bs'
import './index.css'

class FoodItem extends Component {
  state = {
    isFound: false,
    quantity: 0,
  }

  // get the local storage data
  componentDidMount() {
    this.findTheCartItemInList()
  }

  /* getTheLocalStorageData = () => {
    const cartList = JSON.parse(localStorage.getItem('cart_list')) || []
    // console.log(cartList)
    this.setState({cartList})
  } */

  /* Add to cart when click on add button. this will
  store in local storage */

  findTheCartItemInList = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    const cartItem = cartData.filter(each => each.id === foodItem.id)
    // console.log(cartItem)
    if (cartItem.length !== 0) {
      // console.log(cartItem)
      if (cartItem[0].quantity > 0) {
        this.setState({quantity: cartItem[0].quantity, isFound: true})
      } else if (cartItem[0].quantity < 1) {
        this.removeCartItem()
        this.setState({quantity: cartItem[0].quantity, isFound: false})
      }
    }
  }

  incrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        const updatedQuantity = eachItem.quantity + 1
        return {...eachItem, quantity: updatedQuantity}
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  decrementCartItemQuantity = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.map(eachItem => {
      if (eachItem.id === foodItem.id) {
        // console.log('found')
        if (eachItem.quantity > 0) {
          const updatedQuantity = eachItem.quantity - 1
          return {...eachItem, quantity: updatedQuantity}
        }
      }
      return eachItem
    })
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  removeCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData'))
    const {foodItem} = this.props
    const updatedCartData = cartData.filter(
      eachCartItem => eachCartItem.id !== foodItem.id,
    )
    localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    this.findTheCartItemInList()
  }

  addCartItem = () => {
    const cartData = JSON.parse(localStorage.getItem('cartData')) || []
    const {foodItem} = this.props
    // console.log(foodItem)
    const cartItem = {...foodItem, quantity: 1}
    // console.log(cartItem)
    cartData.push(cartItem)
    localStorage.setItem('cartData', JSON.stringify(cartData))
    this.findTheCartItemInList()
    this.setState({isFound: true})
  }

  render() {
    const {foodItem} = this.props
    const {isFound, quantity} = this.state
    console.log(quantity)
    return (
      <li className="food-details-container" testid="foodItem">
        <img src={foodItem.imageUrl} alt="food-item" className="food-img" />
        <div className="food-details">
          <h1 className="food-name">{foodItem.name}</h1>
          <div className="food-cost-container">
            <BiRupee className="food-cost-icon" />
            <p className="food-cost">{foodItem.cost}.00</p>
          </div>
          <div className="food-rating-container">
            <FaStar size="12px" color="#FFCC00" />
            <p className="food-rating-count">{foodItem.rating}</p>
          </div>
          {isFound ? (
            <div className="each-item-add-counter-container" id={foodItem.id}>
              <button
                type="button"
                className="minus-icon-container"
                testid="decrement-count"
                onClick={this.decrementCartItemQuantity}
              >
                <HiOutlineMinusSm className="minus-icon" />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="plus-icon-container"
                testid="increment-count"
                onClick={this.incrementCartItemQuantity}
              >
                <BsPlus className="plus-icon" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="food-add-button"
              onClick={this.addCartItem}
            >
              ADD
            </button>
          )}
        </div>
      </li>
    )
  }
}

export default FoodItem
