let lightModeColor = {
  backgroundColor: '#ffffff',
  secondaryBackground: '#F4F4F4',
  normal: '#1890FF',
  popupBackground: '#00000036',
  border: '#E8E8E8',
  placeholder: '#8F8F8F',
  labelFocus: '#8C8C8C',
  error: '#F5222D',
  text: '#262626',
  green: '#389E0D',
  selected: '#EDF6FF',
  red: '#FF4D4F',
  white: '#ffffff',
  yellow: '#FFA940',
};

let darkModeColor = {
  backgroundColor: '#17151C',
  secondaryBackground: '#2A2731',
  normal: '#1890FF',
  popupBackground: '#00000036',
  border: '#595959',
  placeholder: '#8F8F8F',
  labelFocus: '#D9D9D9',
  error: '#F5222D',
  text: '#ffffff',
  green: '#389E0D',
  selected: '#00376F',
  red: '#FF4D4F',
  white: '#ffffff',
  yellow: '#FFA940',
};

let color = lightModeColor;
// let checkAppMode = async () => {
//   let value = await AsyncStorage.getItem('appMode')
//   console.log(value)
//   if (value === 'dark') {
//     color = darkModeColor
//   } else {
//     color = lightModeColor
//   }
// }
// checkAppMode()
// let onChangeAppMode = async (appType) => {
//   const value = await AsyncStorage.getItem('appMode')
//   if (value === null) {
//     await AsyncStorage.setItem('appMode', 'dark')
//     color = darkModeColor
//   } else if (value === 'dark') {
//     await AsyncStorage.setItem('appMode', 'light')
//     color = lightModeColor
//   } else {
//     await AsyncStorage.setItem('appMode', 'dark')
//     color = darkModeColor
//   }
// }

// let getAppMode = async () => {
//   const value = await AsyncStorage.getItem('appMode')
//   return value
// }

export {
  // lightModeColor,
  // darkModeColor,
  // onChangeAppMode,
  // getAppMode,
  // checkAppMode,
  color,
};

// export default color
