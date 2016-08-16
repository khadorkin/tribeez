import {Platform, StatusBar} from 'react-native'

import colors from '../common/constants/colors'

// Android versions under Lollipop do not support translucent status bar
export const marginTop = (Platform.OS === 'android' && Platform.Version >= 21) ? StatusBar.currentHeight : 0

export const navBarHeight = 56

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
    //TODO: iOS shadows
    return null
  }
}
