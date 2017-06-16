import React from 'react';
import ReactDOM from 'react-dom';
import Spot from './Spot';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<div>{DragDropContext(HTML5Backend)(<Spot />)}</div>, div);
});
