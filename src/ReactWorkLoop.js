import {
  HostComponent,
  FunctionComponent,
  ClassComponent,
  Fragment,
  HostText,
} from './ReactFiberWorkTags'
import {
  updateHostComponent,
  updateFunctionComponent,
  updateClassComponent,
  updateHostTextComponent,
  updateFragmentComponent,
} from './ReactFiberReconciler'
import { Placement, Update, updateNode } from './utils'
import { scheduleCallback } from './scheduler'

let wip = null
let wipRoot = null

// 初次渲染更新
export function scheduleUpdateOnFiber(fiber) {
  wip = fiber
  wipRoot = fiber
  scheduleCallback(workLoop)
}

function performUnitOfWork() {
  // todo 1. 执行当前任务wip
  let { tag } = wip
  switch (tag) {
    case HostComponent:
      updateHostComponent(wip)
      break

    case FunctionComponent:
      updateFunctionComponent(wip)
      break

    case ClassComponent:
      updateClassComponent(wip)
      break

    case Fragment:
      updateFragmentComponent(wip)
      break

    case HostText:
      updateHostTextComponent(wip)
      break

    default:
      break
  }

  // todo 2. 更新wip
  if (wip.child) {
    wip = wip.child
    return
  }

  let next = wip
  while (next) {
    // console.log('wip',wip);
    if (next.sibling) {
      wip = next.sibling
      return
    }
    next = next.return
    // console.log('next',next);
  }
  wip = null
}

function workLoop(IdleDeadLine) {
  // 有空闲就执行
  // while (wip && IdleDeadLine.timeRemaining() > 0) {
  //   performUnitOfWork()
  // }
  while (wip) {
    performUnitOfWork()
  }
  // console.log('IdleDeadLine', IdleDeadLine)

  if (!wip && wipRoot) {
    commitRoot()
  }
}

// requestIdleCallback(workLoop)

// 提交
function commitRoot() {
  commitWorker(wipRoot)
  wipRoot = null //在循环中执行所以要置为0
}

function commitWorker(wip) {
  if (!wip) {
    return
  }
  // 提交自己
  const parentNode = getParentNode(wip.return) //wip.return.stateNode //???
  // console.log(wip, '1222')
  const { flags, stateNode } = wip
  // 原生标签且stateNode为dom节点. 后续补处理
  if (flags & Placement && stateNode) {
    parentNode.appendChild(stateNode)
  }
  if (flags & Update && stateNode) {
    updateNode(stateNode, wip.alternate?.props || {}, wip.props)
  }

  // 提交儿子
  commitWorker(wip.child)

  // 提交兄弟
  commitWorker(wip.sibling)
}

function getParentNode(wip) {
  let tem = wip
  while (tem) {
    if (tem.stateNode) {
      return tem.stateNode
    }
    tem = tem.return
  }
}
