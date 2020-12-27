import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import {
  View,
  Animated,
  TouchableWithoutFeedback,
  Modal,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  StatusBar
} from 'react-native'
import { color, getAppMode } from '../../res/color'
import size from '../../res/size'
import image from '../../res/img/index'
import { userProfile } from '../../settings'

const BottomSheet = forwardRef((props, ref) => {
  const {
    time,
    value,
    isShowHeader
  } = props
  const [onSlide, setOnSlide] = useState(value)
  const _animatedSlide = useRef(new Animated.Value(0)).current
  let slideData = {}

  if (props.type === 'down') {
    Object.assign(slideData, {
      from: -1000,
      to: 0
    })
  } else {
    Object.assign(slideData, {
      from: 1000,
      to: 0
    })
  }

  useEffect(() => {
    // setOnSlide(value)
    if (value) {
      handleOpen()
    } else {
      handleClose()
    }
  }, [value])


  // useEffect(() => {
  //   if (onSlide) {
  //     // Animated.timing(_animatedSlide, {
  //     //   toValue: 1,
  //     //   duration: time,
  //     //   useNativeDriver: false
  //     // }).start()
  //   } else {

  //   }
  // }, [onSlide])

  handleOpen = async () => {
    await setOnSlide(true)
    await Animated.timing(_animatedSlide, {
      toValue: 1,
      duration: time,
      useNativeDriver: false
    }).start()
  }

  handleClose = (callback) => {
    Animated.timing(_animatedSlide, {
      toValue: 0,
      duration: time,
      useNativeDriver: false
    }).start()
    setTimeout(async () => {
      setOnSlide(false)
      if (callback !== undefined) {
        await callback()
      }
    }, time)
  }

  // useImperativeHandle(ref, () => ({
  //   open: () => {
  //     handleOpen()
  //   },
  //   close: () => {
  //     handleClose()
  //   }
  // }))

  return (

    <Modal animationType='fade' transparent={true} visible={onSlide}>
      <StatusBar
        barStyle={getAppMode() === 0 ? 'dark-content' : 'light-content'}
        backgroundColor={color.popupBackground} />

      <TouchableWithoutFeedback
        onPress={() => {
          handleClose(() => {
            props.onClose()
          })
        }}
      >
        <View style={{
          backgroundColor: color.popupBackground,
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
          <Animated.View
            style={{
              transform: [{
                translateY: _animatedSlide.interpolate({
                  inputRange: [0, 1],
                  outputRange: [slideData.from, slideData.to],
                })
              }],
              alignSelf: 'center',
              borderRadius: 10,
              flex: 1,
              justifyContent: props.position
            }}>
            <TouchableWithoutFeedback>
              <View>
                {
                  isShowHeader &&
                  <View
                    style={{
                      borderBottomWidth: 0.5,
                      width: Dimensions.get('window').width,
                      justifyContent: 'center',
                      borderColor: color.border,
                      flexDirection: 'row',
                      backgroundColor: color.backgroundColor,
                      borderTopLeftRadius: 10,
                      borderTopRightRadius: 10,
                      alignItems: 'center'
                    }}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        position: 'absolute',
                        left: size.s30,
                      }}
                      onPress={() => {
                        handleClose(() => {
                          props.onClose()
                        })
                      }}
                    >
                      <Image
                        resizeMode='contain'
                        style={{
                          width: size.s50,
                          height: size.s50,
                        }}
                        source={userProfile.appMode === 0 ? image.ic_cross : image.ic_crossWhite}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: props.size,
                        paddingVertical: 15,
                        alignSelf: 'center',
                        color: color.text,
                        fontWeight: 'bold',
                        fontSize: size.s30
                      }}>
                      {props.title}
                    </Text>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'center',
                        position: 'absolute',
                        right: size.s30,
                      }}
                      onPress={() => {
                        handleClose(() => {
                          props.onSubmit()
                        })
                      }}
                    >
                      <Text style={{
                        color: color.normal,
                        fontSize: size.s25
                      }}>Done</Text>
                    </TouchableOpacity>
                  </View>
                }
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'android' ? null : 'padding'}
                >
                  {props.children}

                </KeyboardAvoidingView>

              </View>


            </TouchableWithoutFeedback>
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>

  )

})

BottomSheet.defaultProps = {
  position: 'flex-end',
  type: 'up',
  time: 300,
  isOpen: false,
  onClose: () => { },
  isShowHeader: true,
  title: 'Title',
  onSubmit: () => { }
}

export default BottomSheet



