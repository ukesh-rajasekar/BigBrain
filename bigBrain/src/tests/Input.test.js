import React from 'react'
import { render, screen } from '@testing-library/react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Input from '../components/Input';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Render Input', () => {
  it('render correctly input component', () => {  
    const InputComponent = renderer.create(<Input />).toJSON();
    expect(InputComponent).toMatchSnapshot();
  });

  it('uses custom placeholder', () => {
    const className = 'login-input'
    const InputComponent = shallow(<Input className={className}/>);
    expect(InputComponent.props().className).toBe(className)
  })

  it('uses custom class name', () => {
    const placeholder = 'email'
    const InputComponent = shallow(<Input placeholder={placeholder}/>);
    expect(InputComponent.props().placeholder).toBe(placeholder)
  })

  it('uses custom type', () => {
    const type = 'password'
    const InputComponent = shallow(<Input type={type}/>);
    expect(InputComponent.props().type).toBe(type)
  })


  it('triggers onChange event handler when clicked', () => {
    const handleChange = jest.fn();
    shallow(<Input handleChange={handleChange}/>).simulate('change', { target: { name: 'email', value: 'a@b.com' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  })
 



  });
