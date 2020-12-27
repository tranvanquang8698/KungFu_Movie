import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react';
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
  StatusBar,
} from 'react-native';
import TextField from '../custom/TextField';
import {color} from '../../res/color';
import size from '../../res/size';
import image from '../../res/img/index';
import {TextInput} from 'react-native-gesture-handler';

const Dialog = forwardRef((props, ref) => {
  const {time, value} = props;
  const [onSlide, setOnSlide] = useState(value);
  _animatedSlide = useRef(new Animated.Value(0)).current;
  let slideData = {};

  if (props.type === 'down') {
    Object.assign(slideData, {
      from: -1000,
      to: 0,
    });
  } else {
    Object.assign(slideData, {
      from: 1000,
      to: 0,
    });
  }

  useEffect(() => {
    // setOnSlide(value)
    if (value) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [value]);

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
    await setOnSlide(true);
    await Animated.timing(_animatedSlide, {
      toValue: 1,
      duration: time,
      useNativeDriver: false,
    }).start();
  };

  handleClose = (callback) => {
    Animated.timing(_animatedSlide, {
      toValue: 0,
      duration: time,
      useNativeDriver: false,
    }).start();
    setTimeout(async () => {
      setOnSlide(false);
      if (callback !== undefined) {
        await callback();
      }
    }, time);
  };

  // useImperativeHandle(ref, () => ({
  //   open: () => {
  //     handleOpen()
  //   },
  //   close: () => {
  //     handleClose()
  //   }
  // }))

  return (
    <Modal animationType="fade" transparent={true} visible={props.showFillSL}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={color.popupBackground}
      />

      <KeyboardAvoidingView
        KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? null : 'padding'}
        style={{
          backgroundColor: color.popupBackground,
          flex: 1,
          width: '100%',
          justifyContent: 'center',
          alignItem: 'center',
        }}>
        <View
          style={{
            height: 180,
            width: '70%',
            backgroundColor: 'pink',
            alignSelf: 'center',
            paddingTop: 20,
            alignItems: 'center',
            borderRadius: 30,
          }}>
          <Text style={{color: 'black', fontSize: size.s40}}>
            Nhập số lượng muốn mua
          </Text>
          <TextField
            numeric
            style={{
              marginVertical: size.s20,
            }}
            onChangeText={(text) => {
              props.setValSL(text);
            }}
            size={size.s30}
            label="Số lượng"
          />
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#F87FF6',
                padding: 10,
                marginRight: 20,
                borderRadius: 40,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => {
                props.offModal();
              }}>
              <View
                style={{
                  height: size.s40,
                  width: size.s120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Hủy</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: '#1CA7EC',
                padding: 10,
                marginLeft: 20,
                borderRadius: 40,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
              }}
              onPress={() => {
                props.addCart();
              }}>
              <View
                style={{
                  height: size.s40,
                  width: size.s120,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Thêm</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
});

Dialog.defaultProps = {};

export default Dialog;
