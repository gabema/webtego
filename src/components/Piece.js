import React from 'react';
import PropTypes from 'prop-types';
import './Piece.css';

const Piece = ({color, name}) => (
  <div style={{color: color}} className="Piece">
      <center>{name}</center>
  </div>
);

Piece.PropTypes = {
    color: PropTypes.string.isRequired,
};

export default Piece;
