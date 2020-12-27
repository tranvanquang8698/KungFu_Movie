import React, { Component, useState, createRef, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity
} from 'react-native'
import size from '../../res/size'
import { color } from '../../res/color'
import image from '../../res/img/index'

const SearchBar = (props) => {
  const [value, setValue] = useState('')
  let textField = createRef()
  useEffect(() => {
    if (props.autoFocus) {
      textField.focus()
    }
    return () => {
    }
  }, [])
  return (
    <View
      style={[{
        flex: 1,
        backgroundColor: color.backgroundColor,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: size.s10,
        borderWidth: 1,
        borderColor: color.text
      }, props.style]}
    >
      <Image
        source={image.ic_search}
        style={{
          height: size.s30,
          width: size.s30,
          marginLeft: size.s30,
          marginRight: size.s20,
          tintColor: color.text
        }}
      />

      <TextInput
        ref={(input) => { textField = input; }}
        placeholder={props.placeholder}
        style={{
          flex: 1,
          fontSize: size.s30,
          paddingVertical: size.s20,
          width: '100%',
          color: color.text,
        }}
        value={value}
        onFocus={() => {
          props.onFocus()
        }}
        onChangeText={(text) => {
          props.onChangeText(text)
          setValue(text)
        }}
      />
      {
        value !== '' &&
        <TouchableOpacity
          onPress={() => {
            props.onChangeText('')
            setValue('')
          }}
          style={{
            marginHorizontal: size.s20,
          }}>
          <Image
            source={image.ic_close}
            style={{
              height: size.s30,
              width: size.s30,
            }}
          />
        </TouchableOpacity>
      }
    </View>
  )
}

SearchBar.defaultProps = {
  onChangeText: (text) => { },
  onFocus: () => { },
  placeholder: 'Tìm kiếm sản phẩm'
}

export default SearchBar