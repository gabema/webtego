import React from 'react';
import './Spot.css';
import playable from '../playablespot.svg';
import unplayable from '../unplayablespot.svg';

const Spot = ({allowsPiece}) => (
  <img className="Spot" src={allowsPiece ? playable : unplayable} alt={allowsPiece ? 'playable' : 'unplayable'} />
);

export default Spot;
