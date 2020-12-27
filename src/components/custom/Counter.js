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
import image from '../../res/img/index'
import { TextInput } from 'react-native-gesture-handler'

const Counter = forwardRef((props, ref) => {

  const [value, setValue] = useState('0')

  useEffect(() => {
    if (props.defaultValue !== undefined) {
      setValue(props.defaultValue.toString())
    }
  }, [])

  return (
    <View style={{
      flexDirection: 'row'
    }}>

      {
        (value !== '0' && value !== '') &&
        <TouchableOpacity
          onPress={() => {
            if (parseInt(value) === 1) {
              props.onRemove((parseInt(value) - 1).toString())
            } else {
              props.onChangeValue((parseInt(value) - 1).toString())
            }
            setValue((parseInt(value) - 1).toString())

          }}
        >

          <Image
            source={image.ic_decrease}
            style={{
              width: size.s50,
              height: size.s50
            }}
          />

        </TouchableOpacity>
      }
      {
        (value !== '0' && value !== '') &&
        <TextInput
          numberOfLines={1}
          value={value}
          onChangeText={(text) => {
            props.onChangeValue(text)
            setValue(text)
          }}
          style={{
            fontSize: size.s25 * 1.1,
            width: size.s70,
            textAlign: 'center',
            color: color.text
          }}
        />
      }
      <TouchableOpacity onPress={() => {
        if (value === '' || value == '0') {
          props.onAdd('1')
          setValue('1')
        } else {
          props.onChangeValue((parseInt(value) + 1).toString())
          setValue((parseInt(value) + 1).toString())
        }
      }}>

        <Image
          source={image.ic_increase}
          style={{
            width: size.s50,
            height: size.s50
          }}
        />

      </TouchableOpacity>

    </View>
  )
})



Counter.defaultProps = {
  size: 16,
  label: 'Label',
  backgroundColor: color.normal,
  onPress: () => {

  },
  color: color.normal,
  type: 'normal',
  onChangeValue: () => { },
  onRemove: () => { }
}

export default Counter

