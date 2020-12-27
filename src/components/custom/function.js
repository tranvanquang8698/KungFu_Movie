
export const convertDate = (input, type) => {
  let date = new Date(input)
  let day = date.getUTCDate()
  if (day < '10') {
    day = '0' + day
  }
  let month = date.getUTCMonth() + 1
  if (month < '10') {
    month = '0' + month
  }
  let year = date.getUTCFullYear()
  let hour = date.getUTCHours()
  if (hour < 10) {
    hour = '0' + hour
  }
  let min = date.getUTCMinutes()
  if (min < 10) {
    min = '0' + min
  }
  let sec = date.getUTCSeconds()
  if (sec < 10) {
    sec = '0' + sec
  }
  switch (type) {
    case 'ddmmyyyy':
      return `${day}-${month}-${year}`
      break;
    case 'yyyymmdd':
      return `${year}-${month}-${day}`
      break;
    case 'hhmmss':
      return `${hour}:${min}:${sec}`
      break;
    case 'yyyymmdd hhmmss':
      return `${year}-${month}-${day} ${hour}:${min}:${sec}`
      break;
    default:
      return `${day}-${month}-${year} ${hour}:${min}`
      break;
  }

}



export const convertMoney = (_text, type) => {
  // let tmp = ''

  // for (let i = money.length - 1; i >= 0; i -= 3) {
  //   if (money[i - 2] !== undefined) {
  //     tmp = tmp + money[i - 2] + money[i - 1] + money[i]

  //   }

  //   if (money[i - 1] !== undefined) {
  //     tmp = tmp + money[i - 1] + money[i]
  //   }

  //   if (money[i] !== undefined) {
  //     tmp = tmp + money[i]
  //   }

  //   console.log(tmp)
  // }

  _text = _text.toString()

  let valueType = 'pos'

  if (parseInt(_text) < 0) {
    valueType = 'nev'
    _text = -_text
    _text = _text.toString()
  }


  if (_text !== undefined) {
    let text = _text.split('.').join('');
    // if(text.split('.').length) ;
    let length = text.length;
    let value = '';
    if (length >= 4) {
      for (let i = length - 1; i >= 0; i = i - 3) {
        value =
          `${text[i - 3] === undefined || text[i - 2] === undefined
            ? ''
            : '.'
          }${text[i - 2] === undefined ? '' : text[i - 2]}${text[i - 1] === undefined ? '' : text[i - 1]
          }${text[i] === undefined ? '' : text[i]}` + value;
      }
      if (valueType === 'nev') {
        value = '- ' + value
      }
      if (type === undefined) {

        return 'đ ' + value;
      } else {
        if (type === 2) {
          return value
        } else {
          return value + ' đ'
        }

      }

    } else {
      if (type === undefined) {
        return 'đ ' + text;
      } else {
        if (type === 2) {
          return text
        } else {
          return text + ' đ'
        }
      }
    }
  } else {
    return '';
  }

}
