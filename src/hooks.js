import { scheduleUpdateOnFiber } from './ReactWorkLoop'

// 当前的fiber
let currentlyRenderingFiber = null
// 记录当前的hook 即最后一个hook
let workInProgressHook = null

export function renderHooks(wip) {
  currentlyRenderingFiber = wip
  currentlyRenderingFiber.memoizedState = null
  workInProgressHook = null
}

function updateWorkInProgressHook() {
  let hook
  let current = currentlyRenderingFiber.alternate

  if (current) {
    // 更新
    currentlyRenderingFiber.memoizedState = current.memoizedState
    if (workInProgressHook) {
      workInProgressHook = hook = workInProgressHook.next
    } else {
      workInProgressHook = hook = currentlyRenderingFiber.memoizedState
    }
  } else {
    // 初次渲染
    hook = {
      memoizedState: null,
      next: null,
    }
    if (workInProgressHook) {
      workInProgressHook = workInProgressHook.next = hook
    } else {
      workInProgressHook = currentlyRenderingFiber.memoizedState = hook
    }
  }
  return hook
}

function useReducer(reducer, initValue) {
  let hook = updateWorkInProgressHook()
  console.log('hook-xxxxx', currentlyRenderingFiber)

  if (!currentlyRenderingFiber.alternate) {
    // 初次渲染
    hook.memoizedState = initValue
  }
  // const dispatch = (action) => {
  //   // console.log('action', action)
  //   //获取最新state
  //   hook.memoizedState = reducer(hook.memoizedState, action)
  //   currentlyRenderingFiber.alternate = { ...currentlyRenderingFiber }
  //   console.log(' hook.memoizedState', hook.memoizedState)
  //   console.log(' hook.memoizedState----useReducer', currentlyRenderingFiber)
  //   scheduleUpdateOnFiber(currentlyRenderingFiber)
  // }

  const dispatch = dispatchReducerAction.bind(null, currentlyRenderingFiber, hook, reducer)

  return [hook.memoizedState, dispatch]
}

function dispatchReducerAction(fiber, hook, reducer, action) {
  //获取最新state
  hook.memoizedState = reducer
    ? reducer(hook.memoizedState, action)
    : typeof action == 'function'
    ? action(hook.memoizedState)
    : action
  fiber.alternate = { ...fiber }
  console.log(' hook.memoizedState', hook.memoizedState)
  console.log(' hook.memoizedState----useReducer', fiber)
  fiber.sibling = null
  scheduleUpdateOnFiber(fiber)
}

function useState(initValue) {
  return useReducer(null, initValue)
}

export { useReducer, useState }
