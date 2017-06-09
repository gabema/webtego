import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import './Piece.css';

export const pieceDragAndDropTag = 'Piece';

const pieceSource = {
  beginDrag(props) {
      // TODO: What do I put here?
      // console.log('pieceSource');
      // console.log(props);
      return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
};

const Piece = ({piece, connectDragSource, pieceCount}) => connectDragSource(
  <div style={{color: piece.color}} className="Piece">
      <center>{piece.name}</center>
      {pieceCount ? pieceCount : ''}
  </div>
);

Piece.PropTypes = {
    piece: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource(pieceDragAndDropTag, pieceSource, collect)(Piece);
