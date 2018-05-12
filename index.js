const isValueExistsForKey = (obj, key) => {
  let keyPath = key.split('.')
  let isIssue = false
  let lastKeyIndex = keyPath.length

  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i]
    if (!isObject(obj)) {
      isIssue = true
      break
    }
    if (!(key in obj)) {
      isIssue = true
      break
    }
    obj = obj[key]
  }
  if (isIssue) {

  } else {
    return obj
  }
}

const isObject = obj => obj && obj.constructor && obj.constructor === Object

const assignObjectToValue = (obj, longkey, value) => {
  let keyPath = longkey.split('.')
  let lastKeyIndex = keyPath.length - 1
  for (var i = 0; i < lastKeyIndex; ++i) {
    let key = keyPath[i]
    if (!(key in obj)) { obj[key] = {} }
    obj = obj[key]
  }
  obj[keyPath[lastKeyIndex]] = value
}

const chanageObjectKeys = (response, dataModel) => {
  let finalResponse = {}

  Object.keys(dataModel).forEach((key) => {
    let keyValue = response[dataModel[key]]
    if (keyValue) {
      assignObjectToValue(finalResponse, key, keyValue)
    } else {
      let valueFound = isValueExistsForKey(response, dataModel[key])
      if (valueFound) {
        assignObjectToValue(finalResponse, key, valueFound)
      }
    }
  })
  return finalResponse
}

const chanageObjectKeysForArray = (arrayResponse, dataModel) => {
  let responseModel = []
  arrayResponse.forEach((response) => {
    responseModel.push(chanageObjectKeys(response, dataModel))
  })
  return responseModel
}

const changeKeys = (response, model) => {
  if (!model) {
    throw new Error('Data Model is required')
  } else if (!(typeof model === 'object')) {
    throw new Error('Data Model should be object')
  }
  if (Array.isArray(response)) {
    return chanageObjectKeysForArray(response, model)
  } else if (typeof response === 'object') {
    return chanageObjectKeys(response, model)
  } else {
    throw new Error('Array and object only accept for conversion')
  }
}

module.exports = changeKeys


console.log(changeKeys({
    name: 'BOB',
    age: 25,
    address: {
        street:101
    }
}, {
    username: 'name',
    age: 'age',
    'add.road': 'address.street'
}));