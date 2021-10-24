import React, { memo, useCallback } from 'react'
import { Linking, Platform } from 'react-native'
import { useSelector } from 'react-redux'
import { noop } from 'lodash'
import { Button } from '../Button'
import { techSupp } from '../../assets'
// @ts-ignore
import { strings, logError } from '../../utils'
import { Colors } from '../../config'
import styles from './styles'

export const ContactSupport = memo(props => {
  // @ts-ignore
  const phone = useSelector(state => state.info.techsup)

  const handlePress = useCallback(() => {
    const phoneUrl = Platform.OS === 'ios' ? `telprompt:${phone}` : `tel:${phone}`

    Linking.openURL(phoneUrl)
      .then(noop)
      .catch(err => {
        logError(err)
      })
  }, [phone])

  return (
    <Button
      height={null}
      pressColor={Colors.CONTACT_SUPPORT_BUTTON_PRESSED}
      onPress={handlePress}
      backgroundColor={Colors.CONTACT_SUPPORT_BUTTON}
      text={strings('CONTACT_SUPPORT')}
      textStyle={styles.supportText}
      icon={techSupp}
      {...props}
    />
  )
})
