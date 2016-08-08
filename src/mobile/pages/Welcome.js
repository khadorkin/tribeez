import React, {Component, PropTypes} from 'react'
import {View, Image, StyleSheet, Dimensions} from 'react-native'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import Swiper from 'react-native-swiper'

import FormattedMessage from '../components/FormattedMessage'
import Touchable from '../components/Touchable'

import routes from '../../common/routes'
import router from '../../common/router'

import colors from '../../common/constants/colors'
import autoLogin from '../../common/actions/autoLogin'

const {width, height} = Dimensions.get('window')

const slides = [
  {
    id: 'logo',
    background: require('../../common/images/slides/logo.png'),
    illustration: require('../../common/images/illustrations/logo.png'),
  },
  {
    id: 'bills',
    background: require('../../common/images/slides/bills.png'),
    illustration: require('../../common/images/illustrations/bills.png'),
  },
  {
    id: 'events',
    background: require('../../common/images/slides/events.png'),
    illustration: require('../../common/images/illustrations/events.png'),
  },
  {
    id: 'polls',
    background: require('../../common/images/slides/polls.png'),
    illustration: require('../../common/images/illustrations/polls.png'),
  },
  {
    id: 'tasks',
    background: require('../../common/images/slides/tasks.png'),
    illustration: require('../../common/images/illustrations/tasks.png'),
  },
  {
    id: 'notes',
    background: require('../../common/images/slides/notes.png'),
    illustration: require('../../common/images/illustrations/notes.png'),
  },
]

class Welcome extends Component {
  static propTypes = {
    // redux state
    loading: PropTypes.bool.isRequired,
    // action creators:
    autoLogin: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.autoLogin()
  }

  handleLogin() {
    router.push(routes.LOGIN)
  }

  handleRegister() {
    router.push(routes.REGISTER)
  }

  render() {
    const dot = <View style={styles.dot} />
    const activeDot = <View style={[styles.dot, styles.activeDot]} />

    return (
      <View style={styles.container}>
        <Swiper loop={false} dot={dot} activeDot={activeDot} style={styles.swiper} paginationStyle={styles.paginationStyle}>
          {
            slides.map((slide, index) => {
              return (
                <View style={styles.slide} key={index}>
                  <Image source={slide.background} resizeMode="stretch" style={styles.background}>
                    <View style={styles.content}>
                      <Image source={slide.illustration} style={styles.illustration} />
                      <FormattedMessage id={'slide.' + slide.id + '.title'} style={styles.title}>Title</FormattedMessage>
                      <FormattedMessage id={'slide.' + slide.id + '.description'} style={styles.description}>{'Desc\nblabla'}</FormattedMessage>
                    </View>
                  </Image>
                </View>
              )
            })
          }
        </Swiper>
        <View style={styles.actions}>
          <Touchable onPress={this.handleLogin}>
            <FormattedMessage id="slides.login" style={styles.action} />
          </Touchable>
          <Touchable onPress={this.handleRegister}>
            <FormattedMessage id="slides.register" style={styles.action} />
          </Touchable>
        </View>
      </View>
    )
  }
}

const contentWidth = (width * 0.7)

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  swiper: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  content: {
    flex: 1,
    width: contentWidth,
    justifyContent: 'center',
  },
  illustration: {
    width: contentWidth,
    height: contentWidth,
    //borderWidth: 1, borderColor: 'rgba(255, 255, 255, .5)',
  },
  title: {
    color: colors.lightText,
    fontSize: 40,
    position: 'absolute',
    top: (height * 0.25),
    width: contentWidth,
    textAlign: 'center',
  },
  description: {
    position: 'absolute',
    top: (height * 0.66),
    paddingHorizontal: (width * 0.07),
    width: contentWidth,
    color: colors.lightText,
    fontSize: 16,
    textAlign: 'center',
  },
  paginationStyle: {
    bottom: (height * 0.15),
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 6,
    backgroundColor: colors.dot,
  },
  activeDot: {
    backgroundColor: colors.background,
  },
  actions: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  action: {
    color: colors.lightText,
    fontSize: 16,
    padding: 24,
  },
})

const mapStateToProps = (state) => ({
  loading: state.app.loading > 0,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({
  autoLogin,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
