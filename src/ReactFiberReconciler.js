import createFiber from './ReactFiber'
import { renderHooks } from './hooks'
import { Update, isArray, isStr, isStringOrNumber, updateNode } from './utils'

export function updateHostComponent(wip) {
  // console.log('asd', wip)
  if (!wip.stateNode) {
    // 第一次渲染
    wip.stateNode = document.createElement(wip.type)
    updateNode(wip.stateNode, {}, wip.props)
  }
  reconcileChildren(wip, wip.props.children)
}

export function updateFunctionComponent(wip) {
  renderHooks(wip)
  // console.log('updateFunctionComponent', updateFunctionComponent)
  const { type, props } = wip
  const children = type(props)
  reconcileChildren(wip, children)
}

export function updateClassComponent(wip) {
  console.log('updateClassComponent----', wip)
  const { type, props } = wip
  // console.log(type);
  const classInit = new type(props)
  // console.log('classInit',classInit);
  console.log('updateClassComponent----render', classInit.render())
  reconcileChildren(wip, classInit.render())
}

export function updateFragmentComponent(wip) {
  // if (!wip.stateNode) {
  //   // 第一次渲染
  //   wip.stateNode = document.createElement(wip.type)
  //   updateNode(wip.stateNode, wip.props)
  // }
  reconcileChildren(wip, wip.props.children)
}

export function updateHostTextComponent(wip) {
  console.log('updateHostTextComponent----', wip)
  // reconcileChildren(wip, wip.props.children)
  // wip.child = wip.props.children
  wip.stateNode = document.createTextNode(wip.props.children)
}

// 协调 diff???
function reconcileChildren(wip, children) {
  // console.log('wip', wip)
  // console.log('children', children)

  if (isStringOrNumber(children)) {
    // console.log('hhhhhhhhhh', wip)
    // wip.stateNode.textContent = children + ''
    return
  }

  const newChildren = isArray(children) ? children : [children]
  let oldFiber = wip.alternate?.child
  let previousNewFiber = null
  for (let i = 0; i < newChildren.length; i++) { 
    const newChild = newChildren[i]

    if (newChild == null) {
      continue
    }
    const newFiber = createFiber(newChild, wip)
    let same = sameNode(newFiber, oldFiber)
    if (same) {
      Object.assign(newFiber, {
        stateNode: oldFiber.stateNode,
        flags: Update,
        alternate: oldFiber,
      })
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    console.log('previousNewFiber----newFiber', newFiber)
    // console.log('previousNewFiber', previousNewFiber)

    // 链表
    if (previousNewFiber == null) {
      // head node
      wip.child = newFiber
    } else {
      // console.log('newFiber----', newFiber)
      // console.log('newFiber----', previousNewFiber)
      previousNewFiber.sibling = newFiber
    }
    // console.log('newFiber1111----', previousNewFiber)
    previousNewFiber = newFiber
    // console.log('newFiber1111----', previousNewFiber)
  }
  // console.log('wip----', wip)
}
// why 可以一直循环找子节点

function sameNode(a, b) {
  return a && b && a.type === b.type && a.key === b.key
}
