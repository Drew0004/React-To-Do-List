import { useState } from 'react'
import Todos from './Todos'

function App() {
  return (
    <>
      <div className="container">
            <h3 className='text-white my-5 my-font'>All todos for today &#128640;</h3>
            <Todos/>
      </div>
    </>
  )
}

export default App