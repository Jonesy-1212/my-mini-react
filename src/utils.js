// ! flags
export const NoFlags = /*                      */ 0b00000000000000000000

export const Placement = /*                    */ 0b0000000000000000000010 // 2
export const Update = /*                       */ 0b0000000000000000000100 // 4
export const Deletion = /*                     */ 0b0000000000000000001000 // 8

export function isStr(s) {
  return typeof s === 'string'
}

export function isStringOrNumber(s) {
  return typeof s === 'string' || typeof s === 'number'
}

export function isFn(fn) {
  return typeof fn === 'function'
}

export function isArray(arr) {
  return Array.isArray(arr)
}

// export function updateNode(node, nextVal) {
//   // console.log('node, nextVal', node, nextVal)
//   Object.keys(nextVal).forEach((k) => {
//     if (k === 'children') {
//       if (isStringOrNumber(nextVal[k])) {
//         node.textContent = nextVal[k] + ''
//       }
//     } else if (k.slice(0, 2) == 'on') {
//       // console.log('nextVal[k]', nextVal[k])
//       node.addEventListener(k.slice(2).toLocaleLowerCase(), nextVal[k])
//     } else {
//       node[k] = nextVal[k]
//     }
//   })
// }

export function updateNode(node, oldVal, nextVal) {
  // console.log('node, nextVal', node, nextVal)
  Object.keys(oldVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(oldVal[k])) {
        node.textContent = ''
      }
    } else if (k.slice(0, 2) == 'on') {
      node.removeEventListener(k.slice(2).toLocaleLowerCase(), oldVal[k])
    } else {
      if (!(k in nextVal)) {
        node[k] = ''
      }
    }
  })
  Object.keys(nextVal).forEach((k) => {
    if (k === 'children') {
      if (isStringOrNumber(nextVal[k])) {
        node.textContent = nextVal[k] + ''
      }
    } else if (k.slice(0, 2) == 'on') {
      // console.log('nextVal[k]', nextVal[k])
      node.addEventListener(k.slice(2).toLocaleLowerCase(), nextVal[k])
    } else {
      node[k] = nextVal[k]
    }
  })
}

export function isUndefined(s) {
  return s === undefined
}
