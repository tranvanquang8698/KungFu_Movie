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
import { Calendar } from 'react-native-calendars'
import { color } from '../../res/color'
import image from '../../res/img/index'
import size from '../../res/size'
import { userProfile } from '../../settings'
import ErrorView from './ErrorView'
import SearchBar from './SearchBar'
import InfinityScroll from './InfinityScroll'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker, DatePicker } from '@dungdang/react-native-full/pickTime'

let width = Dimensions.get('window').width
let height = Dimensions.get('window').height

const Select = forwardRef((props, ref) => {
  let [showSelect, setShowSelect] = useState(false)
  let [markedDate, setMarkedDate] = useState({})
  let [selectedItem, setSelectedItem] = useState(
    props.defaultValue !== undefined ? props.defaultValue : undefined
  );
  const { listItem } = props
  // _animatedShowSelect = new Animated.Value(showSelect ? 0 : 1);
  let _animatedShowSelect = useRef(new Animated.Value(0)).current
  const time = props.time
  let [error, setError] = useState('')

  useImperativeHandle(ref, () => ({
    error: (content) => {
      setError(content)
    },
    clearError: (key) => {
      setError('')
    },
    info: () => {
    },
    open: () => {
      setShowSelect(true)
    },
    close: (callback) => {
      handleClose(() => {
        if (callback !== undefined) {
          callback()
        }
      })
    }
  }))

  useEffect(() => {
    if (props.value === '') {
      setSelectedItem(undefined)
    } else if (props.value !== undefined && props.multiple && props.value.length === 0) {
      setSelectedItem(undefined)
    } else {
      setSelectedItem(props.value)
    }
  }, [props.value])

  useEffect(() => {
    if (showSelect) {
      Animated.timing(_animatedShowSelect, {
        toValue: 1,
        duration: time,
        useNativeDriver: false
      }).start()
    } else {

    }
  }, [showSelect])

  handleOpen = async () => {
    // await setShowSelect(true)
    // Animated.timing(_animatedShowSelect, {
    //   toValue: 1,
    //   duration: time,
    //   useNativeDriver: false
    // }).start()
  }

  handleClose = (callback) => {
    Animated.timing(_animatedShowSelect, {
      toValue: 0,
      duration: time,
      useNativeDriver: false
    }).start()
    setTimeout(async () => {

      setShowSelect(false)
      console.log(showSelect)

      if (callback !== undefined) {
        await callback()
      }
    }, time)
  }

  const renderItem = ({ item, index }) => {
    let isSelected = false
    if (selectedItem !== undefined) {
      if (!props.multiple) {
        if (item.id === selectedItem.id) {
          isSelected = true
        }
      } else {
        let tmp = selectedItem.findIndex(ele => ele.id === item.id)
        if (tmp !== -1) {
          isSelected = true
        }
      }
    }

    return (
      <TouchableOpacity
        style={{
          borderBottomWidth: 0.5,
          width: width,
          paddingHorizontal: 16,
          marginHorizontal: 10,
          alignItem: 'center',
          justifyContent: 'space-between',
          borderColor: color.border,
          flexDirection: 'row',
          backgroundColor: isSelected ? color.selected : color.backgroundColor
        }}
        onPress={async () => {
          if (props.disabledSelectItem) {

          } else {

            setError('')
            if (!props.multiple) {
              if (props.requiredSubmit) {
                for (let item of listItem) {
                  item.isSelected = false
                }
                item.isSelected = true
                setSelectedItem(item)
                props.onChooseItem(item)
              } else {
                handleClose(() => {
                  for (let item of listItem) {
                    item.isSelected = false
                  }
                  item.isSelected = true
                  setSelectedItem(item)
                  props.onChooseItem(item)
                })
              }

            } else {
              if (item.isSelected) {
                item.isSelected = false
                let tmp = []
                for (let ele of selectedItem) {
                  tmp.push(ele)
                }
                let index = tmp.findIndex(ele => ele.id === item.id)
                tmp.splice(index, 1)
                if (tmp.length === 0) {
                  tmp = undefined
                }
                setSelectedItem(tmp)
                props.onChooseItem(tmp)
              } else {
                item.isSelected = true
                if (selectedItem === undefined) {
                  let tmp = []
                  tmp.push(item)
                  setSelectedItem(tmp)
                  props.onChooseItem(tmp)
                } else {
                  let tmp = []
                  for (let ele of selectedItem) {
                    tmp.push(ele)
                  }
                  tmp.push(item)
                  setSelectedItem(tmp)
                  props.onChooseItem(tmp)
                }

              }
            }
          }

        }}
      >

        {
          props.itemView !== undefined ?
            props.itemView(item, isSelected) :
            <View style={{
              flex: 1
            }}>
              <Text
                style={{
                  fontSize: props.size,
                  paddingVertical: 15,
                  color: isSelected ? color.normal : color.text,
                  paddingRight: props.size,
                  fontWeight: isSelected ? 'bold' : 'normal'
                }}>

                {item.label !== undefined ? item.label : item}
              </Text>
            </View>
        }

        {
          isSelected &&
          <Image
            resizeMode='contain'
            source={image.ic_check}
            style={{
              width: props.size * 1.2,
              height: '100%',
            }}
          />
        }
        {/* <View
          style={{
            backgroundColor: color.normal,
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0.2,
            width: '100%',
            height: '100%'
          }}
        /> */}
      </TouchableOpacity>
    );
  };


  let borderColor = color.border
  if (showSelect) {
    borderColor = color.normal
  }
  if (error !== '') {
    borderColor = color.error
  }

  let label = ''
  if (selectedItem !== undefined && selectedItem !== null) {
    if (!props.multiple) {
      label = selectedItem.label
    } else {
      if (selectedItem.length === 0) {
        label = ''
      } else {
        for (const item of selectedItem) {
          if (label === '') {
            label = item.label
          } else {
            label = label + ' | ' + item.label
          }
        }
      }

    }
  } else {
    label = ''
  }

  return (
    <View style={[styles.container, props.style, {
      backgroundColor: color.backgroundColor
    }]}>
      {/* {props.label && <Label size={props.size} label={props.label} isRequired={props.isRequired} />} */}
      {
        props.selectView === undefined ?
          <TouchableOpacity
            style={{
              borderColor: borderColor,
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              minHeight: props.size * 3.5,
              backgroundColor: props.disabled ? color.border : color.backgroundColor
            }}
            onPress={async () => {
              if (props.disabled !== true) {
                setError('')
                await setShowSelect(true)
              }
            }}
          >
            <View>

              {
                (selectedItem !== undefined) &&
                <Text style={{
                  color: color.labelFocus,
                  fontSize: props.size * 0.75,
                  top: props.size * 0.25,
                  left: 16,
                  lineHeight: Platform.OS === 'ios' ? props.size * 1.25 : props.size,
                }}>
                  {props.placeholder}
                  {
                    props.isRequired &&
                    <Text style={{
                      color: color.error,
                      fontSize: props.size * 0.75,
                    }}>
                      {' '}*
                    </Text>
                  }

                </Text>
              }

              <Text style={{
                // paddingTop: selectedItem === undefined ? props.size : (props.size * 0.7),
                // paddingBottom: selectedItem === undefined ? props.size : (props.size * 0.7 - 5),
                // paddingRight: props.size + 32,
                // paddingLeft: 16,
                // fontSize: props.size,
                // color: selectedItem === undefined ? color.placeholder : color.text,
                // fontSize: props.size

                paddingVertical: selectedItem === undefined ? props.size : 0,
                paddingTop: selectedItem === undefined ? props.size : props.size * 0.5,
                lineHeight: props.size * 1.25,
                fontSize: props.size,
                borderColor: color.border,
                paddingLeft: 16,
                paddingRight: props.isRequired ? props.size * 2 : props.size + 32,
                flex: 1,
                color: selectedItem === undefined ? color.placeholder : color.text
              }}
                numberOfLines={1}
              >
                {selectedItem !== undefined ? label : props.placeholder}
                {
                  (props.isRequired && selectedItem === undefined) &&
                  <Text style={{
                    color: color.error,
                    fontSize: props.size,
                  }}>
                    {' '}*
                  </Text>
                }
              </Text>
            </View>

            <Image
              style={{
                resizeMode: 'contain',
                height: (props.type !== 'date' && props.type !== 'time') ? props.size : props.size * 1.6,
                alignSelf: 'center',
                right: (props.type !== 'date' && props.type !== 'time') ? 16 : 0,
                position: 'absolute',
                tintColor: (props.type !== 'date' && props.type !== 'time') ? color.placeholder : color.text
              }}
              source={props.type === 'date' ? image.ic_calendar : props.type === 'time' ? image.ic_clock : image.ic_down}
            />


          </TouchableOpacity>
          :
          props.selectView()
      }
      {error !== '' && <ErrorView error={error} />}
      <Modal animationType='none' transparent={true} visible={showSelect}>
        <TouchableWithoutFeedback
          onPress={() => { handleClose() }}>
          <View style={{
            backgroundColor: color.popupBackground,
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            alignItem: 'center',
          }}>
            <TouchableWithoutFeedback>

              <Animated.View
                disabled={true}
                style={{
                  transform: [{
                    translateY: _animatedShowSelect.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1000, 0],
                    })
                  }],
                  width: '100%',
                  backgroundColor: color.backgroundColor,
                  alignSelf: 'center',
                  borderRadius: 15,
                  maxHeight: height * 0.9,
                  minHeight: (props.type === 'date' || props.type === 'time') ? height * 0.2 : height * 0.5,
                }}>
                <View
                  style={{
                    borderBottomWidth: 0.5,
                    width: width,
                    justifyContent: 'center',
                    borderColor: color.border,
                    flexDirection: 'row'
                  }}>
                  <View>
                    <Text
                      style={{
                        fontSize: props.size,
                        paddingVertical: 15,
                        alignSelf: 'center',
                        color: color.text,
                        fontWeight: 'bold',
                        color: color.text
                      }}>
                      {props.placeholder} { }
                      {(props.multiple && selectedItem !== undefined) && '(' + selectedItem.length + ')'}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={{
                      justifyContent: 'center',
                      position: 'absolute',
                      left: size.s30,
                      height: '100%'
                    }}
                    onPress={() => handleClose()}
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

                  {
                    (props.multiple || props.type === 'date' || props.type === 'time' || props.requiredSubmit) &&
                    <TouchableOpacity style={{
                      // alignSelf: 'center',
                      right: 16,
                      position: 'absolute',
                      height: '100%',
                      justifyContent: 'center'
                    }}
                      onPress={() => {
                        if (props.requiredSubmit) {
                          props.onPressConfirm(selectedItem)
                        } else if (selectedItem === undefined && (props.type === 'date' || props.type === 'time')) {
                          if (props.type === 'date') {
                            let newDate = new Date()
                            let day = newDate.getDate()
                            let month = newDate.getMonth() + 1
                            let year = newDate.getFullYear()
                            if (day < 10) {
                              day = '0' + day
                            }
                            if (month < 10) {
                              month = '0' + month
                            }
                            if (year < 10) {
                              year = '0' + year
                            }
                            setSelectedItem({
                              id: 1,
                              label: `${year}-${month}-${day}`,
                              value: newDate
                            })
                            handleClose(() => {
                              props.onChooseItem({
                                id: 1,
                                label: `${year}-${month}-${day}`,
                                value: newDate
                              })
                            })
                          } else {
                            let newDate = new Date()
                            let hour = newDate.getHours()
                            let minute = newDate.getMinutes()
                            if (hour < 10) {
                              hour = '0' + hour
                            }
                            if (minute < 10) {
                              minute = '0' + minute
                            }
                            setSelectedItem({
                              id: 1,
                              label: `${hour}:${minute}`,
                              value: newDate
                            })
                            handleClose(() => {
                              props.onChooseItem({
                                id: 1,
                                label: `${hour}:${minute}`,
                                value: newDate
                              })
                            })
                          }
                        } else {
                          handleClose(() => {
                            props.onChooseItem(selectedItem)
                          })
                        }
                      }}
                    >
                      <Text style={{
                        color: color.normal
                      }}>Done</Text>
                    </TouchableOpacity>
                  }

                </View>

                {
                  props.isSearch &&
                  <View style={{
                    flexDirection: 'row',
                    paddingVertical: size.s15
                  }}>
                    <SearchBar
                      placeholder='Tìm kiếm'
                      onChangeText={(text) => {
                        props.onSearching(text)
                      }}
                      style={{
                        marginHorizontal: size.s30,
                      }}
                    />
                  </View>
                }

                {
                  props.type === 'normal' &&
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={listItem}
                    keyExtractor={(item, index) => { index.toString() }}
                    renderItem={(item, index) => renderItem(item, index)}
                    style={{
                      width: '100%',
                      alignSelf: 'center',
                      backgroundColor: color.backgroundColor,
                      maxHeight: height * 0.9,
                      height: props.height
                    }}
                    contentContainerStyle={{
                      alignItems: 'center',
                    }}
                    legacyImplementation={true}
                    windowSize={30}
                    removeClippedSubviews={true}
                    disableIntervalMomentum={true}
                    onRefresh={() => props.onRefresh()}
                    onEndReachedThreshold={0.01}
                    onEndReached={() => {
                      props.loadMore();
                    }}
                    windowSize={30}
                    removeClippedSubviews={true}
                    refreshing={props.refreshing}
                  />
                }

                {
                  props.type === 'date' &&
                  <DatePicker
                    //  order ={"D/M/YYY"}
                    mode='date'
                    isVN={true}
                    style={{
                      height: size.s200 * 2,
                      width: undefined,
                      backgroundColor: '#ffffff',
                    }}
                    minimumDate={new Date('2000-01-01')}
                    maximumDate={new Date('2050-12-31')}
                    onDateChange={(date) => {
                      let newDate = new Date(date)
                      let day = newDate.getDate()
                      let month = newDate.getMonth() + 1
                      let year = newDate.getFullYear()
                      if (day < 10) {
                        day = '0' + day
                      }
                      if (month < 10) {
                        month = '0' + month
                      }
                      if (year < 10) {
                        year = '0' + year
                      }
                      props.onChooseItem({
                        id: 1,
                        label: `${year}-${month}-${day}`,
                        value: newDate
                      })
                      setSelectedItem({
                        id: 1,
                        label: `${year}-${month}-${day}`,
                        value: newDate
                      })

                    }}
                  />


                }
                {
                  props.type === 'time' &&
                  <DatePicker
                    //  order ={"D/M/YYY"}
                    mode='time'
                    isVN={true}
                    style={{
                      height: size.s200 * 2,
                      width: undefined,
                      backgroundColor: '#ffffff',
                    }}
                    onDateChange={(date) => {
                      let newDate = new Date(date)
                      let hour = newDate.getHours()
                      let minute = newDate.getMinutes()
                      if (hour < 10) {
                        hour = '0' + hour
                      }
                      if (minute < 10) {
                        minute = '0' + minute
                      }
                      if (sec < 10) {
                        sec = '0' + sec
                      }
                      setSelectedItem({
                        id: 1,
                        label: `${hour}:${minute}:${sec}`,
                        value: newDate
                      })
                      props.onChooseItem({
                        id: 1,
                        label: `${hour}:${minute}:${sec}`,
                        value: newDate
                      })
                    }}
                  />

                }

                {/* <InfinityScroll
                    data={[
                      { key: '1' },
                      { key: '2' },
                      { key: '3' },
                      { key: '4' },
                      { key: '5' },
                      { key: '6' },
                      { key: '7' },
                      { key: '8' },
                      { key: '9' },
                      { key: '10' },
                      { key: '11' },
                      { key: '12' },
                    ]}
                    renderItem={({ item }) =>
                      <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%'
                      }}><Text style={{
                        fontSize: size.s50
                      }}>{item.key}</Text>
                      </View>}
                  /> */}

              </Animated.View>
            </TouchableWithoutFeedback>

          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>

  )
})
{/* <DateTimePicker
                    mode='time'
                    value={new Date()}
                    mode={true}
                    is24Hour={true}
                    display="default"
                    style={{
                      backgroundColor: color.backgroundColor
                    }}
                  // onChange={onChange}
                  /> */}
Select.defaultProps = {
  placeholder: 'Select an item',
  type: 'normal',
  size: size.s30,
  time: 400,
  onChooseItem: () => { },
  label: '',
  isRequired: false,
  listItem: [],
  multiple: false,
  refreshing: false,
  loadMore: () => { },
  onRefresh: () => { },
  onSearching: () => { }
  // styles: StyleSheet.create({
  //   container: {
  //     width: '100%'
  //   }
  // })
}

export default Select


const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10
  },
  icon: {

  }
})

{/* <View style={{
                    minHeight: Dimensions.get('window').height * 0.5,
                    backgroundColor: color.backgroundColor
                  }}>

                    <Calendar
                      markedDates={selectedItem !== undefined && {
                        [selectedItem.label]: { selected: true, selectedColor: color.normal }

                      }}
                      theme={{
                        backgroundColor: color.backgroundColor
                      }}
                      onDayPress={(value) => {
                        setSelectedItem({
                          id: 1,
                          label: value.dateString,
                          value: value
                        })
                      }}
                    />
                  </View> */}
