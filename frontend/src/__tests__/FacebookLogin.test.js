import React from 'react';
import FacebookLogin from '../components/FacebookLogin';
import renderer from 'react-test-renderer';


test('renders correctly', () => {
    const tree = renderer.create(<FacebookLogin />).toJSON();
    expect(tree).toMatchSnapshot();
  });