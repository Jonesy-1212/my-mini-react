export function peek(heap) {
  return heap.length > 0 ? heap[0] : null
}

// 1. 把node添加到数组中
// 2. 往上调整最小堆（比较子节点和父节点谁最小，如果父节点不是最小，则交换位置，并继续往上调整）
export function push(heap, node) {
  let index = heap.length
  heap.push(node)
  siftUp(heap, node, index)
}

// 1. 扔第一个元素出来
// 2. 把剩下的元素调整成最小堆，
export function pop(heap) {
  if (heap.length == 0) {
    return null
  }
  let first = heap[0]
  let last = heap.pop()
  if (first !== last) {
    heap[0] = last
    siftDown(heap, last, 0)
  }
  return first
}

// 向上调整最小堆
function siftUp(heap, node, i) {
  while (i > 0) {
    let parentIndex = (heap.length - 1) >> 1
    if (compare(node, heap[parentIndex]) < 0) {
      heap[i] = heap[parentIndex]
      heap[parentIndex] = node
      i = parentIndex
    } else {
      return
    }
  }
}

function siftDown(heap, node, i) {
  let len = heap.length
  let halfLen = len >>> 1

  while (i < halfLen) {
    let leftIndex = (i << 1) + 1
    let rightIndex = (i << 1) + 2
    if (compare(heap[leftIndex], node) < 0) {
      if (compare(heap[rightIndex], heap[leftIndex]) < 0) {
        heap[i] = heap[rightIndex]
        heap[rightIndex] = node
        i = rightIndex
      } else {
        heap[i] = heap[leftIndex]
        heap[leftIndex] = node
        i = leftIndex
      }
    } else if (compare(heap[rightIndex], node) < 0) {
      heap[i] = heap[rightIndex]
      heap[rightIndex] = node
      i = rightIndex
    } else {
      return
    }
  }
}

function compare(a, b) {
  // return a - b

  const diff = a.sortIndex - b.sortIndex
  return diff !== 0 ? diff : a.id - b.id
}

// const a = [3, 7, 4, 10, 12, 9, 6, 15, 14]

// push(a, 8)
// while (1) {
//   if (a.length === 0) {
//     break;
//   }
//   console.log("a", peek(a)); //sy-log
//   pop(a);
// }
// console.log('a', a)
