import React, { memo, ComponentClass } from 'react'
import { View } from 'react-native'
import { Badge } from 'react-native-elements'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import styles from './styles'

export const Badged = ({ WrappedComponent, options = {} }: BadgedProps) =>
  memo(({ value, ...rest }: BadgeComponentProps) => {
    const showValue: string = value > 5 ? '5+' : '' + value

    const { top = -10, right = -20, left = 0, bottom = 0, hidden = !value } = options

    return (
      <View>
        <WrappedComponent {...rest} />
        {!hidden && (
          <Badge
            badgeStyle={styles.badge}
            textStyle={styles.badgeText}
            value={showValue}
            status='error'
            containerStyle={[styles.badgeContainer, { top, right, left, bottom }]}
          />
        )}
      </View>
    )
  })

export interface BadgeOptions {
  top?: number
  right?: number
  left?: number
  bottom?: number
  hidden?: boolean
}

export interface BadgedProps {
  WrappedComponent: ComponentClass
  options?: BadgeOptions
}

export interface BadgeComponentProps {
  value: number
}
