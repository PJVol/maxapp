import React, { memo, ReactChildren } from 'react'
import { StatusBar, View, RefreshControl, Text, ViewStyle, StyleProp } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// @ts-ignore
import { strings } from '../../utils'
import styles from './styles'

export const Page = memo(
  ({ onRefresh, refreshing, scrollEnabled = true, refreshEnabled = false, title, style, children }: PageProps) => {
    return (
      <View style={styles.background}>
        <StatusBar translucent={true} backgroundColor={'transparent'} barStyle='dark-content' />

        <ScrollView
          scrollEnabled={scrollEnabled}
          keyboardShouldPersistTaps='handled'
          overScrollMode='never'
          bounces={refreshEnabled}
          keyboardDismissMode='on-drag'
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              title={refreshing ? '' : strings('PULL_TO_REFRESH')}
              enabled={refreshEnabled}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          contentContainerStyle={[styles.scroll, style]}
        >
          {title && <Text style={styles.title}>{title}</Text>}
          {children}
        </ScrollView>
      </View>
    )
  },
)

export interface PageProps {
  onRefresh: () => void
  scrollEnabled: boolean
  refreshEnabled: boolean
  style: StyleProp<ViewStyle>
  title?: string
  children: ReactChildren
  refreshing: boolean
}
