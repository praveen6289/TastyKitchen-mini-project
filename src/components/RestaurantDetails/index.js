import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'
import Loader from 'react-loader-spinner'
import NavBar from '../NavBar'
import FoodDetails from '../FoodDetails'
import Footer from '../Footer'
import './index.css'

const restaurantsApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class RestaurantDetails extends Component {
  state = {
    apiStatus: restaurantsApiStatusConstants.initial,
    restaurantData: [],
  }

  // component did mount method
  componentDidMount() {
    this.getRestaurantData()
  }

  // convert snake case to camel case

  convertFoodItemData = foodItem => {
    const item = {
      cost: foodItem.cost,
      foodType: foodItem.food_type,
      id: foodItem.id,
      imageUrl: foodItem.image_url,
      name: foodItem.name,
      rating: foodItem.rating,
    }

    return item
  }

  convertData = object => {
    const convertedObject = {
      costForTwo: object.cost_for_two,
      cuisine: object.cuisine,
      foodItems: object.food_items.map(eachItem =>
        this.convertFoodItemData(eachItem),
      ),
      restaurantId: object.id,
      imageUrl: object.image_url,
      itemCount: object.items_count,
      location: object.location,
      name: object.name,
      opensAt: object.opens_at,
      rating: object.rating,
      reviewsCount: object.reviews_count,
    }
    return convertedObject
  }

  // get restaurant details

  getRestaurantData = async () => {
    this.setState({apiStatus: restaurantsApiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    // console.log(response)
    const data = await response.json()
    // console.log(data)
    if (response.ok === true) {
      const fetchedRestaurantData = this.convertData(data)
      this.setState({
        apiStatus: restaurantsApiStatusConstants.success,
        restaurantData: fetchedRestaurantData,
      })
    } else {
      this.setState({
        apiStatus: restaurantsApiStatusConstants.failure,
      })
    }
  }

  // restaurant loader

  displayLoadingView = () => (
    <div className="restaurant-Loader" testid="restaurant-details-loader">
      <Loader type="Oval" color="##F7931E" height="50" width="50" />
    </div>
  )

  displayRestaurantFailureView = () => (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662131952/TastyKitchen/not-found_kpxxzu.png"
        alt="not found"
        className="not-found-img"
      />
      <div className="not-found-details-container">
        <h1 className="not-found-heading">Page Not Found</h1>
        <p className="not-found-description">
          We are sorry, the page you requested could not be found. Please go
          back to the homepage
        </p>
        <Link to="/">
          <button type="button" className="home-button">
            Home Page
          </button>
        </Link>
      </div>
    </div>
  )
  // restaurants view

  displayRestaurantView = () => {
    const {restaurantData} = this.state

    const {
      costForTwo,
      name,
      restaurantId,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
      foodItems,
    } = restaurantData
    // console.log(reviewsCount)
    // console.log(costForTwo)

    // console.log(foodItems)
    return (
      <div className="main-container">
        <div className="restaurant-id-container" key={restaurantId}>
          <div className="restaurant-id-details-container">
            <img
              src={imageUrl}
              alt="restaurant"
              className="restaurant-id-img"
            />
            <div className="id-details-container">
              <h1 className="restaurant-id-name">{name}</h1>
              <p className="restaurant-id-cuisine">{cuisine}</p>
              <p className="restaurant-id-location">{location}</p>
              <div className="restaurant-id-rating-cost-container">
                <div className="restaurant-id-ratings-container">
                  <div className="restaurant-id-ratings">
                    <AiFillStar className="restaurant-id-rating-Star" />
                    <p className="restaurant-id-rating-count">{rating}</p>
                  </div>
                  <p className="restaurant-id-reviews">
                    {reviewsCount}+ Ratings
                  </p>
                </div>
                <div className="restaurant-cost-container">
                  <div className="restaurant-cost">
                    <p className="restaurant-cost-for-two">₹ {costForTwo}</p>
                  </div>
                  <p className="restaurant-cost-description">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="foods-list-container">
          {foodItems.map(eachItem => (
            <FoodDetails key={eachItem.id} eachFoodItem={eachItem} />
          ))}
        </ul>
      </div>
    )
  }

  // on render restaurants details
  renderRestaurantDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case restaurantsApiStatusConstants.success:
        return this.displayRestaurantView()
      case restaurantsApiStatusConstants.failure:
        return this.displayRestaurantFailureView()
      case restaurantsApiStatusConstants.inProgress:
        return this.displayLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="restaurantClass.BackgroundContainer">
          <NavBar />
          {this.renderRestaurantDetails()}
          <Footer />
        </div>
      </>
    )
  }
}

export default RestaurantDetails
