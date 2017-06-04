import React from 'react';

const Spot = ({allowsPiece}) => (
  <div style={{margin: '1px solid' + (allowsPiece?'black':'yellow')}}>
  </div>
);

export default Spot;
