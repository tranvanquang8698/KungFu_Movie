import React, {Component} from 'react';
import {
  View,
  Image,
  Dimensions,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Alert,
  StatusBar,
  Modal,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import TextField from '../custom/TextField';
import Button from '../custom/Button';
import image from '../../res/img/index';
import size from '../../res/size';
import {color, getAppMode} from '../../res/color';
import dismissKeyboard from 'react-native/Libraries/Utilities/dismissKeyboard';
import Loading from '../custom/Loading';
import {userProfile} from '../../config/settings';
import images from '../../res/img/index';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '0949209394',
      password: 'Nguyễn Cảnh Quyết',
      usernameForAdmin: 'admin',
      passwordForAdmin: 'admin',
      appMode: '',
      AdminModal: false,
      userNameAdmin: '',
      passAdmin: '',
      countAdminLogin: 0,
      isGoAdmin: false,
    };

    this.username = React.createRef();
    this.password = React.createRef();
    this.usernameForAdmin = React.createRef();
    this.passwordForAdmin = React.createRef();
    this.backTimer = null;
    this.backCount = 0;
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (
      this.props.loadingLogin !== prevProps.loadingLogin &&
      !this.props.loadingLogin
    ) {
      if (this.props.errorLogin !== null) {
        Alert.alert(
          'Thông báo',
          this.props.errorLogin,
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: false},
        );
      } else if (this.props.responseLogin !== null) {
        userProfile.token =
          'Bearer ' + JSON.parse(this.props.responseLogin).access_token;
        console.log(userProfile.token);
        // userProfile.USER_CODE = this.props.responseLogin.USER_CODE;
        // userProfile.USER_ID = this.props.responseLogin.USER_ID;
        this.state.isGoAdmin == true
          ? this.props.navigation.replace('AdminPage')
          : this.props.navigation.replace('HomeUser');
      }
    }
  }

  onLogin = () => {
    this.props.navigation.replace('HomeUser');
  };

  onAdminLogin = () => {
    if (
      this.state.usernameForAdmin === 'admin' &&
      this.state.passwordForAdmin !== ''
    ) {
      this.props.loginAction({
        userName: this.state.usernameForAdmin,
        password: this.state.passwordForAdmin,
      });
    } else
      Alert.alert(
        'Thông báo',
        'Sai thông tin đăng nhập!',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
  };
  checkPhoneNumberInVietName = (mobile) => {
    var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    if (vnf_regex.test(mobile) == false)
      return 'Vui lòng nhập số điện thoại hợp lệ (SĐT Việt Nam bao gồm 10 số)';
    return null;
  };
  checkData = () => {
    if (this.state.username === '') {
      this.username.current.error('Vui lòng nhập thông tin số điện thoại');
      if (this.state.password === '') {
        this.password.current.error('Vui lòng nhập thông tin số điện thoại');
      }
      return false;
    } else if (this.state.password === '') {
      this.password.current.error('Vui lòng nhập thông tin số điện thoại');
      return false;
    } else {
      return true;
    }
  };
  _showUiAdmin = () => {
    this.setState({AdminModal: true});
  };
  render() {
    return (
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? null : 'padding'}
          style={{flex: 1}}>
          {this.props.loadingLogin && <Loading />}
          <StatusBar
            barStyle={
              userProfile.appMode === 0 ? 'dark-content' : 'light-content'
            }
            backgroundColor={color.backgroundColor}
          />
          <Modal transparent visible={this.state.AdminModal}>
            <ImageBackground
              source={images.img_loginadmin}
              style={{
                flex: 1,
              }}>
              <TouchableWithoutFeedback onPress={dismissKeyboard}>
                <KeyboardAvoidingView
                  behavior={Platform.OS === 'android' ? null : 'padding'}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      height: 400,
                      backgroundColor: 'pink',
                      width: '77%',
                      padding: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 40,
                    }}>
                    <Text
                      style={{
                        fontSize: size.s40,
                        color: color.text,
                        fontWeight: 'bold',
                        paddingVertical: size.s80,
                      }}>
                      Đăng nhập để tới trang quản lý
                    </Text>
                    <TextField
                      ref={this.usernameForAdmin}
                      style={{
                        marginVertical: size.s20,
                      }}
                      value={this.state.usernameForAdmin}
                      onChangeText={(text) => {
                        this.setState({
                          usernameForAdmin: text,
                        });
                      }}
                      size={size.s30}
                      label="Tài khoản"
                    />

                    <TextField
                      ref={this.passwordForAdmin}
                      style={{
                        marginVertical: size.s20,
                      }}
                      value={this.state.passwordForAdmin}
                      onChangeText={(text) => {
                        this.setState({
                          passwordForAdmin: text,
                        });
                      }}
                      secureTextEntry={true}
                      size={size.s30}
                      label="Mật khẩu"
                    />
                    <View
                      style={{
                        flexDirection: 'row',
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
                          this.setState({AdminModal: false});
                        }}>
                        <View
                          style={{
                            height: size.s40,
                            width: size.s120,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text>Quay lại</Text>
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
                          if (
                            this.state.passwordForAdmin != '' &&
                            this.state.usernameForAdmin != ''
                          ) {
                            this.setState(
                              {AdminModal: false, isGoAdmin: true},
                              () =>
                                this.props.loginAction({
                                  userName: this.state.usernameForAdmin,
                                  password: this.state.passwordForAdmin,
                                }),
                            );
                          } else {
                            Alert.alert(
                              'Thông báo',
                              'Sai tài khoản hoặc mật khẩu',
                              [
                                {
                                  text: 'OK',
                                  onPress: () => console.log('OK Pressed'),
                                },
                              ],
                              {cancelable: false},
                            );
                          }
                        }}>
                        <View
                          style={{
                            height: size.s40,
                            width: size.s180,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <Text>Đăng nhập</Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </KeyboardAvoidingView>
              </TouchableWithoutFeedback>
            </ImageBackground>
          </Modal>
          <View
            style={{
              flex: 1,
              backgroundColor: color.backgroundColor,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: size.s30,
            }}>
            <TouchableWithoutFeedback
              onPress={() => {
                this.backCount++;
                console.log(this.backCount);
                if (this.backCount == 5) {
                  clearTimeout(this.backTimer);
                  this._showUiAdmin();
                } else {
                  this.backTimer = setTimeout(() => {
                    this.backCount = 0;
                  }, 3000);
                }
              }}>
              <Image
                source={image.img_login}
                resizeMode="contain"
                style={{
                  width: Dimensions.get('window').width * 0.8,
                  height: Dimensions.get('window').width * 0.8 * (160 / 300),
                  marginBottom: size.s30,
                }}
              />
            </TouchableWithoutFeedback>

            <View>
              <Text
                style={{
                  fontSize: size.s40,
                  color: color.text,
                  fontWeight: 'bold',
                  paddingVertical: size.s80,
                }}>
                Welcome To hhKungFu.TV
              </Text>
            </View>

            <TextField
              ref={this.username}
              style={{
                marginVertical: size.s20,
              }}
              numeric
              value={this.state.username}
              onChangeText={(text) => {
                this.setState({
                  username: text,
                });
              }}
              size={size.s30}
              label="Tài khoản"
            />

            <TextField
              ref={this.password}
              style={{
                marginVertical: size.s20,
              }}
              value={this.state.password}
              onChangeText={(text) => {
                this.setState({
                  password: text,
                });
              }}
              size={size.s30}
              label="Mật khẩu"
              secureTextEntry={true}
            />
            <Button
              style={{
                marginVertical: size.s20,
                width: '100%',
              }}
              // backgroundColor={'#6C63FF'}
              label="Đăng nhập"
              size={size.s30}
              onPress={() => {
                this.props.navigation.navigate('Home');
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}
