import createFiber from './ReactFiber'
import { scheduleUpdateOnFiber } from './ReactWorkLoop'

function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot
}

ReactDOMRoot.prototype.render = function (children) {
  // console.log('children---', children)
  const root = this._internalRoot
  updateContainer(children, root)
}

function updateContainer(element, container) {
  console.log(element, 'element')
  const { containerInfo } = container
  const fiber = createFiber(element, {
    type: containerInfo.nodeName.toLocaleLowerCase(),
    stateNode: containerInfo,
  })
  console.log('fiber', fiber)

  // 组件初次渲染
  scheduleUpdateOnFiber(fiber)
}

function createRoot(container) {
  const root = { containerInfo: container }
  return new ReactDOMRoot(root)
}

export default { createRoot }
