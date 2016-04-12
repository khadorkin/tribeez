import React from 'react'
const PropTypes = React.PropTypes
import ReactDOM from 'react-dom'

import scriptLoader from '../../utils/scriptLoader'

/*global grecaptcha:false __RECAPTCHA_SITE_KEY__:false*/

class Captcha extends React.Component {

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  /*eslint-disable react/no-did-mount-set-state */
  componentDidMount() {
    window.onRecaptcha = () => {
      grecaptcha.render('captcha', {
        sitekey: __RECAPTCHA_SITE_KEY__,
        callback: () => {
          this.props.onChange(grecaptcha.getResponse())
        },
        'expired-callback': () => {
          this.props.onChange(null)
        },
      })
    }

    if (window.grecaptcha) {
      window.onRecaptcha()
    } else {
      scriptLoader.load('https://www.google.com/recaptcha/api.js?render=explicit&onload=onRecaptcha')
    }
  }

  ref(element) {
    this.element = element
  }

  focus() {
    this.element.scrollIntoView()
  }

  reset() {
    grecaptcha.reset()
    this.props.onChange(null)
  }

  render() {
    return (
      <div ref={this.ref} style={{display: 'inline-block', marginBottom: '30px'}}>
        <div id="captcha" style={{minHeight: '80px'}} ref="input"></div>
        <p className="error">{this.props.errorText}</p>
      </div>
    )
  }

}

Captcha.propTypes = {
  errorText: PropTypes.node,
  onChange: PropTypes.func.isRequired,
}

export default Captcha
