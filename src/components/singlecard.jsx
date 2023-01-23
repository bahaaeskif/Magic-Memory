import React from 'react';

import './singlecard.css'

const Singlecard = ({ card, OnSelect, flipped }) => {
    return (
        <div className='card'>
            <div className={flipped ? 'flipped' : ''}>
                <img className='card__front' src={card.src} alt='card front' />
                <img
                    onClick={() => { OnSelect(card) }}
                    className='card__back'
                    src='/img/cover.png'
                    alt='card back' />
            </div>

        </div>
    );
}

export default Singlecard;
