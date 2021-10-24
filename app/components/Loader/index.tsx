import React, { memo } from 'react'
import { Modal, ActivityIndicator, View, Text } from 'react-native'
import { useSelector } from 'react-redux'
// @ts-ignore
import { strings } from '../../utils'
import styles from './styles'

export const Loader = memo(() => {
  // @ts-ignore
  const loading = useSelector(state => state.status.loading)

  return (
    <Modal transparent={true} animationType={'none'} visible={loading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator color='white' size='large' animating={loading} />
        <Text style={styles.loadingText}>{strings('LOADING')}</Text>
      </View>
    </Modal>
  )
})
