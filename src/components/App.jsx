import { useState } from 'react'
import Card from './Card.jsx'
import myCards from '../assets/storage/cards.js'

function App() {
  return (
    <>
      <div className="container">
        <h2 className='text-center my-2  my-text-try'>Hi</h2>
        <div className="row">
            {myCards.map((singleCard)=>{
                return <Card key={singleCard.id} {...singleCard}/>
            })}
        </div>
      </div>
    </>
  )
}

export default App