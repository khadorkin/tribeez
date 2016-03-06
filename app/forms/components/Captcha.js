import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import {FormattedMessage} from 'react-intl'

import scriptLoader from '../../utils/scriptLoader'

/*global grecaptcha:false __RECAPTCHA_SITE_KEY__:false*/

class Captcha extends Component {

  constructor(props) {
    super(props)
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

  reset() {
    grecaptcha.reset()
    this.props.onChange(null)
  }

  render() {
    return (
      <div style={{display: 'inline-block', marginBottom: '30px'}}>
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
