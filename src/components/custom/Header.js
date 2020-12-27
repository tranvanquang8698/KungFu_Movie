import React, {Component, useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {getStatusBarHeight} from '../../res/values/getHeightStatusbar';
import size from '../../res/size';
import {color, getAppMode} from '../../res/color';
import image from '../../res/img/index';
import {userProfile} from '../../config/settings';

const Header = (props) => {
  const {listView} = props;
  const [modalVisible, setModalVisible] = useState(false);
  renderItem = (item) => {
    switch (item.name) {
      case 'search':
        return (
          <HeaderIcon
            icon={image.ic_search}
            onPress={() => {
              // item.action === undefined ?
              //   props.navigation.goBack() :
              item.action();
            }}
          />
        );
      case 'back': {
        return (
          <HeaderIcon
            icon={image.ic_back}
            onPress={() => {
              item.action === undefined
                ? props.navigation.goBack()
                : item.action();
            }}
          />
        );
      }
      case 'menu': {
        return (
          <HeaderIcon
            icon={image.ic_menu}
            onPress={() => {
              item.action === undefined
                ? props.navigation.openDrawer()
                : item.action();
            }}
          />
        );
      }
      case 'logout': {
        return (
          <MenuItem
            onPress={() =>
              Alert.alert(
                'Thông báo',
                'Bạn có muốn logout không',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {},
                  },
                  {
                    text: 'OK',
                    onPress: () => {
                      props.navigation.replace('Login');
                    },
                  },
                ],
                {cancelable: false},
              )
            }
            data={{
              id: 1,
              mnIcon: image.ic_mnLogout,
              label: 'Logout',
            }}
          />
        );
      }
      case 'title': {
        return (
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontSize: size.s35 * 0.9,
                fontWeight: '600',
                fontFamily:
                  Platform.OS == 'android' ? 'sans-serif-medium' : null,
                textAlign: 'center',
                color: color.text,
              }}>
              {item.value}
            </Text>
          </View>
        );
      }
      case 'reset': {
        return (
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: size.s30,
            }}
            onPress={() => {
              item.action();
            }}>
            <Text
              style={{
                fontSize: size.s25,
                // paddingRight: size.s5,
                color: color.normal,
              }}>
              Reset
            </Text>
          </TouchableOpacity>
        );
      }
      case 'home': {
        return (
          <HeaderIcon
            icon={image.ic_home}
            iconSize={size.s40}
            onPress={() => {
              props.navigation.reset({
                routes: [{name: 'Home'}],
              });
            }}
          />
        );
      }
      case 'info': {
        return (
          <HeaderIcon
            icon={image.ic_info}
            iconSize={size.s40}
            onPress={() => {
              // item.action === undefined ?
              //   props.navigation.openDrawer() :
              item.action();
            }}
          />
        );
      }
      case 'iconNull': {
        return <HeaderIcon />;
      }
      default:
        return null;
    }
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: color.backgroundColor,
      }}>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor="transparent"
        // translucent
      />
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          paddingHorizontal: size.s15,
          paddingVertical: size.s20,
          // paddingTop: getStatusBarHeight(),
        }}>
        {listView.map((item, key) => {
          return renderItem(item);
        })}

        {/* 
        <HeaderIcon
          icon={image.ic_cart}
        /> */}
      </View>
    </SafeAreaView>
  );
};

Header.defaultProps = {
  title: 'Title',
  listView: [{name: 'title', value: 'iHotel'}],
  autoFocus: false,
  onChangeText: () => {},
};

export default Header;

const HeaderIcon = (props) => {
  return (
    <TouchableOpacity
      style={{
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        padding: size.s10,
      }}
      onPress={() => {
        if (props.onPress !== undefined) {
          props.onPress();
        }
      }}>
      <Image
        resizeMode="contain"
        source={props.icon}
        style={{
          width: props.iconSize,
          height: props.iconSize,
          tintColor: color.text,
        }}
      />
    </TouchableOpacity>
  );
};

HeaderIcon.defaultProps = {
  iconSize: size.s45,
};

const MenuItem = (props) => {
  const {data} = props;
  useEffect(() => {}, []);
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          props.onPress();
        }}
        style={{}}>
        <Image
          resizeMode="contain"
          source={data.mnIcon}
          style={{
            width: size.s50,
            height: size.s50,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};
