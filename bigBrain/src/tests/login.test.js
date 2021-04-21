import React from 'react'
import { render, screen } from '@testing-library/react';
import { shallow, configure, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Login from '../pages/Login';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });



describe('Render Login', () => {


const wrapper = shallow((<Login/>));
expect(wrapper.find('Input').at(0).prop('placeholder')).toEqual('Email');
expect(wrapper.find('Input').at(0).prop('type')).toEqual('text');
expect(wrapper.find('Input').at(0).prop('handleChange')).toEqual(setStateValue);
expect(wrapper.find('Input').at(1).prop('placeholder')).toEqual('Password');
expect(wrapper.find('Input').at(1).prop('type')).toEqual('password');
expect(wrapper.find('Input').at(1).prop('handleChange')).toEqual('setStateValue');
wrapper.find('Input').at(0).simulate('change', { target: { name: 'email', value: 'Richard' } });
wrapper.find('Input').at(1).simulate('change', { target: { value: 'dataflows' } });
expect(handleChange).toHaveBeenCalledTimes(2);

  });
