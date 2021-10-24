import React, { memo, ReactNode } from 'react'
import { View, StatusBar, Text, StyleProp, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'

export const AuthPage = memo(({ scrollEnabled = true, title, children, style }: AuthPageProps) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'transparent'} barStyle='light-content' />
      {/* {scrollEnabled &&  */}
      <ScrollView
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps='handled'
        contentContainerStyle={[styles.scroll, style]}
        overScrollMode='never'
        bounces={false}
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
      >
        <View>
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </View>
      </ScrollView>
    </View>
  )
})

export interface AuthPageProps {
  scrollEnabled?: boolean
  title?: string
  children: ReactNode
  style: StyleProp<ViewStyle>
}
