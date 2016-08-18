import React, {Component, PropTypes} from 'react'
import {FormattedMessage} from 'react-intl'

import {cyan500} from 'material-ui/styles/colors'
import CloseIcon from 'material-ui/svg-icons/navigation/close'

import config from '../../common/config'

const styles = {
  container: {
    backgroundColor: 'white',
  },
  link: {
    display: 'flex',
    textDecoration: 'none',
    alignItems: 'center',
  },
  logo: {
    height: 48,
    padding: 16,
  },
  text: {
    flex: 1,
    color: cyan500,
    fontSize: '0.9em',
  },
  button: {
    height: 48,
    padding: 16,
    marginRight: 32,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 8,
  },
}

class MobileBanner extends Component {
  static propTypes = {
    lang: PropTypes.string.isRequired,
  }

  render() {
    const android = /android/i.test(navigator.userAgent)

    if (android) {
      return (
        <div style={styles.container}>
          <a href={config.play_url} style={styles.link}>
            <img src="/images/logo.png" style={styles.logo} />
            <p style={styles.text}>
              <FormattedMessage id="android_banner" />
            </p>
            <img src={'/play_badge_' + this.props.lang + '.png'} alt="Google Play" style={styles.button} />
          </a>
          <a href="test" style={styles.close}>
            <CloseIcon color={cyan500} />
          </a>
        </div>
      )
    }

    return null
  }
}

export default MobileBanner
