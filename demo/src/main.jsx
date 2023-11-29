// import React from 'react'
// import { Component } from 'react'

// import ReactDOM from 'react-dom/client'

import { ReactDOM, Component, useReducer, useState } from '../which-react'

import App from './App.jsx'
import './index.css'
import { Button } from 'antd'

// import { StoreContext } from './useReducer/storeContext'
// console.log('storeContext', StoreContext)

//
class Main extends Component {
  // extends是为了不需要每次写类组件免去手动接收props
  // constructor(props) {
  //   this.props = props
  // }
  render() {
    return (
      <div className='class'>
        <h1>{this.props?.name}</h1>
        类组件
      </div>
    )
  }
}

function FragmentComponent() {
  return (
    <ul>
      {/* <div>fasrmasdmasdmsa</div> */}
      <>
        part1
        {/* <React.Fragment> */}
        <li>part1</li>
        <li>part2</li>
        {/* </React.Fragment> */}
      </>
    </ul>
  )
}

function reducer(preState, action) {
  // console.log('preState', preState)
  // console.log('action', action)
  switch (action.type) {
    case 'add':
      return { ...preState, age: preState.age + 1 }
    case 'delete':
      return { ...preState, age: preState.age - 1 }
    default:
      return preState
  }
}

// useReducer
function ReducerPage(props) {
  let [state, dispatch] = useReducer(reducer, { age: 1, name: '哈哈哈哈' })
  // console.log('useReducer', state, dispatch)

  const [count, setCount] = useState(1)
  const setValueReducer = (value) => {
    // console.log('---', reducer({ age: 1, name: '哈哈哈哈' }, { type: 'add' }))
    // return
    dispatch({ type: value.type })
  }

  return (
    <div className='class'>
      <h1>test-reducer</h1>
      <p>{state?.name}</p>
      <p>{state?.age}</p>
      <button
        className='btn'
        onClick={() => {
          setValueReducer({ type: 'add' })
        }}
      >
        ++++
      </button>
      <button
        className='btn'
        onClick={() => {
          setValueReducer({ type: 'delete' })
        }}
      >
        ----
      </button>
      <button
        className='btn'
        onClick={() => {
          // setCount(count + 1)
          setCount((count) => count + 1)
        }}
      >
        {/* ++++useState */}
        {count}
      </button>
    </div>
  )
}

let jsx = (
  <div className='border'>
    <h1>react</h1>
    {/* <a href=''>mini react</a> */}
    <>
      23
      {/* <div>23----</div> */}
      {/* 这种Fagment渲染不出----todo？？？ */}
    </>
    <div>
      <a href=''>mini react</a>
      <h1>react</h1>
    </div>
    <App />
    <Main age={123} name={'张三'} />
    <ReducerPage />
    <FragmentComponent />
  </div>
)
// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
ReactDOM.createRoot(document.getElementById('root')).render(jsx)
