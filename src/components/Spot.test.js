import React from 'react';
import ReactDOM from 'react-dom';
import Spot from './Spot';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Spot />, div);
});
