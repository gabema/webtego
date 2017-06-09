import React from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import './Spot.css';
import { pieceDragAndDropTag } from './Piece';
import playable from '../playablespot.svg';
import unplayable from '../unplayablespot.svg';

const spotTarget = {
  drop(props, monitor) {
    const pieceBeingDragged = monitor.getItem();
    props.movePieceTo(pieceBeingDragged.piece, props.index);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
});

const Spot = ({allowsPiece, connectDropTarget, isOver}) => connectDropTarget(
  <img className="Spot" src={allowsPiece ? playable : unplayable} alt={allowsPiece ? 'playable' : 'unplayable'} />
);

Spot.PropTypes = {
  allowsPiece: PropTypes.bool,
  movePieceTo: PropTypes.func,
  index: PropTypes.number.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
};

export default DropTarget(pieceDragAndDropTag, spotTarget, collect)(Spot);
