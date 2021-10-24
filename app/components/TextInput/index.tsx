import React, { useState, useCallback, useRef, useImperativeHandle, forwardRef } from 'react'
import { TextInput as RNTextInput, View, StyleProp, ViewStyle } from 'react-native'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { Colors } from '../../config'
import styles from './styles'

export const TextInput = forwardRef(
  (
    {
      focusedBorder = Colors.WHITE_BACKGROUND,
      normalBorder = Colors.WHITE_BACKGROUND,
      errorBorder = Colors.ERROR,
      editable = true,
      style,
      onChangeText,
      // @ts-ignore
      ...rest,
    }: TextInputProps,
    ref,
  ) => {
    const input = useRef(null)

    const [focused, setFocused] = useState(false)
    const [error, setError] = useState(false)

    const onBlurChange = useCallback(() => {
      setFocused(false)
    }, [setFocused])

    const onFocusChange = useCallback(() => {
      setFocused(true)
      setError(false)
    }, [setFocused, setError])

    useImperativeHandle(ref, () => ({
      focus: () => {
        input.current.focus()
      },
      showError: () => {
        setError(true)
      },
      suppressError: () => {
        setError(false)
      },
      isFocused: () => {
        return focused
      },
    }))

    return (
      <View
        style={[
          {
            borderColor: error ? errorBorder : focused ? focusedBorder : normalBorder,
          },
          styles.container,
          style,
        ]}
      >
        <RNTextInput
          ref={input}
          onChangeText={onChangeText}
          disableFullscreenUI={true}
          onFocus={onFocusChange}
          onBlur={onBlurChange}
          style={styles.input}
          {...rest}
        />
        <FontAwesome5Pro
          style={error ? styles.errorIconShown : styles.errorIcoHidden}
          name='exclamation-triangle'
          color={Colors.ERROR}
        />
        {!editable && <View style={editable ? styles.enabled : styles.disabled} />}
      </View>
    )
  },
)

export interface TextInputProps {
  focusedBorder: string
  normalBorder: string
  errorBorder: string
  editable: boolean
  style: StyleProp<ViewStyle>
  onChangeText: (text: string) => void
}
