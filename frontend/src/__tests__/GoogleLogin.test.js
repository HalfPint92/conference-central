import React from 'react';
import GoogleLogin from '../components/GoogleLogin';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
  const tree = renderer.create(<GoogleLogin />).toJSON();
  expect(tree).toMatchSnapshot();
});


