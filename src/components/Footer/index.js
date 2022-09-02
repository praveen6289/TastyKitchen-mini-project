import {
  FaInstagram,
  FaPinterestSquare,
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662067176/TastyKitchen/Footer-logo_yimwi8.svg"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-main-heading">Tasty Kitchens</h1>
      </div>

      <p className="footer-paragraph">
        The only thing we are serious about is food. Contact us on
      </p>
      <div className="contact-us-container">
        <FaPinterestSquare
          className="footer-icon"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="footer-icon" testid="instagram-social-icon" />
        <FaTwitterSquare className="footer-icon" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="footer-icon"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
export default Footer
