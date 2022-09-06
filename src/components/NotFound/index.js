import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <>
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
  </>
)

export default NotFound
