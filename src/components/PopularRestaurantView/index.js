import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import './index.css'

const PopularRestaurantView = props => {
  const {restaurantDetails} = props
  const {imageUrl, name, cuisine, id, userRating} = restaurantDetails
  const {rating, totalReviews} = userRating
  return (
    <Link
      to={`/restaurant/${id}`}
      style={{textDecoration: 'none'}}
      testid="restaurant-item"
    >
      <li className="restaurant-container">
        <img src={imageUrl} alt="restaurant" className="restaurant-img" />
        <div className="restaurant-details-container">
          <h1 className="restaurant-name">{name}</h1>
          <p className="restaurant-cuisine">{cuisine}</p>
          <div className="restaurant-ratings-container">
            <FaStar size="12px" color="#FFCC00" />
            <p className="restaurant-rating">{rating}</p>
            <p className="restaurant-total-reviews">({totalReviews} ratings)</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default PopularRestaurantView
