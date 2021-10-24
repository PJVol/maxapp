import React, { memo, useCallback } from 'react'
import { TouchableOpacity, Text, Platform, View, Image } from 'react-native'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import { androidFingerprint, faceID, fingerprint } from '../../assets'
import { Colors } from '../../config'
import styles from './styles'

export const PinInput = memo(({ pinLength = 4, enteredLength = 0 }: PinInputProps) => {
  const input = []
  for (let i = 1; i <= pinLength; i++) {
    input.push(<View key={i} style={i <= enteredLength ? styles.pinEnterHighlight : styles.pinEnter} />)
  }
  return <View style={styles.pinInput}>{input}</View>
})

export interface PinInputProps {
  pinLength: number
  enteredLength: number
}

type KeyType = 'num' | 'back' | 'biometry'

const PinKey = memo(({ num = 0, keyType = 'num', onPress, biometryType, biometryAvailable = true }: PinKeyProps) => {
  const style = keyType === 'num' ? styles.pinKey : styles.utilityPinKey

  let Content = null

  switch (keyType) {
    case 'num':
      Content = <Text style={styles.pinText}>{num}</Text>
      break
    case 'back':
      Content = <FontAwesome5Pro style={styles.backspace} name='backspace' color={Colors.WHITE_TEXT} />
      break
    case 'biometry': {
      if (!biometryAvailable) {
        Content = null
      } else {
        const icon = Platform.OS === 'android' ? androidFingerprint : biometryType === 'FaceID' ? faceID : fingerprint
        Content = <Image style={styles.biometricIcon} source={icon} />
      }
      break
    }
  }

  return (
    <TouchableOpacity style={style} onPress={() => onPress(num, keyType)}>
      {Content || <View />}
    </TouchableOpacity>
  )
})

interface PinKeyProps {
  num?: number
  keyType: KeyType
  onPress: (num: number, keyType: KeyType) => void
  biometryType?: string
  biometryAvailable?: boolean
}

const PinLane = memo(({ keys }: PinLaneProps) => {
  return (
    <View style={styles.pinLane}>
      {keys.map((props, index) => {
        return <PinKey key={index} {...props} />
      })}
    </View>
  )
})

interface PinLaneProps {
  keys: PinKeyProps[]
}

export const PinPad = memo(
  ({ onKeyPress, onBiometryInit, onBackspacePress, biometryType, biometryAvailable }: PinPadProps) => {
    const onPinKeyPress = useCallback(
      (key, keyType) => {
        switch (keyType) {
          case 'num':
            onKeyPress(key)
            break
          case 'biometry':
            onBiometryInit()
            break
          case 'back':
            onBackspacePress()
            break
        }
      },
      [onKeyPress, onBiometryInit, onBackspacePress],
    )

    return (
      <View style={styles.pinPad}>
        <PinLane
          keys={[
            { keyType: 'num', num: 1, onPress: onPinKeyPress },
            { keyType: 'num', num: 2, onPress: onPinKeyPress },
            { keyType: 'num', num: 3, onPress: onPinKeyPress },
          ]}
        />
        <PinLane
          keys={[
            { keyType: 'num', num: 4, onPress: onPinKeyPress },
            { keyType: 'num', num: 5, onPress: onPinKeyPress },
            { keyType: 'num', num: 6, onPress: onPinKeyPress },
          ]}
        />
        <PinLane
          keys={[
            { keyType: 'num', num: 7, onPress: onPinKeyPress },
            { keyType: 'num', num: 8, onPress: onPinKeyPress },
            { keyType: 'num', num: 9, onPress: onPinKeyPress },
          ]}
        />
        <PinLane
          keys={[
            { keyType: 'biometry', onPress: onPinKeyPress, biometryType, biometryAvailable },
            { keyType: 'num', num: 0, onPress: onPinKeyPress },
            { keyType: 'back', onPress: onPinKeyPress },
          ]}
        />
      </View>
    )
  },
)

export interface PinPadProps {
  onKeyPress: (key: number) => void
  onBiometryInit: () => void
  onBackspacePress: () => void
  biometryType: string
  biometryAvailable: boolean
}
