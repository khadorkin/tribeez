import {Platform, StatusBar} from 'react-native'

import colors from '../common/constants/colors'

// Android versions under Lollipop do not support translucent status bar
export const marginTop = (Platform.OS === 'android' && Platform.Version >= 21) ? StatusBar.currentHeight : 0

export const navBarHeight = (Platform.OS === 'ios') ? 72 : 56

export const elevation = (height) => {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 21) {
      return {
        elevation: height,
      }
    } else {
      return {
        borderWidth: 1,
        borderColor: colors.underline,
      }
    }
  } else {
    return {
      shadowColor: colors.shadow,
      shadowOpacity: 0.3,
      shadowRadius: height,
      shadowOffset: {
        height,
        width: 0,
      },
    }
  }
}

export const getLabelSize = (focused) => focused ? 12 : 16
export const getLabelPosition = (focused) => focused ? 16 : 37
export const ANIMATION_DURATION = 200
