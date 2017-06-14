import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import Piece, {pieceDragAndDropTag} from './Piece';

const teamSpotSource = {
  beginDrag(props) {
      return props;
  }
};

const collectSource = (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
});

const TeamSpot = ({piece, connectDragSource, pieceCount, game}) => connectDragSource(
  <div style={{display: 'inline'}}><Piece piece={piece} pieceCount={pieceCount} game={game} /></div>
);

TeamSpot.PropTypes = {
    piece: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource(pieceDragAndDropTag, teamSpotSource, collectSource)(TeamSpot);
