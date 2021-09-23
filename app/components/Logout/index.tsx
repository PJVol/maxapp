import React, { memo, useCallback } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { Text, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux'
// @ts-ignore
import { strings } from '../../utils'
import { Routes } from '../../config'
import styles from './styles'
// @ts-ignore
import { LOGOUT } from '../../store'

export const Logout = memo(() => {
  const { navigate } = useNavigation()
  // @ts-ignore
  const dispatch = useDispatch()

  const callback = useCallback(() => {
    navigate(Routes.AgreementAuth)
  }, [navigate])

  const logout = useCallback(() => {
    dispatch({ type: LOGOUT, payload: { callback } })
  }, [callback, dispatch])

  return (
    <TouchableOpacity onPress={logout}>
      <Text style={styles.logout}>{strings('LOGOUT')}</Text>
    </TouchableOpacity>
  )
})
