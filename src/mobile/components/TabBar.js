import React, {Component, PropTypes} from 'react'
import {View, Text, StyleSheet, Animated} from 'react-native'

import {injectIntl, intlShape} from 'react-intl'

import TabButton from 'react-native-scrollable-tab-view/Button'

import colors from '../../common/constants/colors'

const UNDERLINE_MARGIN = 20

class TabBar extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    goToPage: PropTypes.func,
    activeTab: PropTypes.number,
    tabs: PropTypes.array,
    containerWidth: PropTypes.number.isRequired,
    scrollValue: PropTypes.object,
    badges: PropTypes.array.isRequired,
  }

  constructor(props) {
    super(props)
    this.renderTabOption = this.renderTabOption.bind(this)
  }

  renderTabOption(id, index) {
    const isTabActive = this.props.activeTab === index
    const color = isTabActive ? 'white' : 'white'
    const fontWeight = isTabActive ? 'bold' : 'normal'
    const name = this.props.intl.formatMessage({id})
    const badge = this.props.badges[index]

    const badgeNode = badge && (
      <View style={styles.badge}>
        <Text style={styles.badgeText}>
          {badge}
        </Text>
      </View>
    )

    return (
      <TabButton
        style={{flex: 1}}
        key={id}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits="button"
        onPress={() => this.props.goToPage(index)}
      >
        <View style={styles.tab}>
          <Text style={{color, fontWeight}}>
            {name}
          </Text>
          {badgeNode}
        </View>
      </TabButton>
    )
  }

  render() {
    const containerWidth = this.props.containerWidth
    const numberOfTabs = this.props.tabs.length
    const width = containerWidth / numberOfTabs - (UNDERLINE_MARGIN * 2)

    const tabUnderlineStyle = {
      position: 'absolute',
      width,
      height: 6,
      backgroundColor: 'white',
      bottom: 0,
      marginLeft: UNDERLINE_MARGIN,
    }

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, width + (UNDERLINE_MARGIN * 2)],
    })

    return (
      <View style={styles.tabs}>
        {this.props.tabs.map(this.renderTabOption)}
        <Animated.View style={[tabUnderlineStyle, {left}]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  tabs: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
    flexDirection: 'row',
  },
  badge: {
    backgroundColor: colors.error,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginLeft: 10,
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
  },
})

export default injectIntl(TabBar)
