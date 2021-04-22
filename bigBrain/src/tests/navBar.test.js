import React from 'react'
import { fireEvent, render } from '@testing-library/react';
import { configure } from 'enzyme';
import Navbar from '../components/navBar';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';

configure({ adapter: new Adapter() });



describe('Render NvaBar', () => {

    test('Go to Dashboard link is there', () => {
        const NavComponent = render(<Navbar/>)
        const text = NavComponent.getByText('Dashboard')
        expect(text).toBeInTheDocument;
    })

    test('dashboard routing works', () => {
        const NavComponent = render(<Navbar/>)
        const dashboardRoute = NavComponent.getByText('Dashboard');
        expect(dashboardRoute.getAttribute("href")).toBe(
            "/admin")
            
    });

    test('Go to Games link is there', () => {
        const NavComponent = render(<Navbar/>)
        const text = NavComponent.getByText('Games')
        expect(text).toBeInTheDocument;
    })

    test('Games routing works', () => {
        const NavComponent = render(<Navbar/>)
        const gameRoute = NavComponent.getByText('Games');
        expect(gameRoute.getAttribute("href")).toBe(
            "/Home")
            
    });

    test('Go to UploadGame link is there', () => {
        const NavComponent = render(<Navbar/>)
        const text = NavComponent.getByText('Upload Game')
        expect(text).toBeInTheDocument;
    })

    test('Upload Game routing works', () => {
        const NavComponent = render(<Navbar/>)
        const uploadGameRoute = NavComponent.getByText('Upload Game');
        expect(uploadGameRoute.getAttribute("href")).toBe(
            "admin/uploadGame")
            
    });

    test('Log Out button is there', () => {
        const NavComponent = render(<Navbar/>)
        const text = NavComponent.getByText('Log Out')
        expect(text).toBeInTheDocument;
    })

      test('render with min props', () => {  
        const NavComponent = renderer.create(<Navbar/>).toJSON();
        expect(NavComponent).toMatchSnapshot();
      });
  });
