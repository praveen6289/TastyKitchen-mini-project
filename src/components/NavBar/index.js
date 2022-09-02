import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {useState} from 'react'
import './index.css'

const NavBar = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="nav-header">
        <div className="nav-bar-logo-container">
          <img
            src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662030634/TastyKitchen/Frame_274_zlrzwk_jyxcei.svg"
            alt="website-logo"
            className="nav-bar-logo"
          />
          <Link to="/" className="logo-link">
            <h1 className="nav-bar-logo-heading">Tasty Kitchens</h1>
          </Link>
        </div>

        <nav className="desktop-view-nav-bar">
          <ul className="nav-items">
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>

            <li>
              <Link to="/" className="nav-link">
                Cart
              </Link>
            </li>

            <li className="nav-link">
              <button
                type="button"
                className="logout-button"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
        <GiHamburgerMenu className="icon" onClick={() => setOpen(!open)} />
      </div>
      <nav className="mobile-view-nav-bar">
        {open && (
          <div className="nav-items-hidden-view">
            <ul className="nav-items">
              <li>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li>
                <Link to="/" className="nav-link">
                  Cart
                </Link>
              </li>

              <li className="nav-link">
                <button
                  type="button"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </li>
            </ul>
            <AiFillCloseCircle
              className="close-icon"
              onClick={() => setOpen(!open)}
            />
          </div>
        )}
      </nav>
    </>
  )
}

export default withRouter(NavBar)
