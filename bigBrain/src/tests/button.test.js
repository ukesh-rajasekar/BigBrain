import React from 'react'
import { render } from '@testing-library/react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Button from '../components/button'
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Render Button', () => {
  it('render with minimal props', () => {  
    const ButtonComponent = renderer.create(<Button />).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });

  test('uses custom title', () => {
    const buttonText = 'Start'
    const ButtonComponent = render(<Button buttonText = {buttonText}/>)
    const text = ButtonComponent.getByText(buttonText)
    expect(text).toBeInTheDocument;
});

test('uses custom name', () => {
  const buttonText = 'Stop'
  const ButtonComponent = render(<Button buttonText = {buttonText}/>)
  const text = ButtonComponent.getByText(buttonText)
  expect(text).toBeInTheDocument;
});

  it('triggers onClick event handler when clicked', () => {
    const buttonAction = jest.fn();
    shallow(<Button buttonAction={buttonAction}/>).simulate('click');
    expect(buttonAction).toHaveBeenCalledTimes(1);
  })
 
  
  });
