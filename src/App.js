import './App.css';
import { useEffect, useState } from 'react'
import Singlecard from './components/singlecard';

const cardImages = [
  { "src": '/img/helmet-1.png', matched: false },
  { "src": '/img/potion-1.png', matched: false },
  { "src": '/img/ring-1.png', matched: false },
  { "src": '/img/scroll-1.png', matched: false },
  { "src": '/img/shield-1.png', matched: false },
  { "src": '/img/sword-1.png', matched: false },
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [selectChoiceOne, setSelectChoiceOne] = useState(null);
  const [selectChoiceTwo, setSelectChoiceTwo] = useState(null);

  const shuffle = () => {
    let shuffledcards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => { return { ...card, id: Math.random() } })

    setCards(shuffledcards);
    setTurns(0);
  }

  const hundelSelect = (card) => {
    selectChoiceOne ? setSelectChoiceTwo(card) : setSelectChoiceOne(card);
  }

  useEffect(() => {
    if (selectChoiceOne && selectChoiceTwo) {
      if (selectChoiceOne.src === selectChoiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === selectChoiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        reset();
      } else {
        setTimeout(() => { reset() }, 1000);
      }
    }
  }, [selectChoiceOne, selectChoiceTwo])

  useEffect(() => {
    shuffle();
  }, [])

  function reset() {
    setSelectChoiceOne(null);
    setSelectChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className='App'>
      < h1 > Magic Match</h1 >
      <button
        className='App__btn'
        onClick={shuffle}>New Game</button>

      <div className='App__card-grid'>
        {
          cards.map((card) => {
            return <Singlecard card={card}
              OnSelect={hundelSelect}
              key={card.id}
              flipped={card === selectChoiceOne || card === selectChoiceTwo || card.matched} />
          })
        }
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App;
