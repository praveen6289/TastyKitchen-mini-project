import {Component} from 'react'
import Cookies from 'js-cookie'
import {BsFilterLeft} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import NavBar from '../NavBar'
import Footer from '../Footer'
import PopularRestaurantView from '../PopularRestaurantView'
import Counter from '../Counter'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import './index.css'

const carouselApiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const allPopularRestaurantsApiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

const limit = 9

class Home extends Component {
  state = {
    carouselApiStatus: carouselApiStatusConstants.initial,
    carouselData: [],
    restaurantsApiStatus: allPopularRestaurantsApiStatus.initial,
    allRestaurantsData: [],
    selectedSortByValue: sortByOptions[1].value,
    searchInput: '',
    activePage: 1,
  }

  componentDidMount = () => {
    window.scrollTo(0, 0)
    this.onGetCarouselDetails()
    this.onGetRestaurantsDetails()
  }

  onGetCarouselDetails = async () => {
    this.setState({carouselApiStatus: carouselApiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const carouselApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const optionsCarousel = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseCarousel = await fetch(carouselApiUrl, optionsCarousel)
    if (responseCarousel.ok === true) {
      const fetchedDataCarousel = await responseCarousel.json()
      this.setState({
        carouselData: fetchedDataCarousel.offers,
        carouselApiStatus: carouselApiStatusConstants.success,
      })
    } else {
      this.setState({
        carouselApiStatus: carouselApiStatusConstants.inProgress,
      })
    }
  }

  carouselDisplayLoading = () => (
    <div className="loader-container" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="30" width="30" />
    </div>
  )

  displayCarouselImages = () => {
    const {carouselData} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      speed: 700,
      infinite: true,
      dotsClass: 'slick-dots',
      autoplay: true,
      autoplaySpeed: 3000,
      adaptiveHeight: true,
    }
    return (
      <div className="slider-container">
        <Slider {...settings}>
          {carouselData.map(eachCarousel => (
            <img
              src={eachCarousel.image_url}
              alt="offer"
              key="carousel-img"
              className="carousel-img"
            />
          ))}
        </Slider>
      </div>
    )
  }

  renderCarouselData = () => {
    const {carouselApiStatus} = this.state

    switch (carouselApiStatus) {
      case carouselApiStatusConstants.success:
        return this.displayCarouselImages()
      case carouselApiStatusConstants.inProgress:
        return this.carouselDisplayLoading()
      default:
        return null
    }
  }

  onGetRestaurantsDetails = async () => {
    this.setState({
      restaurantsApiStatus: allPopularRestaurantsApiStatus.inProgress,
    })
    const {selectedSortByValue, activePage, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const offset = (activePage - 1) * limit
    const allRestaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?search=${searchInput}&offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByValue}`
    const optionsAllRestaurants = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const responseAllRestaurants = await fetch(
      allRestaurantsApiUrl,
      optionsAllRestaurants,
    )
    if (responseAllRestaurants.ok === true) {
      const data = await responseAllRestaurants.json()
      const {restaurants} = data
      const fetchedAllRestaurantsData = restaurants.map(eachItem => ({
        costForTwo: eachItem.cost_for_two,
        cuisine: eachItem.cuisine,
        groupByTime: eachItem.group_by_time,
        hasOnlineDelivery: eachItem.has_online_delivery,
        hasTableBooking: eachItem.has_table_booking,
        id: eachItem.id,
        imageUrl: eachItem.image_url,
        isDeliveringNow: eachItem.is_delivering_now,
        location: eachItem.location,
        menuType: eachItem.menu_type,
        name: eachItem.name,
        opensAt: eachItem.opens_at,
        userRating: {
          rating: eachItem.user_rating.rating,
          ratingColor: eachItem.user_rating.rating_color,
          ratingText: eachItem.user_rating.rating_text,
          totalReviews: eachItem.user_rating.total_reviews,
        },
      }))
      console.log(fetchedAllRestaurantsData)
      this.setState({
        restaurantsApiStatus: allPopularRestaurantsApiStatus.success,
        allRestaurantsData: fetchedAllRestaurantsData,
      })
    } else {
      this.setState({
        restaurantsApiStatus: allPopularRestaurantsApiStatus.inProgress,
      })
    }
  }

  renderLoadingRestaurantsView = () => (
    <div className="restaurants-loader" testid="restaurants-offers-loader">
      <Loader type="ThreeDots" color="#0b69ff" height="30" width="30" />
    </div>
  )

  renderDisplayRestaurantsView = () => {
    const {allRestaurantsData} = this.state
    return (
      <div className="home-details-container">
        <div className="home-filter-container">
          <div className="home-description-container">
            <h1 className="home-heading">Popular Restaurants</h1>
            <p className="home-description">
              Select Your favourite restaurant special dish and make your day
              happy...
            </p>
          </div>
          <div className="search-input-container">
            <label className="search-label" htmlFor="searchInput">
              Search The Restaurant
            </label>
            <input
              type="search"
              id="searchInput"
              className="search-element"
              onChange={this.onSearchRestaurant}
              placeholder="Search Restaurant Here.."
            />
          </div>
          <div className="filter-container">
            <BsFilterLeft className="filter-logo" />
            <p className="sort-heading">Sort by</p>
            <select id="sortBy" className="select-element">
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id}>{eachOption.displayText}</option>
              ))}
            </select>
          </div>
        </div>
        <ul className="restaurants-list-container">
          {allRestaurantsData.map(eachRestaurant => (
            <PopularRestaurantView
              restaurantDetails={eachRestaurant}
              key={eachRestaurant.id}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderAllPopularRestaurants = () => {
    const {restaurantsApiStatus} = this.state

    switch (restaurantsApiStatus) {
      case allPopularRestaurantsApiStatus.success:
        return this.renderDisplayRestaurantsView()
      case allPopularRestaurantsApiStatus.inProgress:
        return this.renderLoadingRestaurantsView()
      default:
        return null
    }
  }

  getActivePage = page => {
    window.scrollTo(500, 500)
    this.setState({activePage: page}, this.getAllRestaurantsData)
  }

  render() {
    return (
      <div className="app-container">
        <NavBar />
        <div className="home-container">
          {this.renderCarouselData()}
          {this.renderAllPopularRestaurants()}
          <Counter pageCount={this.getActivePage} />
        </div>

        <Footer />
      </div>
    )
  }
}

export default Home
