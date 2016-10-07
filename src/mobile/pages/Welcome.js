import React, {Component} from 'react'
import {View, Image, StyleSheet, Platform, Dimensions} from 'react-native'

import Swiper from 'react-native-swiper'

import FormattedMessage from '../components/FormattedMessage'
import Touchable from '../components/Touchable'

import routes from '../../common/routes'
import router from '../../common/router'

import colors from '../../common/constants/colors'

const {width, height} = Dimensions.get('window')

const slides = [
  {
    id: 'start',
    background: require('../images/slides/logo.png'),
    illustration: require('../../common/images/illustrations/logo.png'),
  },
  {
    id: 'bills',
    background: require('../images/slides/bills.png'),
    illustration: require('../../common/images/illustrations/bills.png'),
  },
  {
    id: 'events',
    background: require('../images/slides/events.png'),
    illustration: require('../../common/images/illustrations/events.png'),
  },
  {
    id: 'polls',
    background: require('../images/slides/polls.png'),
    illustration: require('../../common/images/illustrations/polls.png'),
  },
  {
    id: 'tasks',
    background: require('../images/slides/tasks.png'),
    illustration: require('../../common/images/illustrations/tasks.png'),
  },
  {
    id: 'notes',
    background: require('../images/slides/notes.png'),
    illustration: require('../../common/images/illustrations/notes.png'),
  },
  {
    id: 'end',
    background: require('../images/slides/logo.png'),
    illustration: require('../../common/images/illustrations/logo.png'),
  },
]

class Welcome extends Component {
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
        <Swiper loop={false} dot={dot} activeDot={activeDot} paginationStyle={styles.paginationStyle}>
          {
            slides.map((slide, index) => {
              return (
                <View style={styles.slide} key={index}>
                  <Image source={slide.background} resizeMode="stretch" style={styles.background}>
                    <View style={styles.content}>
                      <Image source={slide.illustration} style={styles.illustration} />
                      <FormattedMessage id={slide.id} style={styles.title} />
                      <FormattedMessage id={slide.id + '.description'} style={styles.description} />
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

const contentWidth = (width * 0.73)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.members,
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
    fontSize: (width / (Platform.OS === 'ios' ? 10 : 12)),
    position: 'absolute',
    top: (height * (Platform.OS === 'ios' ? 0.28 : 0.25)),
    width: contentWidth,
    textAlign: 'center',
  },
  description: {
    position: 'absolute',
    top: (height * 0.66),
    paddingHorizontal: (width * 0.07),
    width: contentWidth,
    color: colors.lightText,
    fontSize: (width / 24),
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
    backgroundColor: colors.transparent,
  },
  action: {
    color: colors.lightText,
    fontSize: (width / 24),
    padding: 24,
  },
})

export default Welcome
