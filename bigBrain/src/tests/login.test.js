import React from 'react'
import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';
import {Login, validateInput} from '../pages/Login';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });



describe('Render Login', () => {

    test('validate email fuction should pass on correct input', () => {
        const email = 'test@test.com';
        expect(validateInput(email)).toBe(true);
    });

    test('validate email fuction should fail on incorrect input', () => {
        const email = 'test';
        expect(validateInput(email)).not.toBe(true);
    });

    test('Hide unhide errors', () => {
        const LoginComponent = render(<Login/>);
        const emailInput = LoginComponent.getByPlaceholderText('Email');
        expect(emailInput.value).toMatch('');
        fireEvent.change(emailInput, {target: {value: 'testing'}});
        expect(emailInput.value).toMatch('testing');

        const errorMsg = LoginComponent.getByText('Invalid email !')
        expect(errorMsg).toBeInTheDocument;
        
        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        expect(errorMsg).not.toBeInTheDocument;
      })

    test('validate Log in option is there', () => {
        const LoginComponent = render(<Login/>)
        // console.log(LoginComponent)
        const text = LoginComponent.getByText('Log In')
        expect(text).toBeInTheDocument;
    });

    test('validate Sign Up option is there', () => {
        const LoginComponent = render(<Login/>)
        // console.log(LoginComponent)
        const text = LoginComponent.getByText('Sign Up')
        expect(text).toBeInTheDocument;
    });

    test('validate Email placeholder is there', () => {
        const LoginComponent = render(<Login/>)
        // console.log(LoginComponent)
        const text = LoginComponent.getByPlaceholderText('Email')
        expect(text).toBeInTheDocument;
    });

    test('validate Email placeholder is there', () => {
        const LoginComponent = render(<Login/>)
        // console.log(LoginComponent)
        const text = LoginComponent.getByPlaceholderText('Email')
        expect(text).toBeInTheDocument;
    });

    test('email input uses text type', () => {
        const LoginComponent = render(<Login/>)
        const emailInput = LoginComponent.getByPlaceholderText('Email')
        expect(emailInput.value).toMatch('')
        fireEvent.change(emailInput, {target: {value: 'test@test.com'}})
        expect(emailInput.value).toMatch('test@test.com')
      })

    test('validate Password placeholder is there', () => {
        const LoginComponent = render(<Login/>)
        // console.log(LoginComponent)
        const text = LoginComponent.getByPlaceholderText('Password')
        expect(text).toBeInTheDocument;
    });

    test('password input uses password type', () => {
        const LoginComponent = render(<Login/>)
        const passwordInput = LoginComponent.getByPlaceholderText('Password')
        expect(passwordInput.value).toMatch('')
        fireEvent.change(passwordInput, {target: {value: '****'}})
        expect(passwordInput.value).toMatch('****')
      })

      test('render with no props', () => {  
        const LoginComponent = renderer.create(<Login />).toJSON();
        expect(LoginComponent).toMatchSnapshot();
      });
  });
