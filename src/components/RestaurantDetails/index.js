import {Component} from 'react'
import Cookies from 'js-cookie'
import {BiRupee} from 'react-icons/bi'
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
    window.scrollTo(0, 0)
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
    }
  }

  // restaurant loader

  displayLoadingView = () => (
    <div className="restaurant-Loader" testid="restaurant-details-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
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
        <div className="restaurant-container" key={restaurantId}>
          <div className="restaurant-details-container">
            <img src={imageUrl} alt="restaurant" className="restaurant-img" />
            <div className="details-container">
              <h1 className="restaurant-name">{name}</h1>
              <p className="restaurant-cuisine">{cuisine}</p>
              <p className="restaurant-location">{location}</p>
              <div className="restaurant-rating-cost-container">
                <div className="restaurant-ratings-container">
                  <div className="restaurant-ratings">
                    <AiFillStar className="restaurant-rating-Star" />
                    <p className="restaurant-rating-count">{rating}</p>
                  </div>
                  <p className="restaurant-reviews">{reviewsCount}+ Ratings</p>
                </div>
                <div className="restaurantClass.VerticalLine">
                  <p style={{display: 'none'}}>.</p>
                </div>
                <div className="restaurantClass.CostContainer">
                  <div className="restaurantClass.Cost">
                    <BiRupee className="restaurantClass.Rupee" />
                    <p className="restaurantClass.CostForTwo">{costForTwo}</p>
                  </div>
                  <p className="restaurantClass.CostPara">Cost for two</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="foods-list-container">
          {foodItems.map(eachItem => (
            <FoodDetails key={eachItem.id} foodItem={eachItem} />
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
      case restaurantsApiStatusConstants.inProgress:
        return this.displayLoadingView()
      case restaurantsApiStatusConstants.failure:
        return null
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
