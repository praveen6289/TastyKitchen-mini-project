import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {showSubmitError, errorMsg, username, password} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-bg-container">
        <img
          src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662030635/TastyKitchen/mobile-view-login-image_hunzed.png"
          className="banner-sm-image"
          alt="website login"
        />
        <div className="login-container">
          <img
            src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662030634/TastyKitchen/Frame_274_zlrzwk_jyxcei.svg"
            alt="website logo"
            className="logo"
          />
          <h1 className="logo-heading">Tasty Kitchens</h1>
          <h1 className="login-heading">Login</h1>
          <form className="login-form" onSubmit={this.submitForm}>
            <label htmlFor="userName" className="label">
              USERNAME
            </label>
            <input
              type="text"
              id="userName"
              className="user-input"
              value={username}
              onChange={this.onChangeUsername}
            />
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="user-input"
              value={password}
              onChange={this.onChangePassword}
            />
            {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
            <button type="submit" className="login-button">
              Login
            </button>
          </form>
        </div>
        <img
          src="https://res.cloudinary.com/dazr9r8xm/image/upload/v1662030636/TastyKitchen/Desktop-view-login-image_pj6bnb.png"
          alt="website-login"
          className="desktop-view-banner-img"
        />
      </div>
    )
  }
}

export default Login
