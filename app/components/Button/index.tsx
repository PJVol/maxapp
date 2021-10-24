import React, { memo, ComponentClass } from 'react'
import {
  View,
  Text,
  Platform,
  TouchableNativeFeedback,
  TouchableHighlight,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageSourcePropType,
} from 'react-native'
// @ts-ignore
import { constants } from '../../utils'
import styles from './styles'

export const Button = memo(
  ({
    backgroundColor = 'rgba(0, 0, 0, .82)',
    borderless = false,
    pressColor = 'rgba(0, 0, 0, .32)',
    height = 40,
    style,
    textStyle,
    text,
    icon,
    // @ts-ignore
    ...rest,
  }: ButtonProps) => {
    const Content = (
      <View
        style={[
          {
            backgroundColor,
          },
          styles.buttonContent,
        ]}
      >
        {icon && <Image source={icon} />}
        <Text style={textStyle}>{text}</Text>
      </View>
    )

    if (Platform.OS === 'android' && Platform.Version >= constants.ANDROID_VERSION_LOLLIPOP) {
      return (
        <View style={[styles.button, style]}>
          <TouchableNativeFeedback
            delayPressIn={0}
            background={TouchableNativeFeedback.Ripple(pressColor, borderless)}
            {...rest}
          >
            {Content}
          </TouchableNativeFeedback>
        </View>
      )
    } else {
      return (
        <TouchableHighlight style={[styles.button, style]} underlayColor={pressColor} {...rest}>
          {Content}
        </TouchableHighlight>
      )
    }
  },
)

export interface ButtonProps {
  backgroundColor: string
  height: number | null
  style?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  icon?: ImageSourcePropType
  text: string
  pressColor: string
  borderless?: boolean
  onPress: () => void
}
