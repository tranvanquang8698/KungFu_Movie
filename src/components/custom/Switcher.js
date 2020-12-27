import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Animated,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
import { color } from '../../res/color'

const Switcher = (props) => {
  const {
    value,
    size,
    offColor,
    onChange,
    color,
    time,
    defaultValue
  } = props
  const [isChoose, setIsChoose] = useState(false)

  _animatedIsChoose = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (props.value !== undefined) {
      if (props.value === 1) {
        setIsChoose(true)
      }
    }
  }, [props.value])

  useEffect(() => {
    onChange(isChoose)
    let value = 0
    if (isChoose) {
      value = 1
    }
    Animated.timing(_animatedIsChoose, {
      toValue: value,
      duration: time,
      useNativeDriver: false
    }).start();
  })

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setIsChoose(!isChoose)
        props.onChangeSwitch(!isChoose)
      }}
    >
      <Animated.View
        style={[{
          width: size * 1.7,
          backgroundColor: _animatedIsChoose.interpolate({
            inputRange: [0, 1],
            outputRange: [offColor, '#ffffff'],
          }),
          height: size,
          justifyContent: "center",
          borderRadius: size
        }, props.style]}
      >
        {
          isChoose &&
          <Animated.View
            style={{
              width: _animatedIsChoose.interpolate({
                inputRange: [0, 1],
                outputRange: [size, size * 1.7],
              }),
              backgroundColor: _animatedIsChoose.interpolate({
                inputRange: [0, 1],
                outputRange: ['#ffffff', color],
              }),
              height: size,
              justifyContent: "center",
              borderRadius: size * 0.9,
            }}
          />
        }
        <Animated.View
          style={{
            width: size * 0.9,
            height: size * 0.9,
            borderRadius: size * 0.9,
            position: "absolute",
            left: _animatedIsChoose.interpolate({
              inputRange: [0, 1],
              outputRange: [2, size * 0.8 - 2],
            }),
            backgroundColor: _animatedIsChoose.interpolate({
              inputRange: [0, 1],
              outputRange: ['#ffffff', '#ffffff'],
            }),
            borderColor: color.placeholder,

          }}
        >

        </Animated.View>

      </Animated.View>
    </TouchableWithoutFeedback>

  )
}

Switcher.defaultProps = {
  defaultValue: false,
  size: 20,
  color: color.normal,
  offColor: color.border,
  onChange: (value) => { },
  time: 200
}

export default Switcher