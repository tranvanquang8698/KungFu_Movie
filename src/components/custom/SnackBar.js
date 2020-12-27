import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import {
  View,
  Animated,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
} from 'react-native';
import {getHeightStatusbar} from '../../res/values/getHeightStatusbar';
import {color} from '../../res/color';
import size from '../../res/size';
const SnackBar = forwardRef((props, ref) => {
  const {time} = props;

  const _animatedSnackbar = useRef(new Animated.Value(0)).current;

  useEffect(() => {}, []);

  showSnackBar = () => {
    Animated.timing(_animatedSnackbar, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  hideSnackBar = () => {
    Animated.timing(_animatedSnackbar, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  useImperativeHandle(ref, () => ({
    showSnackBar: () => {
      showSnackBar();
      setTimeout(() => {
        hideSnackBar();
      }, time);
    },
  }));

  let backgroundColor = '';

  const labelStyle = {
    top: _animatedSnackbar.interpolate({
      inputRange: [0, 1],
      outputRange: [-200, 0],
    }),
    width: '100%',
    backgroundColor: props.color,
    position: 'absolute',
    paddingHorizontal: 18,
  };

  return (
    <Animated.View style={labelStyle}>
      <SafeAreaView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          resizeMode="contain"
          source={props.icon}
          style={{
            width: props.size * 1.5,
            height: props.size * 1.5,
          }}
        />
        <Text
          style={{
            fontSize: props.size,
            color: color.backgroundColor,
            paddingVertical: props.size,
            paddingHorizontal: size.s20,
          }}>
          {props.label}
        </Text>
      </SafeAreaView>
    </Animated.View>
  );
});

SnackBar.defaultProps = {
  label: 'This is the title',
  time: 3000,
  type: 'default',
  size: 14,
  color: color.green,
};

export default SnackBar;
