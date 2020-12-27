import React, { useState, useEffect, useImperativeHandle, forwardRef, useRef } from 'react'
import {
  View,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Image,
  Animated
} from 'react-native'
import { color } from '../../res/color'
import size from '../../res/size'

const Button = forwardRef((props, ref) => {
  let {
    label,
    icon,
    type,
    textStyle,
    iconLeft
  } = props
  const borderStyle = {
    borderWidth: 1,
    borderColor: props.color,
    borderRadius: size.s20
  }
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[{
        backgroundColor: type === 'border' ? 'transparent' : props.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        paddingHorizontal: size.s10
      },
      props.style,
      type === 'border' && borderStyle
      ]}
    >

      {
        iconLeft !== undefined &&
        <Image
          resizeMode='contain'
          source={iconLeft}
          style={{
            width: props.size * 1.5,
            height: props.size * 1.5,
            marginRight: size.s10
          }}
        >

        </Image>
      }
      <Text style={[{
        paddingVertical: props.size * 0.8,
        color: type === 'border' ? props.color : '#ffffff',
        fontSize: props.size,
        fontWeight: 'bold'
      }, textStyle]}>{label}</Text>
      {/* <Image
        source={icon}
      >

      </Image> */}
    </TouchableOpacity>
  )
})

Button.defaultProps = {
  size: 16,
  label: 'Label',
  backgroundColor: color.normal,
  onPress: () => {

  },
  color: color.normal,
  type: 'normal'
}

export default Button


const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  icon: {

  }
})

