import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import scriptLoader from '../../utils/scriptLoader'

import config from '../../../common/config'

/*global grecaptcha:false*/

class Captcha extends Component {
  static propTypes = {
    touched: PropTypes.bool.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    this.ref = this.ref.bind(this)
    this.focus = this.focus.bind(this)
  }

  componentDidMount() {
    window.onRecaptcha = () => {
      grecaptcha.render('captcha', {
        sitekey: config.recaptcha_site_key,
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

  componentWillUnmount() {
    window.onRecaptcha = null
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
      <div ref={this.ref} style={{textAlign: 'center', margin: '48px 0 32px'}}>
        <div id="captcha" style={{display: 'inline-block', minHeight: '80px'}} ref="input" />
        <p className="error">{this.props.touched && this.props.error && <FormattedMessage id="error.captcha" />}</p>
      </div>
    )
  }
}

export default Captcha
