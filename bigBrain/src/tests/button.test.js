import React from 'react'
import { render, screen } from '@testing-library/react';
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

  it('renders with custom title', () => {  
    const buttonText = 'Start'
    const ButtonComponent = renderer.create(<Button buttonText = {buttonText}/>).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });

  it('triggers onClick event handler when clicked', () => {
    const buttonAction = jest.fn();
    shallow(<Button buttonAction={buttonAction}/>).simulate('click');
    expect(buttonAction).toHaveBeenCalledTimes(1);
  })

  it('uses custom title', () => {
    const buttonText = 'click here';
    const ButtonComponent = shallow(<Button buttonText={buttonText}/>);
    expect(ButtonComponent.text()).toBe(buttonText);
  })

  
  
  });
