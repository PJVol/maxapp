import React, { memo, ComponentClass } from 'react'
import {
  View,
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
} from 'react-native'
// @ts-ignore
import { constants } from '../../utils'
import styles from './styles'

export const RoundButton = memo(({ icon, containerStyle, ...rest }: RoundButtonProps) => {
  if (Platform.OS === 'android' && Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP) {
    return (
      <TouchableNativeFeedback {...rest} delayPressIn={0} background={TouchableNativeFeedback.Ripple('#f1f2f4', true)}>
        <View style={[styles.container, containerStyle]}>{icon}</View>
      </TouchableNativeFeedback>
    )
  } else if (Platform.OS === 'ios') {
    return (
      <TouchableOpacity {...rest} style={[styles.container, containerStyle]}>
        {icon}
      </TouchableOpacity>
    )
  } else {
    return (
      <TouchableHighlight
        {...rest}
        style={[styles.container, containerStyle, styles.roundButton]}
        underlayColor='#f1f2f4'
      >
        {icon}
      </TouchableHighlight>
    )
  }
})

export interface RoundButtonProps {
  icon: ComponentClass
  containerStyle: StyleProp<ViewStyle>
}
